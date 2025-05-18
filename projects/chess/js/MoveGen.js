const KnightDirections = [21, -21, 19, -19, 12, -12, 8, -8];
const BishopDirections = [11, -11, 9, -9];
const RookDirections = [10, -10, 1, -1];
const KingDirections = [11, -11, 10, -10, 9, -9, 1, -1];

const Directions = [0, 0, 8, 4, 4, 8, 8, 0, 8, 4, 4, 8, 8];
const PieceDirections = [
    0, 0,
    KnightDirections, BishopDirections, RookDirections, KingDirections, KingDirections,
    0,
    KnightDirections, BishopDirections, RookDirections, KingDirections, KingDirections
];

const NonSlidingPieces = [
    Piece.wN, Piece.wK,
    Piece.bN, Piece.bK
];

const NonSlideIndex = [0, 2];

const SlidingPieces = [
    Piece.wB, Piece.wR, Piece.wQ,
    Piece.bB, Piece.bR, Piece.bQ
];

const SlideIndex = [0, 3];

const MvvLvaScore = [
    [],
    [ 0, 105, 104, 103, 102, 101, 100, 105, 104, 103, 102, 101, 100 ],
	[ 0, 205, 204, 203, 202, 201, 200, 205, 204, 203, 202, 201, 200 ],
	[ 0, 305, 304, 303, 302, 301, 300, 305, 304, 303, 302, 301, 300 ],
	[ 0, 405, 404, 403, 402, 401, 400, 405, 404, 403, 402, 401, 400 ],
	[ 0, 505, 504, 503, 502, 501, 500, 505, 504, 503, 502, 501, 500 ],
	[ 0, 605, 604, 603, 602, 601, 600, 605, 604, 603, 602, 601, 600 ],
	[ 0, 105, 104, 103, 102, 101, 100, 105, 104, 103, 102, 101, 100 ],
	[ 0, 205, 204, 203, 202, 201, 200, 205, 204, 203, 202, 201, 200 ],
	[ 0, 305, 304, 303, 302, 301, 300, 305, 304, 303, 302, 301, 300 ],
	[ 0, 405, 404, 403, 402, 401, 400, 405, 404, 403, 402, 401, 400 ],
	[ 0, 505, 504, 503, 502, 501, 500, 505, 504, 503, 502, 501, 500 ],
	[ 0, 605, 604, 603, 602, 601, 600, 605, 604, 603, 602, 601, 600 ]
];

function _Move(from, to, captured = Piece.None, promoted = Piece.None, flag = MoveFlag.None) {
    return from | to << 7 | captured << 14 | promoted << 18 | flag;
}

function AddQuietMove(move, list) {
    let score = 0;

    if (Board.KillerMoves1[Board.Ply] == move) score = 90;
    else if (Board.KillerMoves2[Board.Ply] == move) score = 80;
    else score = Board.HistoryMoves[Square120[FromSquare(move)] + Square120[ToSquare(move) * MaxDepth]];

    list.push(new Move(move, score));
}

function AddCaptureMove(piece, move, list) {
    let score = MvvLvaScore[CapturedPiece(move)][piece];

    list.push(new Move(move, score));
}

function AddEnPassantMove(move, list) {
    list.push(new Move(move, 105));
}

function AddPawnMove(from, to, list) {
    let promotionRank = Board.Side == Side.White ? Rank.Rank8 : Rank.Rank1;
    let pawns = Board.Side == Side.White ? Piece.wP : Piece.bP;

    if (SquareRanks[to] == promotionRank) {
        AddQuietMove(_Move(from, to, Piece.None, pawns + 4), list);
        AddQuietMove(_Move(from, to, Piece.None, pawns + 3), list);
        AddQuietMove(_Move(from, to, Piece.None, pawns + 2), list);
        AddQuietMove(_Move(from, to, Piece.None, pawns + 1), list);
    }
    else {
        AddQuietMove(_Move(from, to, Piece.None, Piece.None), list);
    }
}

function AddPawnCaptureMove(from, to, captured, list) {
    let promotionRank = Board.Side == Side.White ? Rank.Rank8 : Rank.Rank1;
    let pawns = Board.Side == Side.White ? Piece.wP : Piece.bP;

    if (SquareRanks[to] == promotionRank) {
        AddCaptureMove(pawns, _Move(from, to, captured, pawns + 4, MoveFlag.Capture), list);
        AddCaptureMove(pawns, _Move(from, to, captured, pawns + 3, MoveFlag.Capture), list);
        AddCaptureMove(pawns, _Move(from, to, captured, pawns + 2, MoveFlag.Capture), list);
        AddCaptureMove(pawns, _Move(from, to, captured, pawns + 1, MoveFlag.Capture), list);
    }
    else {
        AddCaptureMove(pawns, _Move(from, to, captured, Piece.None, MoveFlag.Capture), list);
    }
}

Board.GenerateMoves = () => {
    let list = [];

    let pawns = Board.Side == Side.White ? Piece.wP : Piece.bP;
    let direction = Board.Side == Side.White ? 1 : -1;
    let startRank = Board.Side == Side.White ? Rank.Rank2 : Rank.Rank7;

    for (let i = 0; i < Board.PieceCount[pawns]; i++) {
        let square = Board.PieceList[PieceIndex(pawns, i)];

        if (Board.Pieces[square + 10 * direction] == Piece.None) {
            AddPawnMove(square, square + 10 * direction, list);

            if (SquareRanks[square] == startRank && Board.Pieces[square + 20 * direction] == Piece.None) {
                AddQuietMove(_Move(square, square + 20 * direction, Piece.None, Piece.None, MoveFlag.PawnStart), list);
            }
        }

        let piece = Board.Pieces[square + 9 * direction];

        if (SquareOnBoard(square + 9 * direction) && PieceColour[piece] == (Board.Side ^ 1)) {
            AddPawnCaptureMove(square, square + 9 * direction, piece, list);
        }

        piece = Board.Pieces[square + 11 * direction];

        if (SquareOnBoard(square + 11 * direction) && PieceColour[piece] == (Board.Side ^ 1)) {
            AddPawnCaptureMove(square, square + 11 * direction, piece, list);
        }
    
        if (Board.EnPassant != Square.None) {
            if (Board.EnPassant == square + 9 * direction) {
                AddEnPassantMove(_Move(square, square + 9 * direction, Piece.None, Piece.None, MoveFlag.EnPassant), list);
            }
            else if (Board.EnPassant == square + 11 * direction) {
                AddEnPassantMove(_Move(square, square + 11 * direction, Piece.None, Piece.None, MoveFlag.EnPassant), list);
            }
        }
    }

    if (Board.Side == Side.White) {
        if (Board.Castling & Castling.WK) {
            if (Board.Pieces[Square.F1] == Piece.None &&
                Board.Pieces[Square.G1] == Piece.None &&
                !Board.SquareAttacked(Square.E1, Side.Black) &&
                !Board.SquareAttacked(Square.F1, Side.Black)
            ) {
                AddQuietMove(_Move(Square.E1, Square.G1, Piece.None, Piece.None, MoveFlag.Castling), list);
            }
        }

        if (Board.Castling & Castling.WQ) {
            if (Board.Pieces[Square.D1] == Piece.None &&
                Board.Pieces[Square.C1] == Piece.None &&
                Board.Pieces[Square.B1] == Piece.None &&
                !Board.SquareAttacked(Square.E1, Side.Black) &&
                !Board.SquareAttacked(Square.D1, Side.Black)
            ) {
                AddQuietMove(_Move(Square.E1, Square.C1, Piece.None, Piece.None, MoveFlag.Castling), list);
            }
        }
    }
    else {
        if (Board.Castling & Castling.BK) {
            if (Board.Pieces[Square.F8] == Piece.None &&
                Board.Pieces[Square.G8] == Piece.None &&
                !Board.SquareAttacked(Square.E8, Side.White) &&
                !Board.SquareAttacked(Square.F8, Side.White)
            ) {
                AddQuietMove(_Move(Square.E8, Square.G8, Piece.None, Piece.None, MoveFlag.Castling), list);
            }
        }

        if (Board.Castling & Castling.BQ) {
            if (Board.Pieces[Square.D8] == Piece.None &&
                Board.Pieces[Square.C8] == Piece.None &&
                Board.Pieces[Square.B8] == Piece.None &&
                !Board.SquareAttacked(Square.E8, Side.White) &&
                !Board.SquareAttacked(Square.D8, Side.White)
            ) {
                AddQuietMove(_Move(Square.E8, Square.C8, Piece.None, Piece.None, MoveFlag.Castling), list);
            }
        }
    }

    for (let i = SlideIndex[Board.Side]; i < SlideIndex[Board.Side] + 3; i++) {
        let piece = SlidingPieces[i];

        for (let j = 0; j < Board.PieceCount[piece]; j++) {
            let square = Board.PieceList[PieceIndex(piece, j)];
            let directions = Directions[piece];

            for (let k = 0; k < directions; k++) {
                let direction = PieceDirections[piece][k];
                let targetSquare = square + direction;

                while (SquareOnBoard(targetSquare)) {
                    let _piece = Board.Pieces[targetSquare];

                    if (_piece != Piece.None) {
                        if (PieceColour[_piece] != Board.Side) {
                            AddCaptureMove(piece, _Move(square, targetSquare, _piece, Piece.None, MoveFlag.Capture), list);
                        }

                        break;
                    }

                    AddQuietMove(_Move(square, targetSquare), list);

                    targetSquare += direction;
                }
            }
        }
    }

    for (let i = NonSlideIndex[Board.Side]; i < NonSlideIndex[Board.Side] + 2; i++) {
        let piece = NonSlidingPieces[i];

        for (let j = 0; j < Board.PieceCount[piece]; j++) {
            let square = Board.PieceList[PieceIndex(piece, j)];
            let directions = Directions[piece];

            for (let k = 0; k < directions; k++) {
                let direction = PieceDirections[piece][k];
                let targetSquare = square + direction;

                if (SquareOffBoard(targetSquare)) continue;

                let _piece = Board.Pieces[targetSquare];

                if (Board.Pieces[targetSquare] != Piece.None) {
                    if (PieceColour[Board.Pieces[targetSquare]] != Board.Side) {
                        AddCaptureMove(piece, _Move(square, targetSquare, _piece, Piece.None, MoveFlag.Capture), list);
                    }

                    continue;
                }

                AddQuietMove(_Move(square, targetSquare), list);
            }
        }
    }

    return list;
}

Board.GenerateCaptures = () => {
    let list = [];

    let pawns = Board.Side == Side.White ? Piece.wP : Piece.bP;
    let direction = Board.Side == Side.White ? 1 : -1;

    for (let i = 0; i < Board.PieceCount[pawns]; i++) {
        let square = Board.PieceList[PieceIndex(pawns, i)];
        let piece = Board.Pieces[square + 9 * direction];

        if (SquareOnBoard(square + 9 * direction) && PieceColour[piece] == (Board.Side ^ 1)) {
            AddPawnCaptureMove(square, square + 9 * direction, piece, list);
        }

        piece = Board.Pieces[square + 11 * direction];

        if (SquareOnBoard(square + 11 * direction) && PieceColour[piece] == (Board.Side ^ 1)) {
            AddPawnCaptureMove(square, square + 11 * direction, piece, list);
        }
    
        if (Board.EnPassant != Square.None) {
            if (Board.EnPassant == square + 9 * direction) {
                AddEnPassantMove(_Move(square, square + 9 * direction, Piece.None, Piece.None, MoveFlag.EnPassant), list);
            }
            else if (Board.EnPassant == square + 11 * direction) {
                AddEnPassantMove(_Move(square, square + 11 * direction, Piece.None, Piece.None, MoveFlag.EnPassant), list);
            }
        }
    }

    for (let i = SlideIndex[Board.Side]; i < SlideIndex[Board.Side] + 3; i++) {
        let piece = SlidingPieces[i];

        for (let j = 0; j < Board.PieceCount[piece]; j++) {
            let square = Board.PieceList[PieceIndex(piece, j)];
            let directions = Directions[piece];

            for (let k = 0; k < directions; k++) {
                let direction = PieceDirections[piece][k];
                let targetSquare = square + direction;

                while (SquareOnBoard(targetSquare)) {
                    let _piece = Board.Pieces[targetSquare];

                    if (_piece != Piece.None) {
                        if (PieceColour[_piece] != Board.Side) {
                            AddCaptureMove(piece, _Move(square, targetSquare, _piece, Piece.None, MoveFlag.Capture), list);
                        }

                        break;
                    }

                    targetSquare += direction;
                }
            }
        }
    }

    for (let i = NonSlideIndex[Board.Side]; i < NonSlideIndex[Board.Side] + 2; i++) {
        let piece = NonSlidingPieces[i];

        for (let j = 0; j < Board.PieceCount[piece]; j++) {
            let square = Board.PieceList[PieceIndex(piece, j)];
            let directions = Directions[piece];

            for (let k = 0; k < directions; k++) {
                let direction = PieceDirections[piece][k];
                let targetSquare = square + direction;

                if (SquareOffBoard(targetSquare)) continue;

                let _piece = Board.Pieces[targetSquare];

                if (Board.Pieces[targetSquare] != Piece.None) {
                    if (PieceColour[Board.Pieces[targetSquare]] != Board.Side) {
                        AddCaptureMove(piece, _Move(square, targetSquare, _piece, Piece.None, MoveFlag.Capture), list);
                    }

                    continue;
                }
            }
        }
    }

    return list;
}