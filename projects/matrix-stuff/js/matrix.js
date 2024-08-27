class Matrix {
    #rows;
    #columns;
    #value;
    
    constructor(rows, columns, value) {
        this.#rows = rows;
        this.#columns = columns;
        
        if (!this.#SetValue(value)) {
            this.#value = new Array(rows);

            for (let r = 0; r < rows; r++) {
                this.value[r] = new Array(columns);
                for (let c = 0; c < columns; c++) this.value[r][c] = 0;
            }
        }
    }

    get rows() {
        return this.#rows;
    }

    get columns() {
        return this.#columns;
    }

    get value() {
        return this.#value;
    }

    #SetValue(value) {
        if (!value || typeof value != "object" || !value.length) return 0;

        while (value.length < this.#rows) value.push(new Array(columns));
        while (value.length > this.#rows) value.splice(value.length - 1, 1);
        
        for (let r = 0; r < this.#rows; r++) {
            for (let column of value[r]) {
                if (typeof column == "object" && column.length) {
                    while (column.length < columns) column.push(0);
                    while (column.length > columns) column.splice(column.length - 1, 1);

                    for (let i = 0; i < column.length; i++) {
                        if (typeof column[i] != "number") column[i] = 0;
                    }
                }
            }
        }

        this.#value = value;

        return 1;
    }

    SetValue(value) {
        if (!this.#SetValue(value)) return console.error("Value passed into SetValue() is not valid.");

        return 1;
    }

    Set(row, column, n) {
        if (typeof n != "number") return console.error("Can only set an element of the matrix to a number.");
        this.#value[row - 1][column - 1] = n;
    }

    Add(row, column, n) {
        if (typeof n != "number") return console.error("Can only add numbers onto elemends of a matrix.");
        this.#value[row - 1][column - 1] += n;
    }

    Subtract(row, column, n) {
        if (typeof n != "number") return console.error("Can only subtract numbers from elemends of a matrix.");
        this.#value[row - 1][column - 1] -= n;
    }

    Get(row, column) {
        return this.#value[row - 1][column - 1];
    }

    Negative() {
        let result = new Matrix(this.#rows, this.#columns);

        for (let r = 1; r <= this.#rows; r++) {
            for (let c = 1; c <= this.#columns; c++) {
                result.Set(r, c, -this.Get(r, c));
            }
        }

        return result;
    }

    Inverse() {
        if (this.#rows != 2 || this.#columns != 2) return console.error("I only know how to inverse 2x2 matrices dawg.");

        let determinant = this.Get(1, 1) * this.Get(2, 2) - this.Get(1, 2) * this.Get(2, 1);

        if (determinant == 0) return console.error("Matrix can not be inverted.");

        let result = new Matrix(2, 2, [[this.Get(2, 2), -this.Get(1, 2)], [-this.Get(2, 1), this.Get(1, 1)]]);
        result.Multiply(1 / determinant);

        return result;
    }

    Multiply(n) {
        let result = new Matrix(this.#rows, this.#columns);

        for (let r = 1; r <= this.#rows; r++) {
            for (let c = 1; c <= this.#columns; c++) {
                result.Set(r, c, n * this.Get(r, c));
            }
        }

        return result;
    }

    Square() {
        if (this.#rows != this.#columns) return console.error("Can only square a square matrix.");

        return Matrix.Multiply(this, this);
    }
}

Matrix.Zero = (rows, columns) => new Matrix(rows, columns);

Matrix.Identity = (size) => {
    let I = new Matrix(size, size);

    for (let i = 1; i <= size; i++) I.Set(i, i, 1);
    
    return I;
}

// FIX MULTIPLICATION !!!!!!!!!

Matrix.Multiply = (m1, m2) => {
    //if (!(m1 instanceof Matrix)) m1 = new Matrix(m1.length, m1[0].length, m1);
    //if (!(m2 instanceof Matrix)) m2 = new Matrix(m1.length, m2[0].length, m2);

    if (m1.columns != m2.rows) return console.error("Cannot multiply, number of columns in matrix 1 not equal to the number of rows in matrix 2.");

    let result = Matrix.Zero(m1.rows, m2.columns);

    for (let r = 1; r <= m1.rows; r++) {
        for (let c = 1; c <= m2.columns; c++) {
            for (let n = 1; n <= m1.columns; n++) {
                result.Add(r, c, m1.Get(r, n) * m2.Get(n, c));
            }
        }
    }

    return result;
}

Matrix.Add = (m1, m2) => {
    if (m1.rows != m2.rows || m1.columns != m2.columns) return console.error("Matrices must have the same order to be added.");

    let result = new Matrix(m1.rows, m1.columns);

    for (let r = 1; r <= m1.rows; r++) {
        for (let c = 1; c <= m1.columns; c++) {
            result.Set(r, c, m1.Get(r, c) + m2.Get(r, c));
        }
    }

    return result;
}

Matrix.Subtract = (m1, m2) => {
    if (m1.rows != m2.rows || m1.columns != m2.columns) return console.error("Matrices must have the same order to apply subtraction.");

    let result = new Matrix(m1.rows, m1.columns);

    for (let r = 1; r <= m1.rows; r++) {
        for (let c = 1; c <= m1.columns; c++) {
            result.Set(r, c, m1.Get(r, c) - m2.Get(r, c));
        }
    }

    return result;
}