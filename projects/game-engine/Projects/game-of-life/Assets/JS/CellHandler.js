const CellHandler = new class extends UpdatesEachFrame {
    interval = 0.1; // time inbetween generations in seconds
    #totalDelta = this.interval;
    columns = 200;
    rows = 200;
    #cells = new Array(this.columns);
    cellSize = 20;
    paused = true;

    constructor() {
        super();
    }

    Clear() {
        this.#cells = new Array(this.columns);

        for (let i = this.#cells.length; i--;) {
            this.#cells[i] = new Array(this.rows);

            for (let j = this.#cells[i].length; j--;) this.#cells[i][j] = 0;
        }
    }

    AddCell(x, y) {
        if (y >= 0 && y < this.columns && x >= 0 && x < this.rows) this.#cells[y][x] = 1;
    }

    RemoveCell(x, y) {
        if (y >= 0 && y < this.columns && x >= 0 && x < this.rows) this.#cells[y][x] = 0;
    }
    
    ToggleCell(x, y) {
        if (y >= 0 && y < this.columns && x >= 0 && x < this.rows) this.#cells[y][x] = this.#cells[y][x] == 1 ? 0 : 1;
    }

    Start() {
        for (let i = this.#cells.length; i--;) {
            this.#cells[i] = new Array(this.rows);

            for (let j = this.#cells[i].length; j--;) this.#cells[i][j] = 0;
        }

        Game.PreDraw.AddListener(this.Draw);
    }

    Update(delta) {
        if (this.paused) return;

        this.#totalDelta += delta;
        if (this.#totalDelta < this.interval) return;
       
        this.#totalDelta -= this.interval;

        if (this.interval == 0) this.#totalDelta = 0;

        let newCells = new Array(this.columns);

        for (let i = newCells.length; i--;) {
            newCells[i] = new Array(this.rows);

            for (let j = newCells[i].length; j--;) newCells[i][j] = 0;
        }
        
        for (let i = this.#cells.length; i--;) {
            for (let j = this.#cells[i].length; j--;) {
                let neighbours = [];

                if (i > 0) neighbours.push(this.#cells[i - 1][j]);
                if (i < this.#cells.length - 1) neighbours.push(this.#cells[i + 1][j]);
                if (j > 0) neighbours.push(this.#cells[i][j - 1]);
                if (j < this.#cells[i].length - 1) neighbours.push(this.#cells[i][j + 1]);
                if (i > 0 && j > 0) neighbours.push(this.#cells[i - 1][j - 1]);
                if (i > 0 && j < this.#cells[i].length - 1) neighbours.push(this.#cells[i - 1][j + 1]);
                if (i < this.#cells.length - 1 && j > 0) neighbours.push(this.#cells[i + 1][j - 1]);
                if (i < this.#cells.length - 1 && j < this.#cells[i].length - 1) neighbours.push(this.#cells[i + 1][j + 1]);
                
                let aliveNeighbours = 0;

                for (let neighbour of neighbours) if (neighbour) aliveNeighbours++;

                //console.log(aliveNeighbours);

                let newCell = this.#cells[i][j];

                if (newCell) {
                    if (aliveNeighbours < 2 || aliveNeighbours > 3) newCell = 0;
                
                } else {
                    if (aliveNeighbours === 3) newCell = 1;
                }

                newCells[i][j] = newCell;
            }
        }

        this.#cells = newCells;
    }

    Draw = (ctx) => {
        let i = this.#cells.length;

        this.cellSize = ClampMin(this.cellSize, 0);

        ctx.globalAlpha = 1;
        ctx.fillStyle = "yellow";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;

        while (i--) {
            let j = this.#cells[i].length;

            while (j--) {
                let rect = new Rectangle(new Vector(j * this.cellSize, i * this.cellSize), new Vector(this.cellSize, this.cellSize));
                if (!RectIntersection(rect, Game.ViewPort)) continue;

                if (this.#cells[i][j]) ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);

                ctx.strokeRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize)
            }
        }
    }
}