class InputHandler {
    constructor() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.mouse = false;

        document.onkeydown = (e) => {
            switch(e.key) {
                case 'a':
                    this.left = true;
                    break;

                case 'ArrowLeft':
                    this.left = true;
                    break;

                case 'd':
                    this.right = true;
                    break;

                case 'ArrowRight':
                    this.right = true;
                    break;

                case ' ':
                    this.up = true;
                    break;

                case 'w':
                    this.up = true;
                    break;

                case 'ArrowUp':
                    this.up = true;
                    break;
                
                case 'Escape':
                    if (!paused) return PauseGame();
                    ResumeGame();
                    break;
            }
        }

        document.onkeyup = (e) => {
            switch(e.key) {
                case 'a':
                    this.left = false;
                    break;

                case 'ArrowLeft':
                    this.left = false;
                    break;

                case 'd':
                    this.right = false;
                    break;

                case 'ArrowRight':
                    this.right = false;
                    break;

                case ' ':
                    this.up = false;
                    break;

                case 'w':
                    this.up = false;
                    break;

                case 'ArrowUp':
                    this.up = false;
                    break;
            }
        }

        canvas.onmousedown = (e) => {
            this.mouse = true;

            let mouseRect = {
                x: GetMousePos(canvas, e).x,
                y: GetMousePos(canvas, e).y,
                w: 1,
                h: 1
            }

            if (RectIntersection(playerUI.rects.left, mouseRect)) {
                this.left = true;
            }

            if (RectIntersection(playerUI.rects.right, mouseRect)) {
                this.right = true;
            }

            if (RectIntersection(playerUI.rects.up, mouseRect)) {
                this.up = true;
            }
        }

        canvas.onmouseup = (e) => {
            this.mouse = false;

            let mouseRect = {
                x: GetMousePos(canvas, e).x,
                y: GetMousePos(canvas, e).y,
                w: 1,
                h: 1
            }

            if (RectIntersection(playerUI.rects.left, mouseRect)) {
                this.left = true;
            }

            if (RectIntersection(playerUI.rects.right, mouseRect)) {
                this.right = true;
            }

            if (RectIntersection(playerUI.rects.up, mouseRect)) {
                this.up = true;
            }
        }
    }
}