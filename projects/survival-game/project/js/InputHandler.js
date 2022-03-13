class InputHandler {
    constructor() {
        this.left = false;
        this.right = false;
        this.up = false;

        document.onkeydown = (e) => {
            switch(e.key) {
                case 'a':
                    this.left = true;
                    break;

                case 'A':
                    this.left = true;
                    break;

                case 'ArrowLeft':
                    this.left = true;
                    break;

                case 'd':
                    this.right = true;
                    break;

                case 'D':
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
                
                case 'W':
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
                
                case 'A':
                    this.left = false;
                    break;

                case 'ArrowLeft':
                    this.left = false;
                    break;

                case 'd':
                    this.right = false;
                    break;
                
                case 'D':
                    this.right = false;

                case 'ArrowRight':
                    this.right = false;
                    break;

                case ' ':
                    this.up = false;
                    break;

                case 'w':
                    this.up = false;
                    break;

                case 'W':
                    this.up = false;

                case 'ArrowUp':
                    this.up = false;
                    break;
            }
        }
    }
}