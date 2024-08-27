const CellHandler = new class extends UpdatesEachFrame {
    interval = 0.1; // time inbetween generations in seconds
    #totalDelta = this.interval;
    columns = Clamp(GetData("columns", 200), 2000);
    rows = Clamp(GetData("rows", 200), 2000);
    #cells = new Array(this.rows);
    cellSize = 20;
    paused = true;
    drawOutlines = false;

    get population() {
        let popuation = 0;
        
        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.columns; ++j) popuation += this.#cells[i][j];
        }

        return popuation;
    }

    constructor() {
        super();

        SetData("columns", this.columns);
        SetData("rows", this.rows);
    }

    Reset() {
        this.#cells = new Array(this.rows);

        for (let i = 0; i < this.rows; ++i) {
            this.#cells[i] = new Array(this.columns);

            for (let j = 0; j < this.columns; ++j) this.#cells[i][j] = 0;
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
        this.Reset();

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
        this.cellSize = Math.max(this.cellSize, 0);

        ctx.globalAlpha = 1;
        ctx.fillStyle = "yellow";
        ctx.strokeStyle = "white";
        ctx.lineWidth = Clamp(this.cellSize / 5, 0.5, 1);

       for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.columns; ++j) {
                if (!this.#cells[i][j]) continue;
                let rect = new Rectangle(new Vector(j * this.cellSize, i * this.cellSize), new Vector(this.cellSize, this.cellSize));
                if (!RectIntersection(rect, Game.ViewPort)) continue;

                ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
            }
        }

        let width = this.columns * this.cellSize;
        let height = this.rows * this.cellSize;

        if (Game.ViewPort.bottom < 0 || Game.ViewPort.right < 0 || Game.ViewPort.left > width || Game.ViewPort.top > height) return;

        let lines = [];

        // if (Game.ViewPort.left < 0) lines.push(new Line(new Vector(0, 0), new Vector(0, Math.min(Game.ViewPort.bottom, height))));
        // if (Game.ViewPort.right > width) lines.push(new Line(new Vector(width, 0), new Vector(width, Math.min(Game.ViewPort.bottom, height))));
        // if (Game.ViewPort.top < 0) lines.push(new Line(new Vector(0, 0), new Vector(Math.min(Game.ViewPort.right, width), 0)));
        // if (Game.ViewPort.bottom > height) lines.push(new Line(new Vector(0, height), new Vector(Math.min(Game.ViewPort.right, width), height)));

        if (Game.ViewPort.left < 0) lines.push(new Line(new Vector(0, 0), new Vector(0, height)));
        if (Game.ViewPort.right > width) lines.push(new Line(new Vector(width, 0), new Vector(width, height)));
        if (Game.ViewPort.top < 0) lines.push(new Line(new Vector(0, 0), new Vector(width, 0)));
        if (Game.ViewPort.bottom > height) lines.push(new Line(new Vector(0, height), new Vector(width, height)));

        ctx.beginPath();

        for (let line of lines) {
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
        }

        ctx.stroke();

        if (!this.drawOutlines) return;
    
        ctx.beginPath();

        for (let i = 1; i < this.columns; ++i) {
            //if (!RectAndLineIntersection(Game.ViewPort, new Line(new Vector(i * this.cellSize, 0), new Vector(i * this.cellSize, this.rows * this.cellSize)))) continue;
            if (Game.ViewPort.right < i * this.cellSize) continue;

            ctx.moveTo(i * this.cellSize, 0);
            ctx.lineTo(i * this.cellSize, this.rows * this.cellSize);
        }

        for (let i = 1; i < this.rows; ++i) {
            //if (!RectAndLineIntersection(Game.ViewPort, new Line(new Vector(0, i * this.cellSize), new Vector(this.columns * this.cellSize, i * this.cellSize)))) continue;
            if (Game.ViewPort.bottom < i * this.cellSize) continue;

            ctx.moveTo(0, i * this.cellSize);
            ctx.lineTo(this.columns * this.cellSize, i * this.cellSize);
        }

        ctx.stroke();
    }
}