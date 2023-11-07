const HashEntries = 3000000;

const Board = {
    Pieces: new Array(120),
    PieceCount: new Array(13),
    PieceList: new Array(140),
    BigPieces: new Array(2),
    PositionKey: 0,
    Side: Side.Both,
    EnPassant: Square.None,
    Castling: 0,
    FiftyMoveRule: 0,
    KingSquares: [ Square.None, Square.None ],
    Ply: 0,
    HistoryPly: 0,
    History: new Array(MaxGameMoves),
    PVList: new Array(MaxDepth),
    PVLength: 0,
    HashTable: new HashTable(HashEntries),
    KillerMoves1: new Array(MaxDepth),
    KillerMoves2: new Array(MaxDepth),
    HistoryMoves: new Array(64)
}

Board.Reset = () => {
    for (let square64 = 0; square64 < 64; square64++) {
        Board.Pieces[Square120[square64]] = Piece.None;
    }

    for (let piece = Piece.None; piece <= Piece.bK; piece++) {
        Board.PieceCount[piece] = 0;
    }

    Board.BigPieces[Side.White] = Board.BigPieces[Side.Black] = 0;

    Board.Side = Side.Both;
    Board.EnPassant = Square.None;
    Board.Castling = 0;
    Board.FiftyMoveRule = 0;
    Board.Ply = 0;
    Board.HistoryPly = 0;
}

Board.GeneratePositionKey = () => {
    let key = 0;

    for (let piece = Piece.wP; Piece <= Piece.bK; piece++) {
        let bitboard = 1 + Board.Bitboards[piece] - 1;

        while (bitboard) {
            let square = GLS1BI(bitboard);
            ClearBit(bitboard, square);

            key ^= PieceKeys[piece][square];
        }
    }

    if (Board.EnPassant != Square.None) key ^= EnPassantKeys[Board.EnPassant];
    if (Board.Side == Side.White) key ^= SideKey;

    key ^= CastlingKeys[Board.Castling];

    Board.PositionKey = key;
}

Board.GeneratePieceList = () => {
    for (let square64 = 0; square64 < 64; square64++) {
        let square = Square120[square64];
        let piece = Board.Pieces[square];

        if (piece) {
            let colour = PieceColour[piece];

            if (PieceBig[piece]) Board.BigPieces[colour]++;
        
            Board.PieceList[PieceIndex(piece, Board.PieceCount[piece])] = square;
            Board.PieceCount[piece]++;
        }
    }
}

Board.ParseFEN = (fen) => {
    Board.Reset();

    let rank = Rank.Rank8;
    let file = File.FileA;
    let piece = Piece.None;
    let count = 0;
    let index = 0;

    while (rank >= Rank.Rank1 && index < fen.length) {
        count = 1;

        switch (fen[index]) {
            case "p": piece = Piece.bP; break;
            case "n": piece = Piece.bN; break;
            case "b": piece = Piece.bB; break;
            case "r": piece = Piece.bR; break;
            case "q": piece = Piece.bQ; break;
            case "k": piece = Piece.bK; break;
            case "P": piece = Piece.wP; break;
            case "N": piece = Piece.wN; break;
            case "B": piece = Piece.wB; break;
            case "R": piece = Piece.wR; break;
            case "Q": piece = Piece.wQ; break;
            case "K": piece = Piece.wK; break;

            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
                piece = Piece.None;
                count = fen[index].charCodeAt() - "0".charCodeAt();
                break;
        
            case "/":
            case " ":
                rank--;
                file = File.FileA;
                index++;
                continue;
            
            default:
                Board.Reset();
                console.error("Invalid FEN");
                return;
        }

        for (let i = 0; i < count; i++) {
            let square = GetSquare(file, rank);
            Board.Pieces[square] = piece;

            let colour = PieceColour[piece];

            if (PieceKing[piece]) Board.KingSquares[PieceColour[piece]] = square;
            if (PieceBig[piece]) Board.BigPieces[colour]++;

            file++;
        }

        index++;
    }

    Board.Side = fen[index] == "w" ? Side.White : Side.Black;
    index += 2;

    for (let i = 0; i < 4; i++) {
        if (fen[index] == " ") break;

        switch (fen[index]) {
            case "K": Board.Castling |= Castling.WK; break;
            case "Q": Board.Castling |= Castling.WQ; break;
            case "k": Board.Castling |= Castling.BK; break;
            case "q": Board.Castling |= Castling.BQ; break;
            default: break;
        }

        index++;
    }

    index++;

    if (fen[index] != "-") {
        file = fen[index].charCodeAt() = 'a'.charCodeAt();
        rank = fen[index + 1].charCodeAt() - '1'.charCodeAt();

        Board.EnPassant = GetSquare(file, rank);
    }

    Board.GeneratePositionKey();
    Board.GeneratePieceList();
}

Board.GetFEN = () => {
    let fen = "";

    return fen;
}

Board.SquareAttacked = (square, side) => {
    for (let i = 0; i < 4; i++) {
        let direction = BishopDirections[i];
        let targetSquare = square + direction;
        let piece = Board.Pieces[targetSquare];

        while (piece != Square.OffBoard) {
            if (piece) {
                if (PieceBishopQueen[piece] && PieceColour[piece] == side) return true; 
                break;
            }

            targetSquare += direction;
            piece = Board.Pieces[targetSquare];
        }
    }

    for (let i = 0; i < 4; i++) {
        let direction = RookDirections[i];
        let targetSquare = square + direction;
        let piece = Board.Pieces[targetSquare];

        while (piece != Square.OffBoard) {
            if (piece) {
                if (PieceRookQueen[piece] && PieceColour[piece] == side) return true;
                break;
            }

            targetSquare += direction;
            piece = Board.Pieces[targetSquare];
        }
    }

    for (let i = 0; i < 8; i++) {
        let piece = Board.Pieces[square + KnightDirections[i]];
        if (PieceKnight[piece] && PieceColour[piece] == side) return true;
    }

    if (side == Side.White) {
        if (Board.Pieces[square - 11] == Piece.wP || Board.Pieces[square - 9] == Piece.wP) return true;
    }
    else {
        if (Board.Pieces[square + 11] == Piece.bP || Board.Pieces[square + 9] == Piece.bP) return true;
    }

    for (let i = 0; i < 8; i++) {
        let piece = Board.Pieces[square + KingDirections[i]];
        if (PieceKing[piece] && PieceColour[piece] == side) return true;
    }

    return false;
}

function InitBoard() {
    for (let i = 0; i < MaxPositionMoves; i++) {
        Board.History[i] = {
            Move: NoMove,
            EnPassant: 0,
            FiftyMoveRule: 0,
            PositionKey: 0
        }
    }

    for (let i = 0; i < HashEntries; i++) {
        Board.HashTable[i] = {
            Move: NoMove,
            Score: 0,
            Depth: 0,
            Flag: HashFlag.None,
            PositionKey: 0
        }
    }

    for (let from = 0; from < 64; from++) {
        Board.HistoryMoves.push(new Array(64));

        for (let to = 0; to < 64; to++) {
            Board.HistoryMoves[to] = 0;
        }
    }

    for (let square = 0; square < 120; square++) {
        Board.Pieces[square] = Square.OffBoard;
    }

    Board.ParseFEN(StartFEN);
}