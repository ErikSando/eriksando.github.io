const Input = new class {
    #KeysDown = {}
    #KeysPressed = {}
    #KeysReleased = {}

    constructor() {
        for (let keyCode in KeyCode) {
            this.#KeysDown[KeyCode[keyCode]] = false;
            this.#KeysPressed[KeyCode[keyCode]] = false;
            this.#KeysReleased[KeyCode[keyCode]] = false;
        }

        window.addEventListener("blur", () => {
            for (let keyCode in this.#KeysDown) this.#KeysDown[keyCode] = false;
            for (let keyCode in this.#KeysPressed) this.#KeysPressed[keyCode] = false;
            for (let keyCode in this.#KeysReleased) this.#KeysReleased[keyCode] = false;
        });

        document.addEventListener("keydown", this.#KeyDown);
        document.addEventListener("keyup", this.#KeyUp);
        document.addEventListener("mousemove", this.#MouseMove);
        document.addEventListener("mousedown", this.#MouseDown);
        document.addEventListener("mouseup", this.#MouseUp);
    }

    #KeyDown = (e) => {
        if (!this.#KeysDown[e.code]) this.#KeysPressed[e.code] = true;

        this.#KeysDown[e.code] = true;
    }

    #KeyUp = (e) => {
        if (this.#KeysDown[e.code]) this.#KeysReleased[e.code] = true;

        this.#KeysDown[e.code] = false;
    }

    #MouseMove = (e) => {

    }

    #MouseDown = (e) => {

    }

    #MouseUp = (e) => {

    }

    Update() {
        for (let key in this.#KeysPressed) this.#KeysPressed[key] = false;
        for (let key in this.#KeysReleased) this.#KeysReleased[key] = false;
    }

    GetKey(keyCode) {
        return this.#KeysDown[keyCode];
    }

    GetKeyDown(keyCode) {
        return this.#KeysPressed[keyCode];
    }

    GetKeyUp(keyCode) {
        return this.#KeysReleased[keyCode];
    }

    GetAxisRaw(axis) {
        let result = {
            vertical: 0,
            horizontal: 0
        }

        if (this.GetKey(KeyCode.KeyW) || this.GetKey(KeyCode.ArrowUp) || this.GetKey(KeyCode.Space)) result.vertical += 1;
        if (this.GetKey(KeyCode.KeyA) || this.GetKey(KeyCode.ArrowLeft)) result.horizontal -= 1;
        if (this.GetKey(KeyCode.KeyS) || this.GetKey(KeyCode.ArrowDown)) result.vertical -= 1;
        if (this.GetKey(KeyCode.KeyD) || this.GetKey(KeyCode.ArrowRight)) result.horizontal += 1;

        return result[axis.toLowerCase()];
    }
}