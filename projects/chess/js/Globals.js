const MaxGameMoves = 2048;
const MaxPositionMoves = 256;
const MaxDepth = 64;
const InfBound = 30000;
const MateScore = InfBound - MaxDepth;

const Piece = { None: 0, wP: 1, wN: 2, wB: 3, wR: 4, wQ: 5, wK: 6, bP: 7, bN: 8, bB: 9, bR: 10, bQ: 11, bK: 12 }

const Rank = { Rank1: 0, Rank2: 1, Rank3: 2, Rank4: 3, Rank5: 4, Rank6: 5, Rank7: 6, Rank8: 7 }
const File = { FileA: 0, FileB: 1, FileC: 2, FileD: 4, FileE: 4, FileF: 5, FileG: 6, FileH: 7 }

const Square = {
    A1: 21, B1: 22, C1: 23, D1: 24, E1: 25, F1: 26, G1: 27, H1: 28,
    A8: 91, B8: 92, C8: 93, D8: 94, E8: 95, F8: 96, G8: 97, H8: 98,
    None: 99, OffBoard: 100
}

const Side = { White: 0, Black: 1, Both: 2 }

const Castling = { WK: 1, WQ: 2, BK: 4, BQ: 8 }

const SquareFiles = [];
const SquareRanks = [];

const StartFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const Square120 = new Array(64);
const Square64 = new Array(120);

const PieceColour = [
    Side.Both,
    Side.White, Side.White, Side.White, Side.White, Side.White, Side.White,
    Side.Black, Side.Black, Side.Black, Side.Black, Side.Black, Side.Black
];

const FileChar = "abcdefgh";
const RankChar = "12345678";

const PieceBig = [
    false,
    false, true, true, true, true, true,
    false, true, true, true, true, true
];

const PiecePawn = [
    false,
    true, false, false, false, false, false,
    true, false, false, false, false, false
];

const PieceKnight = [
    false,
    false, true, false, false, false, false,
    false, true, false, false, false, false
];

const PieceBishopQueen = [
    false,
    false, false, true, false, true, false,
    false, false, true, false, true, false
];

const PieceRookQueen = [
    false,
    false, false, false, true, true, false,
    false, false, false, true, true, false
];

const PieceKing = [
    false,
    false, false, false, false, false, true,
    false, false, false, false, false, true
];

const GetSquare = (file, rank) => file + 21 + rank * 10;

const SquareOnBoard = (square) => SquareFiles[square] != Square.OffBoard;
const SquareOffBoard = (square) => SquareFiles[square] == Square.OffBoard;

const PieceIndex = (piece, number) => piece * 10 + number;

const MoveFlag = {
    PawnStart: 0x400000,
    EnPassant: 0x800000,
    Castling: 0x1000000,
    None: 0
}

const FromSquare = (move) => move & 0x7F;
const ToSquare = (move) => (move & 0x3F80) >> 7;
const CapturedPiece = (move) => (move & 0x3C000) >> 14;
const PromotedPiece = (move) => (move & 0x3C0000) >> 18;

const NoMove = 0;

class Move {
    move;
    score;

    constructor(info = NoMove, score = 0) {
        this.move = info;
        this.score = score;
    }
}

class SearchInfo {
    StartTime;
    StopTime;
    TimeSet = false;
    Depth = MaxDepth;
    Nodes = 0;
    Stopped = false;

    constructor(time = -1, depth = MaxDepth) {
        this.StartTime = performance.now();

        if (time != -1) {
            this.StopTime = this.StartTime + time * 1000;
            this.TimeSet = true;
        }

        this.Depth = depth;
    }
}

const HashFlag = {
    None: 0,
    Alpha: 1,
    Beta: 2,
    Exact: 3
}

const NoScore = InfBound + 1000;

function Wait(milliseconds) {
    return new Promise(resolve => { setTimeout(resolve, milliseconds) });
}

function Rand32() {
    return Math.floor(Math.random() * 255 + 1) << 23 | Math.floor(Math.random() * 255 + 1) << 16
    | Math.floor(Math.random() * 255 + 1) << 8 | Math.floor(Math.random() * 255 + 1);
}

const PieceKeys = new Array(14 * 120);
const CastlingKeys = new Array(16);
const SideKey = Rand32();