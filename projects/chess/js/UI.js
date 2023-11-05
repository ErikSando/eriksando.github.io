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
    MoveColour: "red",
    HighlightedSquares: [],
    SelectedPieceSquare: Square.None,

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

        let y = 0;

        for (let rank = Rank.Rank8; rank >= Rank.Rank1; rank--) {
            let x = 0;
            
            for (let file = File.FileA; file <= File.FileH; file++) {
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
                    ctx.fillRect(x, y, squareSize, squareSize);
                }

                x += canvas.width / 8;
            }

            y += canvas.height / 8;
        }

        ctx.globalAlpha = 1;

        y = 0;

        for (let rank = Rank.Rank8; rank >= Rank.Rank1; rank--) {
            let x = 0;
            
            for (let file = File.FileA; file <= File.FileH; file++) {
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

                x += squareSize;
            }

            y += squareSize;
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