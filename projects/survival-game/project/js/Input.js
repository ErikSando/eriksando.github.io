const Input = new class {
    #Keys = {
        Shift: "SHIFT",
        Control: "CONTROL",
        Alt: "ALT",
        Space: " ",
        ArrowUp: "ARROWUP",
        ArrowDown: "ARROWDOWN",
        ArrowLeft: "ARROWLEFT",
        ArrowRight: "ARROWRIGHT",
        Digit0: "0",
        Digit1: "1",
        Digit2: "2",
        Digit3: "3",
        Digit4: "4",
        Digit5: "5",
        Digit6: "6",
        Digit7: "7",
        Digit8: "8",
        Digit9: "9",
        A: "A",
        B: "B",
        C: "C",
        D: "D",
        E: "E",
        F: "F",
        G: "G",
        H: "H",
        I: "I",
        J: "J",
        K: "K",
        L: "L",
        M: "M",
        N: "N",
        O: "O",
        P: "P",
        Q: "Q",
        R: "R",
        T: "T",
        U: "U",
        V: "V",
        W: "W",
        X: "X",
        Y: "Y",
        Z: "Z"
    }

    #KeysDown = {}

    #MousePos = {
        x: 0,
        y: 0
    }

    Mouse1Down = new _Event();
    Mouse2Down = new _Event();

    Mouse1Up = new _Event();
    Mouse2Up = new _Event();

    KeyDown = new _Event();
    KeyUp = new _Event();

    constructor() {
        for (let key in this.#Keys) this.#KeysDown[key.toUpperCase()] = false;
        
        document.addEventListener("keydown", (e) => {
            let keyPressed = e.key.toUpperCase();

            for (let key in this.#Keys) {
                if (this.#Keys[key] == keyPressed) {
                    this.#KeysDown[key.toUpperCase()] = true;

                    this.KeyDown.Fire(key);
                }
            }
        });

        document.addEventListener("keyup", (e) => {
            let keyReleased = e.key.toUpperCase();

            for (let key in this.#Keys) {
                if (this.#Keys[key] == keyReleased) {
                    this.#KeysDown[key.toUpperCase()] = false;
                }
            }
        });

        document.addEventListener("mousedown", (e) => {
            if (e.button == "0") this.Mouse1Down.Fire();
            if (e.button == "2") this.Mouse2Down.Fire();
        });

        document.addEventListener("mouseup", () => {

        });

        document.addEventListener("mousemove", (e) => {
            if (!canvas) return;

            let rect = canvas.getBoundingClientRect();

            this.#MousePos = {
                x: e.clientX / scale - rect.x,
                y: e.clientY / scale - rect.y
            }
        });
    }

    GetKey(key) {
        return this.#KeysDown[key.toUpperCase()];
    }

    GetAxisRaw(axis) {
        let result = {
            horizontal: 0,
            vertical: 0
        }

        if (this.GetKey("W") || this.GetKey("ArrowUp") || this.GetKey("Space")) result.vertical++;
        if (this.GetKey("A") || this.GetKey("ArrowLeft")) result.horizontal--;
        if (this.GetKey("S") || this.GetKey("ArrowDown")) result.vertical--;
        if (this.GetKey("D") || this.GetKey("ArrowRight")) result.horizontal++;

        return result[axis.toLowerCase()];
    }

    GetMousePosition() {
        let mp = {
            x: this.#MousePos.x,
            y: this.#MousePos.y
        }

        return mp;
    }
}