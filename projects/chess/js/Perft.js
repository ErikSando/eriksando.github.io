function Perft(depth) {
    if (depth <= 0) return 1;

    let nodes = 0;

    let list = Board.GenerateMoves();

    for (let i = 0; i < list.length; i++) {
        if (!Board.MakeMove(list[i].move)) continue;

        nodes += Perft(depth - 1);
        Board.TakeMove();
    }

    return nodes;
}

function PerftTest(depth) {
    console.log("Starting test to depth " + depth);

    let nodes = 0;

    let start = Date.now();

    let list = Board.GenerateMoves();

    for (let i = 0; i < list.length; i++) {
        let move = list[i].move;
        if (!Board.MakeMove(move)) continue;

        let oldNodes = nodes;

        nodes += Perft(depth - 1);
        Board.TakeMove();

        let newNodes = nodes - oldNodes;

        console.log(MoveString(move) + ": " + newNodes);
    }

    let end = Date.now();
    let duration = end - start;

    let nps = duration > 0 ? nodes / duration * 1000 : "nil";

    console.log("Nodes visited:  " + nodes);
    console.log("Time elapsed:   " + duration);
    console.log("Nodes/second:   " + Math.round(nps));
}