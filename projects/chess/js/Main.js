function InitSquares() {
    let square64 = 0;

    for (let square = 0; square < 120; square++) Square120[square] = 65;
    for (let square = 0; square < 64; square++) Square64[square] = 120;

    
    for (let rank = Rank.Rank1; rank <= Rank.Rank8; rank++) {
        for (let file = File.FileA; file <= File.FileH; file++) {
            let square120 = GetSquare(file, rank);

            Square120[square64] = square120;
            Square64[square120] = square64;

            square64++;
        }
    }
}

function InitFileRankLookup() {
    for (let square = 0; square < 120; square++) {
        SquareFiles[square] = Square.OffBoard;
        SquareRanks[square] = Square.OffBoard;
    }

    for (let square64 = 0; square64 < 64; square64++) {
        let square120 = Square120[square64];
        let file = square64 & 7;
        let rank = square64 >> 3;

        SquareFiles[square120] = file;
        SquareRanks[square120] = rank;
    }
}

function InitHashKeys() {
    for (let i = 0; i < 14 * 120; i++) {
        PieceKeys[i] = Rand32();
    }

    for (let castling = 0; castling < 16; castling++) {
        CastlingKeys[castling] = Rand32();
    }
}

let BotPlaying = false;
let BotThinking = false;

let MoveTime;
let Depth;

function MoveNow() {
    BotThinking = true;

    let timeSet = false;
    let depthSet = false;

    let time = MoveTime.value;
    let depth = Depth.value;

    if (depth) depthSet = true;
    else depth = DefaultSettings.Depth;

    if (time) timeSet = true;
    else time = depthSet ? -1 : DefaultSettings.Time;

    if (depth > 64) depth = 64;

    let info = new SearchInfo(time, depth);
    let move = Search(info);

    Board.MakeMove(move);

    let moveType = MoveType.Quiet;

    if ((move & MoveFlag.Castling)) moveType = MoveType.Castling;
    else if (CapturedPiece(move) || (move & MoveFlag.EnPassant)) moveType = MoveType.Capture;

    if (Board.SquareAttacked(Board.KingSquares[Board.Side], Board.Side ^ 1)) moveType = MoveType.Check;

    UI.Update(move, true, moveType);

    BotThinking = false;
}

const DefaultSettings = {
    Time: 1,
    Depth: 64
}

function Main() {
    InitSquares();
    InitFileRankLookup();
    InitHashKeys();
    InitUI();
    InitInput();
    InitBoard();
    InitPieceSquareTables();
    InitSearch();

    MoveTime = document.getElementById("movetime");
    Depth = document.getElementById("max-depth");

    const FEN = document.getElementById("fen");

    document.getElementById("new-game").addEventListener("click", () => {
        BotPlaying = false;

        Board.ParseFEN(StartFEN);
        UI.Reset();
        UI.Update();
    });
    
    document.getElementById("take-move").addEventListener("click", () => {
        if (!Board.HistoryPly) return;

        Board.TakeMove();

        if (Board.HistoryPly) {
            UI.Update(Board.History[Board.HistoryPly - 1].Move);
        }
        else {
            UI.Reset();
            UI.Update();
        }
    });

    document.getElementById("parse-fen").addEventListener("click", () => {
        Board.ParseFEN(FEN.value);
        
        UI.Reset();
        UI.Update();
    });

    document.getElementById("play-white").addEventListener("click", () => {
        BotPlaying = true;

        Board.ParseFEN(StartFEN);

        UI.Reset();
        UI.Update();
    });

    document.getElementById("play-black").addEventListener("click", async () => {
        BotPlaying = true;

        Board.ParseFEN(StartFEN);

        UI.Reset();
        UI.Update();

        await Wait(0);

        MoveNow();
    });

    document.getElementById("flip-board").addEventListener("click", () => {
        UI.FlipBoard = !UI.FlipBoard;
        UI.Update();
    });

    document.getElementById("move-now").addEventListener("click", MoveNow);
}

window.addEventListener("load", Main);