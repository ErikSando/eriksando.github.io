const CastlingUpdate = [
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 13, 15, 15, 15, 12, 15, 15, 14, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15,  7, 15, 15, 15,  3, 15, 15, 11, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15
];

function RemovePiece(square) {
    let piece = Board.Pieces[square];
    let colour = PieceColour[piece];
    let targetPieceIndex = -1;

    Board.PositionKey ^= PieceKeys[piece * 120 + square];
    Board.Pieces[square] = Piece.None;

    if (PieceBig[piece]) Board.BigPieces[colour]--;
    
    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let index = PieceIndex(piece, i);

        if (Board.PieceList[index] == square) {
            targetPieceIndex = index;
            break;
        }
    }

    Board.PieceCount[piece]--;
    Board.PieceList[targetPieceIndex] = Board.PieceList[PieceIndex(piece, Board.PieceCount[piece])];
}

function AddPiece(piece, square) {
    let colour = PieceColour[piece];

    Board.PositionKey ^= PieceKeys[piece * 120 + square];
    Board.Pieces[square] = piece;

    if (PieceBig[piece]) Board.BigPieces[colour]++;

    Board.PieceList[PieceIndex(piece, Board.PieceCount[piece])] = square;
    Board.PieceCount[piece]++;
}

function MovePiece(from, to) {
    let piece = Board.Pieces[from];

    Board.PositionKey ^= PieceKeys[piece * 120 + from];
    Board.Pieces[from] = Piece.None;

    Board.PositionKey ^= PieceKeys[piece * 120 + to];
    Board.Pieces[to] = piece;

    for (let i = 0; i < Board.PieceCount[piece]; i++) {
        let index = PieceIndex(piece, i);

        if (Board.PieceList[index] == from) {
            Board.PieceList[index] = to;
            break;
        }
    }
}

Board.MakeMove = (move) => {
    let from = FromSquare(move);
    let to = ToSquare(move);
    let side = Board.Side;

    Board.History[Board.HistoryPly].PositionKey = Board.PositionKey;
    Board.History[Board.HistoryPly].Move = move;
    Board.History[Board.HistoryPly].FiftyMoveRule = Board.FiftyMoveRule;
    Board.History[Board.HistoryPly].EnPassant = Board.EnPassant;
    Board.History[Board.HistoryPly].Castling = Board.Castling;

    if (Board.EnPassant != Square.None) {
        Board.PositionKey ^= PieceKeys[Board.EnPassant];
        Board.EnPassant = Square.None;
    }

    Board.PositionKey ^= CastlingKeys[Board.Castling];

    Board.Castling &= CastlingUpdate[from];
    Board.Castling &= CastlingUpdate[to];

    Board.PositionKey ^= CastlingKeys[Board.Castling];

    Board.Ply++;
    Board.HistoryPly++;
    Board.FiftyMoveRule++;

    if (move & MoveFlag.EnPassant) {
        if (Board.Side == Side.White) RemovePiece(to - 10);
        else RemovePiece(to + 10);
    }
    else if (move & MoveFlag.Castling) {
        switch (to) {
            case Square.G1: MovePiece(Square.H1, Square.F1); break;
            case Square.C1: MovePiece(Square.A1, Square.D1); break;
            case Square.G8: MovePiece(Square.H8, Square.F8); break;
            case Square.C8: MovePiece(Square.A8, Square.D8); break;
        }
    }

    let captured = CapturedPiece(move);

    if (captured != Piece.None) {
        RemovePiece(to);
        Board.FiftyMoveRule = 0;

        if (PieceBig[captured]) Board.BigPieces[Board.Side ^ 1]--;
    }

    if (PiecePawn[Board.Pieces[from]]) {
        Board.FiftyMoveRule = 0;

        if (move & MoveFlag.PawnStart) {
            if (Board.Side == Side.White) Board.EnPassant = from + 10;
            else Board.EnPassant = from - 10;

            Board.PositionKey ^= PieceKeys[Board.EnPassant];
        }
    }

    MovePiece(from, to);

    let promoted = PromotedPiece(move);

    if (promoted) {
        RemovePiece(to);
        AddPiece(promoted, to);
    }

    if (PieceKing[Board.Pieces[to]]) Board.KingSquares[Board.Side] = to;

    Board.Side ^= 1;
    Board.PositionKey ^= SideKey;

    if (Board.SquareAttacked(Board.KingSquares[side], Board.Side)) {
        Board.TakeMove();
        return false;
    }

    return true;
}

Board.TakeMove = () => {
    Board.Ply--;
    Board.HistoryPly--;

    let move = Board.History[Board.HistoryPly].Move;
    let from = FromSquare(move);
    let to = ToSquare(move);

    if (Board.EnPassant != Square.None) Board.PositionKey ^= PieceKeys[Board.EnPassant];
    Board.PositionKey ^= CastlingKeys[Board.Castling];

    Board.EnPassant = Board.History[Board.HistoryPly].EnPassant;
    Board.Castling = Board.History[Board.HistoryPly].Castling;
    Board.FiftyMoveRule = Board.History[Board.HistoryPly].FiftyMoveRule;

    if (Board.EnPassant != Square.None) Board.PositionKey ^= PieceKeys[Board.EnPassant];
    Board.PositionKey ^= CastlingKeys[Board.Castling];

    Board.Side ^= 1;
    Board.PositionKey ^= SideKey;

    if (move & MoveFlag.EnPassant) {
        if (Board.Side == Side.White) AddPiece(Piece.bP, to - 10);
        else AddPiece(Piece.wP, to + 10);
    }
    else if (move & MoveFlag.Castling) {
        switch (to) {
            case Square.G1: MovePiece(Square.F1, Square.H1); break;
            case Square.C1: MovePiece(Square.D1, Square.A1); break;
            case Square.G8: MovePiece(Square.F8, Square.H8); break;
            case Square.C8: MovePiece(Square.D8, Square.A8); break;
        }
    }

    MovePiece(to, from);

    if (PieceKing[Board.Pieces[from]]) Board.KingSquares[Board.Side] = from;

    let captured = CapturedPiece(move);
    let promoted = PromotedPiece(move);

    if (captured != Piece.None) {
        AddPiece(captured, to);

        if (PieceBig[captured]) Board.BigPieces[Board.Side ^ 1]++;
    }

    if (promoted != Piece.None) {
        RemovePiece(from);
        AddPiece(PieceColour[promoted] == Side.White ? Piece.wP : Piece.bP, from);
    }
}

Board.MakeNullMove = () => {
    Board.History[Board.HistoryPly].PositionKey = Board.PositionKey;
    Board.History[Board.HistoryPly].FiftyMoveRule = Board.FiftyMoveRule;
    Board.History[Board.HistoryPly].EnPassant = Board.EnPassant;
    Board.History[Board.HistoryPly].Castling = Board.Castling;

    Board.Side ^= 1;
    Board.PositionKey ^= SideKey;

    if (Board.EnPassant != Square.None) {
        Board.PositionKey ^= PieceKeys[Board.EnPassant];
        Board.EnPassant = Square.None;
    }

    Board.Ply++;
    Board.HistoryPly++;
}

Board.TakeNullMove = () => {
    Board.Ply--;
    Board.HistoryPly--;

    Board.EnPassant = Board.History[Board.HistoryPly].EnPassant;
    Board.Castling = Board.History[Board.HistoryPly].Castling;
    Board.FiftyMoveRule = Board.History[Board.HistoryPly].FiftyMoveRule;

    if (Board.EnPassant != Square.None) {
        Board.PositionKey ^= PieceKeys[Board.EnPassant];
    }

    Board.Side ^= 1;
    Board.PositionKey ^= SideKey;
}