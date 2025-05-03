const CellHandler = new class extends PostDrawGroup {
    thickness = 3;
    #cells;
    #size;
    cellsize;
    #dampening = 10;

    get size() {
        return (this.#size + 1) - 1; // not sure if I need to do this, I am trying to avoid allowing the caller to edit #size;
    }

    constructor() {
        super();
    }

    Init(size = 10, cellsize = 20) {
        this.#cells = new Array(size);
        this.#size = size;
        this.cellsize = cellsize

        for (let r = 0; r < size; r++) {
            let cell_list = new Array(size);

            for (let c = 0; c < size; c++) {
                cell_list[c] = 0;
            }

            this.#cells[r] = cell_list;
        }
    }

    #GetXY = (mouseX, mouseY) => {
        let pixel_size = this.cellsize * this.#cells.length;
        let centre = new Vector(Game.Settings.NativeWidth, Game.Settings.NativeHeight).divided(2);
        let top_left = centre.minus(pixel_size / 2);

        let x = mouseX - top_left.x;
        let y = mouseY - top_left.y;

        return { x, y };
    }

    DrawAtLocation(mouseX, mouseY, multiplier, negate = false) {
        let { x, y } = this.#GetXY(mouseX, mouseY);

        let exact_row = y / this.cellsize;
        let exact_column = x / this.cellsize;

        let closest_row = Math.floor(exact_row);
        let closest_column = Math.floor(exact_column);

        if (closest_row > this.#cells.length) return;
        if (closest_column > this.#cells[closest_row].length) return;

        let sign = negate ? -1 : 1;

        for (let c = 0; c < this.#size; c++) {
            for (let r = 0; r < this.#size; r++) {
                let distance = Math.sqrt((exact_column - (c + 0.5)) * (exact_column - (c + 0.5)) + (exact_row - (r + 0.5)) * (exact_row - (r + 0.5)));
                distance = Clamp(distance, 0, 1);

                let roll_off = 1//Math.E ** -(distance ** 2);
                let increase = sign * this.thickness * roll_off * multiplier * (1 - (distance)) / this.#dampening;
                
                let current_val = this.#cells[r][c];
                this.#cells[r][c] = Clamp(current_val + increase, 0, 1);
            }
        }
    }

    Erase(mouseX, mouseY) {
        let { x, y } = this.#GetXY(mouseX, mouseY);

        let row = Math.floor(y / this.cellsize);
        let column = Math.floor(x / this.cellsize);

        if (row < 0 || row > this.#cells.length) return;
        if (column < 0 || column > this.#cells[row].length) return;

        this.#cells[row][column] = 0;
    }

    Draw(ctx) {
        let pixel_size = this.cellsize * this.#cells.length;
        let centre = Game.Settings.NativeSize.divided(2);
        let top_left = centre.minus(pixel_size / 2);
        let bottom_right = centre.plus(pixel_size / 2);

        for (let r = 0; r <= this.#size; r++) {
            drawLine(ctx, new Vector(top_left.x, top_left.y + r * this.cellsize), new Vector(bottom_right.x, top_left.y + r * this.cellsize), "white");
        }

        for (let c = 0; c <= this.#size; c++) {
            drawLine(ctx, new Vector(top_left.x + c * this.cellsize, top_left.y), new Vector(top_left.x + c * this.cellsize, bottom_right.y), "white");
        }

        for (let r = 0; r < this.#size; r++) {
            for (let c = 0; c < this.#size; c++) {
                let cell_value = this.#cells[r][c];
                let rect = new Rectangle(new Vector(top_left.x + c * this.cellsize, top_left.y + r * this.cellsize), new Vector(this.cellsize, this.cellsize));
                fillRect(ctx, rect, "white", cell_value);
            }
        }
    }

    GetCellData() {
        let copy = this.#cells;
        return copy;
    }

    SetCellData(data) {
        this.#size = data.length;
        this.#cells = data;
    }

    Clear() {
        for (let r = 0; r < this.#size; r++) {
            for (let c = 0; c < this.#size; c++) {
                this.#cells[r][c] = 0;
            }
        }
    }
}