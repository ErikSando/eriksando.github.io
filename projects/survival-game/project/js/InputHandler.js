class InputHandler {
    constructor() {
        this.left = false;
        this.right = false;
        this.up = false;

        this.buttons = {
            left: document.getElementById('left'),
            right: document.getElementById('right'),
            up: document.getElementById('up'),
            pause: document.getElementById('pause')
        }

        document.getElementById('up').addEventListener('mousedown', () => {
            console.log('mouse down on the up button')
        })

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

        this.buttons.up.onmousedown = (e) => {
            switch(e.buttton) {
                case '0':
                    this.up = true;
                    break;
            }
        }

        this.buttons.up.onmouseup = (e) => {
            switch(e.buttton) {
                case '0':
                    this.up = false;
                    break;
            }
        }

        this.buttons.left.onmousedown = (e) => {
            switch(e.buttton) {
                case '0':
                    this.left = true;
                    break;
            }
        }

        this.buttons.left.onmouseup = (e) => {
            switch(e.buttton) {
                case '0':
                    this.left = false;
                    break;
            }
        }

        this.buttons.right.onmousedown = (e) => {
            this.right = true;
        }

        this.buttons.right.onmouseup = (e) => {
            this.right = false;
        }

        this.buttons.pause.onclick = () => {
            if (!paused) return PauseGame();
            ResumeGame();
        }
    }
}