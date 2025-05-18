let canvas;
let ctx;

const PieceNames = [null, "pawn_w", "knight_w", "bishop_w", "rook_w", "queen_w", "king_w", "pawn_b", "knight_b", "bishop_b", "rook_b", "queen_b", "king_b"];

let SideToMove;

const UI = {
    PieceImages: new Array(12),
    LightSquareColour: "#f0d9b5",
    DarkSquareColour: "#b58863",
    LastMoveColour: "yellow",
    LastMove: 0,
    MoveColour: "rgb(0, 50, 200)",
    CaptureColour: "rgb(220, 0, 0)",
    HighlightedSquares: [],
    SelectedPieceSquare: Square.None,
    FlipBoard: false,

    SelectedPieceOffset: {
        x: 0,
        y: 0
    },

    LastPieceToDraw: {
        piece: Piece.None,

        position: {
            x: 0,
            y: 0
        }
    },
    
    MoveSounds: {
        Quiet: new Audio(),
        Castling: new Audio(),
        Capture: new Audio(),
        Check: new Audio(),
    },

    Reset() {
        UI.LastMove = 0;
    },

    Update(lastMove = NoMove, playSound = false, moveType = MoveType.Quiet) {
        if (lastMove != NoMove) UI.LastMove = lastMove;

        if (playSound) {
            switch (moveType) {
                case MoveType.Quiet:
                    UI.MoveSounds.Quiet.play();
                    break;

                case MoveType.Castling:
                    UI.MoveSounds.Castling.play();
                    break;

                case MoveType.Capture:
                    UI.MoveSounds.Capture.play();
                    break;

                case MoveType.Check:
                    UI.MoveSounds.Check.play();
                    break;

                default:
                    UI.MoveSounds.Quiet.play();
                    break;
            }
        }

        UI.LastPieceToDraw.piece = Piece.None;

        let fromSquare = FromSquare(UI.LastMove);
        let toSquare = ToSquare(UI.LastMove);

        let squareSize = canvas.width / 8;

        let startRank = Rank.Rank8;
        let finalRank = Rank.Rank1 - 1;
        let rankIncrement = -1;
        let startY = 0;
        let y = startY;
        let yIncrement = squareSize;

        let startFile = File.FileA;
        let finalFile = File.FileH + 1;
        let fileIncrement = 1;
        let startX = 0;
        let xIncrement = squareSize;

        if (UI.FlipBoard) {
            startRank = Rank.Rank1;
            finalRank = Rank.Rank8 + 1;
            rankIncrement = 1;
            startY = squareSize * 7
            y = startY;
            yIncrement = -squareSize;

            startFile = File.FileH;
            finalFile = File.FileA = 1;
            fileIncrement = -1;
            startX = squareSize * 7;
            xIncrement = -squareSize;
        }

        ctx.imageSmoothingEnabled = false; // so the squares will look sharper

        for (let rank = startRank; rank != finalRank; rank += rankIncrement) {
            let x = startX;
            
            for (let file = startFile; file != finalFile; file += fileIncrement) {
                let square = GetSquare(file, rank);
                let isLightSquare = (file + rank) % 2 != 0;
                let squareColour = isLightSquare ? UI.LightSquareColour : UI.DarkSquareColour;

                ctx.fillStyle = squareColour;
                ctx.globalAlpha = 1;
                ctx.fillRect(x, y, squareSize, squareSize);

                if (square == fromSquare || square == toSquare) {
                    ctx.fillStyle = UI.LastMoveColour;
                    ctx.globalAlpha = 0.3;
                    ctx.fillRect(x, y, squareSize, squareSize);
                }

                if (UI.HighlightedSquares.includes(square)) {
                    ctx.fillStyle = UI.MoveColour;
                    ctx.globalAlpha = 0.5;

                    // draw the move indicators after the pieces to use circles
                    /*
                    ctx.beginPath();
                    ctx.arc(x + squareSize / 2, y + squareSize / 2, squareSize / 5, 0, 2 * Math.PI);
                    ctx.fill();
                    */

                    ctx.fillRect(x, y, squareSize, squareSize);
                }

                x += xIncrement;
            }

            y += yIncrement;
        }

        ctx.globalAlpha = 1;
        ctx.imageSmoothingEnabled = true; // so the pieces don't look weird

        y = startY;

        for (let rank = startRank; rank != finalRank; rank += rankIncrement) {
            let x = startX;
            
            for (let file = startFile; file != finalFile; file += fileIncrement) {
                let square = GetSquare(file, rank);
                let piece = Board.Pieces[square];

                if (piece) {
                    if (square == UI.SelectedPieceSquare && PieceColour[piece] == Board.Side) {
                        UI.LastPieceToDraw.piece = piece;

                        UI.LastPieceToDraw.position = {
                            x: x + UI.SelectedPieceOffset.x,
                            y: y + UI.SelectedPieceOffset.y
                        }
                    }
                    else {
                        ctx.drawImage(UI.PieceImages[piece], x, y, squareSize, squareSize);
                    }
                }

                x += xIncrement;
            }

            y += yIncrement;
        }

        let lastPiece = UI.LastPieceToDraw.piece;

        if (lastPiece != Piece.None) {
            let position = UI.LastPieceToDraw.position;

            ctx.drawImage(UI.PieceImages[lastPiece], position.x, position.y, squareSize, squareSize);
        }

        SideToMove.textContent = Board.Side == Side.White ? "white" : Board.Side == Side.Black ? "black" : "...";
    }
}

function InitUI() {
    SideToMove = document.getElementById("side-to-move");

    for (let piece = Piece.wP; piece <= Piece.bK; piece++) {
        UI.PieceImages[piece] = new Image();
        UI.PieceImages[piece].src = "assets/images/" + PieceNames[piece] + ".png";
    }

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    function Resize() {
        let size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
        
        canvas.width = canvas.height = size;

        UI.Update();
    }

    for (let moveType in UI.MoveSounds) {
        UI.MoveSounds[moveType].src = "assets/sounds/" + moveType + ".mp3";
    }

    window.addEventListener("resize", Resize);
    Resize();
}