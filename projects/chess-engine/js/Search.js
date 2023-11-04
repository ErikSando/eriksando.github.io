const Window = 50;
const FullDepthMoves = 4;
const ReductionLimit = 3;
const NullMoveReduction = 2;

function ResetSearchInfo() {
    Board.KillerMoves1 = new Array(MaxDepth);
    Board.KillerMoves2 = new Array(MaxDepth);

    Board.Ply = 0;
    Board.PVList = new Array(MaxDepth);
    Board.PVLength = 0;
    Board.HashTable.Age++;
}

function CheckTimeUp(info) {
    if (info.TimeSet && performance.now() > info.StopTime) info.Stopped = true;
}

function ThreeFoldRepetition() {
    let repetitions = 0;

    for (let i = Board.HistoryPly - Board.FiftyMoveRule; i < Board.HistoryPly - 1; i += 2) {
        if (Board.PositionKey == Board.History[Board.HistoryPly].PositionKey) {
            repetitions++;
        }
    }

    return repetitions >= 2;
}

function OrderNextMove(index, list) {
    let move = list[index];
    let bestScore = list[index].score;
    let bestIndex = index;

    for (let i = index + 1; i < list.length; i++) {
        if (list[i].score > bestScore) {
            bestScore = list[i].score;
            bestIndex = i;
        }
    }

    list[index] = list[bestIndex];
    list[bestIndex] = move;
}

function Quiescence(alpha, beta, info) {
    if (info.Nodes & 2047) CheckTimeUp(info);
    
    info.Nodes++;

    if (ThreeFoldRepetition() || Board.FiftyMoveRule >= 100) return 0;

    let score = Evaluate();

    if (Board.Ply >= MaxDepth) return score;

    if (score > alpha) {
        if (score >= beta) return beta;

        alpha = score;
    }

    let list = Board.GenerateCaptures();

    for (let i = 0; i < list.length; i++) {
        OrderNextMove(i, list);

        if (!Board.MakeMove(list[i].move)) continue;

        let score = -Quiescence(-beta, -alpha, info);

        Board.TakeMove();

        if (info.Stopped) return 0;

        if (score > alpha) {
            if (score >= beta) return beta;

            alpha = score;
        }
    }

    return alpha;
}

function AlphaBeta(alpha, beta, depth, info, doNull = true) {
    if (depth <= 0) return Quiescence(alpha, beta, info);
    if (info.Nodes & 2047) CheckTimeUp(info);

    info.Nodes++;

    if (ThreeFoldRepetition() || Board.FiftyMoveRule >= 100) return 0;

    let legalMoves = 0;
    let movesSearched = 0;
    let bestMove = NoMove;

    let pvMove = Board.PVList[Board.Ply];
    let pvNode = beta - alpha > 1;
    let score;
    //let score = Board.HashTable.GetEntry(alpha, beta, depth);

    //if (Board.Ply && score != NoScore && !pvNode) return score;

    let kingSquare = Board.KingSquares[Board.Side];
    let inCheck = Board.SquareAttacked(kingSquare, Board.Side ^ 1);

    let extension = 0;

    if (inCheck) extension = 1;
    else {
        let opponentKingSquare = Board.KingSquares[Board.Side ^ 1];
        let opponentInCheck = Board.SquareAttacked(opponentKingSquare, Board.Side);

        if (opponentInCheck) extension = 1;
    }

    if (doNull && !inCheck && depth >= 3 && Board.Ply && Board.BigPieces[Board.Side] > 1) {
        Board.MakeNullMove();

        score = -AlphaBeta(-beta, -beta + 1, depth - 1 - NullMoveReduction, info, false);

        Board.TakeNullMove();

        if (info.Stopped) return 0;

        if (score >= beta && Math.abs(score) < MateScore) return beta;
    }

    let list = Board.GenerateMoves();

    if (pvMove && Board.Ply <= Board.PVLength) {
        for (let i = 0; i < list.length; i++) {
            if (pvMove == list[i].move) {
                list[i].score = 1000;
                break;
            }
        }
    }

    let hashFlag = HashFlag.Alpha;

    for (let i = 0; i < list.length; i++) {
        OrderNextMove(i, list);

        let move = list[i].move;

        if (!Board.MakeMove(move)) continue;

        legalMoves++;

        if (movesSearched == 0) {
            score = -AlphaBeta(-beta, -alpha, depth - 1 + extension, info);
        }
        else {
            if (!inCheck && movesSearched >= FullDepthMoves && depth >= ReductionLimit && list[i].score == 0) {
                score = -AlphaBeta(-alpha - 1, -alpha, depth - 2 + extension, info);
            }
            else score = alpha + 1;

            if (score > alpha) {
                score = -AlphaBeta(-alpha - 1, -alpha, depth - 1 + extension, info);

                if (score > alpha && score < beta) {
                    score = -AlphaBeta(-beta, -alpha, depth - 1 + extension, info);
                }
            }
        }

        Board.TakeMove();

        movesSearched++;

        if (info.Stopped) return 0;

        if (score > alpha) {
            if (score >= beta) {
                //Board.HashTable.StoreEntry(move, beta, depth, HashFlag.Beta);

                if (CapturedPiece(move) == Piece.None) {
                    Board.KillerMoves2[Board.Ply] = Board.KillerMoves1[Board.Ply];
                    Board.KillerMoves1[Board.Ply] = move;
                }

                return beta;
            }

            bestMove = move;
            alpha = score;
            hashFlag = HashFlag.Exact;

            Board.PVList[Board.Ply] = move;
            if (Board.Ply > Board.PVLength) Board.PVLength = Board.Ply;
        
            if (CapturedPiece(move) == Piece.None) {
                Board.HistoryMoves[Square64[FromSquare(move)]][Square64[ToSquare(move)]] += depth;
            }
        }
    }

    if (legalMoves == 0) {
        if (inCheck) return -InfBound + Board.Ply;
        else return 0;
    }

    //Board.HashTable.StoreEntry(bestMove, alpha, depth, hashFlag);

    return alpha;
}

let Evaluation, SearchDepth, Nodes, Time, NodesPerSecond, PVLine;

function InitSearch() {
    Evaluation = document.getElementById("evaluation");
    SearchDepth = document.getElementById("search-depth");
    Nodes = document.getElementById("nodes");
    Time = document.getElementById("time");
    NodesPerSecond = document.getElementById("nps");
    PVLine = document.getElementById("pv");
}

function Search(info) {
    ResetSearchInfo();

    let alpha = -InfBound;
    let beta = InfBound;

    for (let depth = 1; depth <= info.Depth;) {
        let score = AlphaBeta(alpha, beta, depth, info);

        if (info.Stopped) break;

        // if (score <= alpha) {
        //     alpha = -InfBound;
        //     continue;
        // }

        // if (score >= beta) {
        //     beta = InfBound;
        //     continue;
        // }
        
        // alpha = score - Window;
        // beta = score + Window;

        let time = performance.now() - info.StartTime;

        let pv = "";

        for (let i = 0; i < Board.PVLength; i++) {
            pv += MoveString(Board.PVList[i]);

            if (i < Board.PVLength - 1) pv += " ";
        }

        let eval = (score / 100).toFixed(2);
        
        if (score > MateScore) eval = "+M" + Math.ceil((InfBound - score) / 2);
        else if (score < -MateScore) eval = "-M" + Math.ceil((InfBound + score) / 2);

        Evaluation.textContent = eval;
        SearchDepth.textContent = depth;
        Nodes.textContent = info.Nodes;
        Time.textContent = time;
        NodesPerSecond.textContent = time > 0 ? Math.round(info.Nodes / time * 1000) : "nil";
        PVLine.textContent = pv;
        
        depth++;
    }

    let time = performance.now() - info.StartTime;
    Time.textContent = time;

    return Board.PVList[0];
}