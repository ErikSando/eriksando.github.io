const Input = {
    MousePos: { x: 0, y: 0 },
    MouseDown: false,

    Keys: { // for promotions
        "KeyQ": {
            pressed: false,
            pieceIndex: 4
        },

        "KeyR":  {
            pressed: false,
            pieceIndex: 3
        },

        "KeyB":  {
            pressed: false,
            pieceIndex: 2
        },

        "KeyN":  {
            pressed: false,
            pieceIndex: 1
        },
    },

    GetMousePosition(e) {
        let rect = canvas.getBoundingClientRect();

        Input.MousePos = {
            x: e.clientX - rect.x,
            y: e.clientY - rect.y
        }
    },

    GetCurrentSquare() {
        let squareSize = canvas.width / 8;

        let file = Math.floor(Input.MousePos.x / squareSize);
        let rank = 7 - Math.floor(Input.MousePos.y / squareSize);

        let square = Square.None;

        if (file >= File.FileA && file <= File.FileH && rank >= Rank.Rank1 && rank <= Rank.Rank8) {
            square = GetSquare(file, rank);
        }
        
        return square;
    }
}

function InitInput() {
    window.addEventListener("mousedown", (e) => {
        Input.MouseDown = true;
        Input.GetMousePosition(e);

        let square = Input.GetCurrentSquare();

        if (square == Square.None) return;
        if (Board.Pieces[square] == Piece.None) return;

        UI.SelectedPieceSquare = square;

        let selectedFile = SquareFiles[UI.SelectedPieceSquare];
        let selectedRank = 7 - SquareRanks[UI.SelectedPieceSquare];

        let squareSize = canvas.width / 8;

        let pieceX = selectedFile * squareSize;
        let pieceY = selectedRank * squareSize;

        UI.SelectedPieceOffset = {
            x: Input.MousePos.x - pieceX - squareSize / 2,
            y: Input.MousePos.y - pieceY - squareSize / 2
        }

        let list = Board.GenerateMoves();

        for (let i = 0; i < list.length; i++) {
            let move = list[i].move;
            let from = FromSquare(move);

            if (from != square || !Board.MakeMove(move)) continue;
            Board.TakeMove();

            let to = ToSquare(move);

            UI.HighlightedSquares.push(to);
        }

        UI.Update();
    });
    
    window.addEventListener("mouseup", async (e) => {
        Input.MouseDown = false;

        let square = Input.GetCurrentSquare();
        let willMove = false;
        let move = NoMove;

        if (square != Square.None) {
            let from = UI.SelectedPieceSquare;
            let to = square;

            let promotionStart = Board.Side == Side.White ? Piece.wP : Piece.bP;
            let promoted = Piece.None;

            for (let key of Object.entries(Input.Keys)) {
                if (key[1].pressed) {
                    promoted = promotionStart + key[1].pieceIndex;
                }
            }

            move = ParseMove(from, to, promoted);

            if (move != NoMove && Board.MakeMove(move) && BotPlaying) willMove = true;
        }

        UI.SelectedPieceSquare = Square.None;
        UI.HighlightedSquares = [];
        UI.Update(move);

        await Wait(50); // makes the piece place down before the engine starts thinking so im keeping it

        if (willMove) MoveNow();
    });
    
    window.addEventListener("mousemove", (e) => {
        if (!Input.MouseDown || UI.SelectedPieceSquare == Square.None) return;

        Input.GetMousePosition(e);

        let selectedFile = SquareFiles[UI.SelectedPieceSquare];
        let selectedRank = 7 - SquareRanks[UI.SelectedPieceSquare];

        let squareSize = canvas.width / 8;

        let pieceX = selectedFile * squareSize;
        let pieceY = selectedRank * squareSize;

        UI.SelectedPieceOffset = {
            x: Input.MousePos.x - pieceX - squareSize / 2,
            y: Input.MousePos.y - pieceY - squareSize / 2
        }

        UI.Update();
    });

    window.addEventListener("keydown", (e) => {
        if (e.code in Input.Keys) {
            Input.Keys[e.code].pressed = true;
        }
    });

    window.addEventListener("keyup", (e) => {
        if (e.code in Input.Keys) {
            Input.Keys[e.code].pressed = false;
        }
    });
}