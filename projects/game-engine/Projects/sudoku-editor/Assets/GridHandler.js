const GridHandler = new class extends PostDrawGroup {
    #grid;
    tilesize;
    selected_row = -1;
    selected_column = -1

    constructor() {
        super();
    }

    Init(tilesize = 20) {
        this.#grid = new Array(9);
        this.tilesize = tilesize

        for (let r = 0; r < 9; r++) {
            let row = new Array(9);

            for (let c = 0; c < 9; c++) {
                row[c] = 0;
            }

            this.#grid[r] = row;
        }

        Input.KeyDown.AddListener(this.KeyDown);
        Input.KeyUp.AddListener(this.KeyUp);

        Input.Mouse1Down.AddListener((pos) => {
            let true_pos = { x: pos.x + Game.Camera.position.x, y: pos.y + Game.Camera.position.y }
            this.SelectTile(true_pos.x, true_pos.y, 10);
        });
    
        Input.MouseWheel.AddListener((direction) => {
            this.tilesize -= direction * this.tilesize / 50;
        });
    }

    #GetXY = (mouseX, mouseY) => {
        let pixel_size = this.tilesize * this.#grid.length;
        let centre = new Vector(Game.Settings.NativeWidth, Game.Settings.NativeHeight).divided(2);
        let top_left = centre.minus(pixel_size / 2);

        let x = mouseX - top_left.x;
        let y = mouseY - top_left.y;

        return { x, y };
    }

    SelectTile(mouseX, mouseY) {
        let { x, y } = this.#GetXY(mouseX, mouseY);

        console.log(x, y);

        let row = Math.floor(y / this.tilesize);
        let col = Math.floor(x / this.tilesize);

        
        console.log(col, row);

        if (row >= 0 && col >= 0 && row < 9 && col < 9) {
            this.selected_row = row;
            this.selected_column = col;
        }
    }

    SetTile(digit) {
        if (digit < 0 || digit > 9) return;

        let row = this.selected_row;
        let col = this.selected_column;

        if (row >= 0 && col >= 0 && row < 9 && col < 9) {
            this.#grid[row][col] = digit;
        }
    }

    KeyDown = (keycode) => {
        let row, col;

        switch (keycode) {
            case KeyCode.Backspace:
            case KeyCode.Delete:
            case KeyCode.Space:
            case KeyCode.Numpad0:
            case KeyCode.Digit0:
                this.SetTile(0);
            break;

            case KeyCode.Numpad1:
            case KeyCode.Digit1:
                this.SetTile(1);
            break;

            case KeyCode.Numpad2:
            case KeyCode.Digit2:
                this.SetTile(2);
            break;

            case KeyCode.Numpad3:
            case KeyCode.Digit3:
                this.SetTile(3);
            break;

            case KeyCode.Numpad4:
            case KeyCode.Digit4:
                this.SetTile(4);
            break;

            case KeyCode.Numpad5:
            case KeyCode.Digit5:
                this.SetTile(5);
            break;

            case KeyCode.Numpad6:
            case KeyCode.Digit6:
                this.SetTile(6);
            break;

            case KeyCode.Numpad7:
            case KeyCode.Digit7:
                this.SetTile(7);
            break;

            case KeyCode.Numpad8:
            case KeyCode.Digit8:
                this.SetTile(8);
            break;

            case KeyCode.Numpad9:
            case KeyCode.Digit9:
                this.SetTile(9);
            break;

            case KeyCode.ArrowLeft:
                col = this.selected_column - 1;

                if (col >= 0 && col < 9) {
                    this.selected_column = col;
                }
            break;

            case KeyCode.ArrowRight:
                col = this.selected_column + 1;

                if (col >= 0 && col < 9) {
                    this.selected_column = col;
                }
            break;

            case KeyCode.ArrowUp:
                row = this.selected_row - 1;

                if (row >= 0 && row < 9) {
                    this.selected_row = row;
                }
            break;

            case KeyCode.ArrowDown:
                row = this.selected_row + 1;

                if (row >= 0 && row < 9) {
                    this.selected_row = row;
                }
            break;
        }
    }

    KeyUp = (keycode) => {
        switch (keycode) {
            case KeyCode.KeyC:
                GridHandler.Clear();
            break;
        }
    }

    Draw(ctx) {
        let pixel_size = this.tilesize * this.#grid.length;
        let centre = Game.Settings.NativeSize.divided(2);
        let top_left = centre.minus(pixel_size / 2);
        let bottom_right = centre.plus(pixel_size / 2);

        for (let r = 0; r <= 9; r++) {
            let thickness = 1;
            if (r % 3 == 0) thickness = 3;
            drawLine(ctx, new Vector(top_left.x, top_left.y + r * this.tilesize), new Vector(bottom_right.x, top_left.y + r * this.tilesize), "white", 1, thickness);
        }

        for (let c = 0; c <= 9; c++) {
            let thickness = 1;
            if (c % 3 == 0) thickness = 3;
            drawLine(ctx, new Vector(top_left.x + c * this.tilesize, top_left.y), new Vector(top_left.x + c * this.tilesize, bottom_right.y), "white", 1, thickness);
        }

        if (this.selected_row >= 0 && this.selected_column >= 0) {
            let tile_topleft = new Vector(top_left.x + this.selected_column * this.tilesize, top_left.y + this.selected_row * this.tilesize);
            let rect = new Rectangle(tile_topleft, new Vector(this.tilesize, this.tilesize));

            fillRect(ctx, rect, "white", 0.3);
        }

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                let digit = this.#grid[r][c];

                let text = String(digit || " ");

                ctx.globalAlpha = 1;
                ctx.font = this.tilesize / 1.5 + "px Lucida Sans";
                ctx.textBaseline = "top";
                ctx.fillText(text, c * this.tilesize + top_left.x + this.tilesize/3.2, r * this.tilesize + top_left.y + this.tilesize/5, this.tilesize/2);
            }
        }
    }

    GetGrid() {
        let copy = this.#grid;
        return copy;
    }

    SetGrid(new_grid) {
        this.#grid = new_grid;
    }

    Clear() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                this.#grid[r][c] = 0;
            }
        }
    }
}