class InputHandler {
    constructor() {
        this.left = false;
        this.right = false;
        this.up = false;

        this.buttons = {
            left: document.getElementById('left'),
            right: document.getElementById('right'),
            up: document.getElementById('up')
        }

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
                    PauseGame();
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

        this.buttons.up.onmousedown = () => {
            this.buttons.up.style.background = 'rgb(40, 50, 70)'
            this.up = true;
        }

        this.buttons.up.onmouseup = () => {
            this.buttons.up.style.background = 'rgb(50, 60, 80)'
            this.up = false;
        }

        this.buttons.left.onmousedown = () => {
            this.left = true;
        }

        this.buttons.right.onmouseup = () => {
            this.right = false;
        }

        this.buttons.right.onmousedown = () => {
            this.right = true;
        }

        this.buttons.right.onmouseup = () => {
            this.right = false;
        }
    }
}