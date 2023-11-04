function SquareString(square) {
    let file = SquareFiles[square];
    let rank = SquareRanks[square];

    return "" + FileChar[file] + RankChar[rank];
}

function MoveString(move) {
    let from = FromSquare(move);
    let to = ToSquare(move);

    return SquareString(from) + SquareString(to);
}

function ParseMove(from, to, promoted = Piece.None) {
    let list = Board.GenerateMoves();

    for (let i = 0; i < list.length; i++) {
        let move = list[i].move;

        if (from == FromSquare(move) && to == ToSquare(move)) {
            let _promoted = PromotedPiece(move);
            if (_promoted == Piece.None && _promoted == promoted) return move;
        }
    }

    return NoMove;
}