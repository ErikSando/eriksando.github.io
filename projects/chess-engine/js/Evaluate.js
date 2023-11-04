const MirrorSquare64 = (square64) => square64 ^ 56;

const PawnMgTable = [
    0,   0,   0,   0,   0,   0,   0,   0,
   50,  50,  50,  50,  50,  50,  50,  50,
   10,  10,  20,  30,  30,  20,  10,  10,
    5,   5,  10,  20,  20,  10,   5,   5,
    0,   0,   0,  25,  25,   0,   0,   0,
    5,  -5, -10,   0,   0, -10,  -5,   5,
    5,  10,  10, -25, -30,  10,  10,   5,
    0,   0,   0,   0,   0,   0,   0,   0
];

const PawnEgTable = [
    0,   0,   0,   0,   0,   0,   0,   0,
   50,  50,  50,  50,  50,  50,  50,  50,
   35,  35,  35,  35,  35,  35,  35,  35,
   20,  20,  20,  20,  20,  20,  20,  20,
    5,   5,   5,   5,   5,   5,   5,   5,
  -10, -10, -10, -10, -10, -10, -10, -10,
  -10, -10, -10, -10, -10, -10, -10, -10,
    0,   0,   0,   0,   0,   0,   0,   0
];

const KnightTable = [
	-20, -15, -10, -10, -10, -10, -15, -20,
	-15, -10,   0,   0,   0,   0, -10, -15,
	-10,   0,   3,   8,   8,   3,   0, -10,
	-10,   3,   8,  10,  10,   8,   3, -10,
	-10,   0,   8,  10,  10,   8,   0, -10,
	-10,   3,   5,   8,   8,   5,   3, -10,
	-15, -10,   0,   3,   3,   0, -10, -15,
	-20, -15, -10, -10, -10, -10, -18, -20
];

const BishopTable = [
	-10,  -5,  -5,  -5,  -5,  -5,  -5, -10,
	 -5,   0,   0,   0,   0,   0,   0,  -5,
	 -5,   0,   3,   5,   5,   3,   0,  -5,
	 -5,   3,   3,   5,   5,   3,   3,  -5,
	 -5,   0,   5,   5,   5,   5,   0,  -5,
	 -5,   5,   5,   5,   5,   5,   5,  -5,
	 -5,   3,   0,   0,   0,   0,   3,  -5,
	-10,  -5,  -5,  -5, - 5,  -5,  -5, -10
];

const RookTable = [
    0,   0,   0,   5,   5,   0,   0,   0,
    5,  10,  10,  10,  10,  10,  10,   5,
   -4,   0,   0,   4,   4,   0,   0,  -4,
   -4,   0,   0,   4,   4,   0,   0,  -4,
   -4,   0,   0,   4,   4,   0,   0,  -4,
   -4,   0,   0,   4,   4,   0,   0,  -4,
   -4,   0,   0,   4,   4,   0,   0,  -4,
    0,   0,   3,   6,   6,   4,   0,   0
];

const QueenTable = [
    -5,  -5,  -5,  -3,  -3,  -5,  -5, -10,
    -5,   0,   0,   0,   0,   0,   0,  -5,
    -5,   0,   3,   3,   3,   3,   0,  -5,
    -3,   0,   3,   3,   3,   3,   0,  -3,
     0,   0,   3,   3,   3,   3,   0,  -3,
    -5,   3,   3,   3,   3,   3,   0,  -5,
    -5,   0,   3,   0,   0,   0,   0,  -5,
   -10,  -5,  -5,  -3,  -3,  -5,  -5, -10
];

const KingMgTable = [
	-60, -60, -60, -60, -60, -60, -60, -60,
	-60, -60, -60, -60, -60, -60, -60, -60,
	-60, -60, -60, -60, -60, -60, -60, -60,
	-60, -60, -60, -60, -60, -60, -60, -60,
	-60, -60, -60, -60, -60, -60, -60, -60,
	-60, -60, -60, -60, -60, -60, -60, -60,
	-40, -40, -40, -40, -40, -40, -40, -40,
	 20,  40,  30, -30,   0, -30,  40,  20
];

const KingEgTable = [
	-30, -20, -10,   0,   0, -10, -20, -30,
	-20, -10,   0,  10,  10,   0, -10, -20,
	-20,   0,  10,  20,  20,  10,   0, -20,
	-20,   0,  10,  20,  20,  10,   0, -20,
	-20,   0,  10,  20,  20,  10,   0, -20,
	-20, -10,   0,  10,  10,   0, -10, -20,
	-30, -20, -10,   0,   0, -10, -20, -30,
	-40, -30, -20, -10, -10, -20, -30, -40
];

const PieceMgTables = [
    [],
    PawnMgTable,
    KnightTable,
    BishopTable,
    RookTable,
    QueenTable,
    KingMgTable
];

const PieceEgTables = [
    [],
    PawnEgTable,
    KnightTable,
    BishopTable,
    RookTable,
    QueenTable,
    KingEgTable
];

const PieceMgValue = [ 0, 100, 320, 330, 500, 950, 0 ];
const PieceEgValue = [ 0, 110, 290, 320, 550, 900, 0 ];

const MgTables = new Array(13);
const EgTables = new Array(13);

const GamePhaseIncrement = [ 0, 0, 1, 1, 2, 4, 0, 0, 1, 1, 2, 4, 0 ];

function InitPieceSquareTables() {
    for (let piece = Piece.wP; piece <= Piece.wK; piece++) {
        MgTables[piece] = new Array(64);
        EgTables[piece] = new Array(64);

        for (let square = 0; square < 64; square++) {
            MgTables[piece][square] = PieceMgValue[piece] + PieceMgTables[piece][MirrorSquare64(square)];
            EgTables[piece][square] = PieceEgValue[piece] + PieceEgTables[piece][MirrorSquare64(square)];
        }
    }

    for (let piece = Piece.bP; piece <= Piece.bK; piece++) {
        MgTables[piece] = new Array(64);
        EgTables[piece] = new Array(64);

        for (let square = 0; square < 64; square++) {
            MgTables[piece][square] = PieceMgValue[piece - 6] + PieceMgTables[piece - 6][square];
            EgTables[piece][square] = PieceEgValue[piece - 6] + PieceEgTables[piece - 6][square];
        }
    }
}

function MaterialDraw() {

    return false;
}

function Evaluate() {
    if (MaterialDraw()) return 0;

    let mgScore = 0;
    let egScore = 0;
    let score = 0;

    let gamePhase = 0;

    let pawns = 0;
    let bishops = [ 0, 0 ];

    let piece = Piece.wP;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore += MgTables[piece][square];
        egScore += EgTables[piece][square];
    }

    piece = Piece.bP;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore -= MgTables[piece][square];
        egScore -= EgTables[piece][square];
    }

    piece = Piece.wN;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore += MgTables[piece][square];
        egScore += EgTables[piece][square];
    }

    piece = Piece.bN;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore -= MgTables[piece][square];
        egScore -= EgTables[piece][square];
    }

    piece = Piece.wB;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore += MgTables[piece][square];
        egScore += EgTables[piece][square];
    }

    piece = Piece.bB;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore -= MgTables[piece][square];
        egScore -= EgTables[piece][square];
    }

    piece = Piece.wR;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore += MgTables[piece][square];
        egScore += EgTables[piece][square];
    }

    piece = Piece.bR;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore -= MgTables[piece][square];
        egScore -= EgTables[piece][square];
    }

    piece = Piece.wQ;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore += MgTables[piece][square];
        egScore += EgTables[piece][square];
    }

    piece = Piece.bQ;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore -= MgTables[piece][square];
        egScore -= EgTables[piece][square];
    }

    piece = Piece.wK;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore += MgTables[piece][square];
        egScore += EgTables[piece][square];
    }

    piece = Piece.bK;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let square = Square64[Board.PieceList[PieceIndex(piece, i)]];

        gamePhase += GamePhaseIncrement[piece];

        mgScore -= MgTables[piece][square];
        egScore -= EgTables[piece][square];
    }

    let mgPhase = gamePhase;
    if (mgPhase > 24) mgPhase = 24;

    let egPhase = 24 - mgPhase;

    let evaluation = (mgScore * mgPhase + egScore * egPhase) / 24 + score;

    return Board.Side == Side.White ? evaluation : -evaluation;
}