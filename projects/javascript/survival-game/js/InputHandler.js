let paused = false;

class InputHandler {
    constructor() {
        this.left = false;
        this.right = false;
        this.up = false;
    }

    enable() {
        document.onkeydown = (e) => {
            switch(e.key) {
                case 'a' || 'ArrowLeft':
                    this.left = true;
                    break;

                case 'd' || 'ArrowRight':
                    this.right = true;
                    break;

                case ' ':
                    this.up = true;
                    break;

                case 'Escape':
                    PauseGame();
                    break;
            }
        }

        document.onkeyup = (e) => {
            switch(e.key) {
                case 'a' || 'ArrowLeft':
                    this.left = false;
                    break;

                case 'd' || 'ArrowRight':
                    this.right = false;
                    break;

                case ' ':
                    this.up = false;
                    break;
            }
        }
    }

    disable() {
        document.onkeydown = (e) => {
            switch (e.key) {
                case 'Escape':
                    ResumeGame();
                    break;
            }
        }
        document.onkeyup = () => {}
    }
}