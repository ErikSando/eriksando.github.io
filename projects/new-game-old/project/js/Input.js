const Input = new class {
    #Keys = {
        Backspace: "BACKSPACE",
        Tab: "TAB",
        Enter: "ENTER",
        Shift: "SHIFT",
        Control: "CONTROL",
        Alt: "ALT",
        Pause: "PAUSE",
        CapsLock: "CAPSLOCK",
        Escape: "ESCAPE",
        Space: " ",
        PageUp: "PAGEUP",
        PageDown: "PAGEDOWN",
        End: "END",
        Home: "HOME",
        ArrowLeft: "ARROWLEFT",
        ArrowUp: "ARROWUP",
        ArrowRight: "ARROWRIGHT",
        ArrowDown: "ARROWDOWN",
        PrintScreen: "PRINTSCREEN",
        Insert: "INSERT",
        Delete: "DELETE",
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
        S: "S",
        T: "T",
        U: "U",
        V: "V",
        W: "W",
        X: "X",
        Y: "Y",
        Z: "Z",
        Meta: "META",
        ContextMenu: "CONTEXTMENU",
        AudioVolumeMute: "AUDIOVOLUMEMUTE",
        AudioVolumeDown: "AUDIOVOLUMEDOWN",
        AudioVolumeUp: "AUDIOVOLUMEUP",
        F1: "F1",
        F2: "F2",
        F3: "F3",
        F4: "F4",
        F5: "F5",
        F6: "F6",
        F7: "F7",
        F8: "F8",
        F9: "F9",
        F10: "F10",
        F11: "F11",
        F12: "F12",
        NumLock: "NUMLOCK",
        ScrollLock: "SCROLLLOCK",
        Semicolon: ";",
        Equal: "=",
        Comma: ",",
        Minus: "-",
        Period: ".",
        Slash: "/",
        Backquote: "`",
        BracketLeft: "[",
        Backslash: "\\",
        BracketRight: "]",
        Apostrophe: "\"",
        Tilde: "~",
        Exclamation: "!",
        At: "@",
        Sharp: "#",
        Dollar: "$",
        Percent: "%",
        Caret: "^",
        Ampersand: "&",
        Asterisk: "*",
        ParenthesisLeft: "(",
        ParenthesisRight: ")",
        Underscore: "_",
        Plus: "+",
        OpenBrace: "{",
        CloseBrace: "}",
        Pipe: "|",
        Colon: ":",
        Quote: "\"",
        AngleBracketLeft: "<",
        AngleBracketRight: ">",
        QuestionMark: "?"
    }

    #MousePos = Vector.zero;

    MouseMove = new _Event();

    Mouse1Down = new _Event();
    Mouse1Up = new _Event();

    Mouse2Down = new _Event();
    Mouse2Up = new _Event();

    Mouse3Down = new _Event();
    Mouse3Up = new _Event();

    #KeysDown = {}

    KeyDown = new _Event();
    KeyUp = new _Event();

    constructor() {
        for (let key in this.#Keys) this.#KeysDown[key] = false;

        document.addEventListener("keydown", (e) => {
            for (let key in this.#Keys) {
                if (this.#Keys[key] == e.key.toUpperCase()) {
                    this.#KeysDown[key] = true;
                    this.KeyDown.Fire(key, e.shiftKey, e.ctrlKey, e.altKey);
                }
            }
        });

        document.addEventListener("keyup", (e) => {
            for (let key in this.#Keys) {
                if (this.#Keys[key] == e.key.toUpperCase()) {
                    this.#KeysDown[key] = false;
                    this.KeyUp.Fire(key, e.shiftKey, e.ctrlKey, e.altKey);
                }
            }
        });

        Game.CanvasChanged.AddListener(() => {
            document.removeEventListener("mousemove", this.#MouseMove);
            document.addEventListener("mousemove", this.#MouseMove);
        });

        document.addEventListener("mousedown", this.#MouseDown);
        document.addEventListener("mouseup", this.#MouseUp);
    }

    #MouseDown = (e) => {
        if (e.button == "0") this.Mouse1Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);
        if (e.button == "2") this.Mouse2Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);
        if (e.button == "1") this.Mouse3Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);

        let MouseRect = {
            position: this.#MousePos,
            scale: Vector.one
        }

        for (let UIObj of Game.UIObjects) {
            if (!(UIObj instanceof Button)) continue;
            if (!UIObj.enabled) continue;

            if (RectIntersection(MouseRect, UIObj)) {
                if (e.button == "0") UIObj.Mouse1Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);
                else if (e.button == "2") UIObj.Mouse2Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);
                else if (e.button == "3") UIObj.Mouse3Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);
            }
        }
    }

    #MouseUp = (e) => {
        if (e.button == "0") this.Mouse1Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);
        if (e.button == "2") this.Mouse2Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);
        if (e.button == "1") this.Mouse3Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);

        let MouseRect = {
            position: this.#MousePos,
            scale: Vector.one
        }

        for (let UIObj of Game.UIObjects) {
            if (!UIObj instanceof Button) continue;
            if (!UIObj.enabled) continue;

            if (RectIntersection(MouseRect, UIObj)) {
                if (e.button == "0") UIObj.Mouse1Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);
                else if (e.button == "2") UIObj.Mouse2Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);
                else if (e.button == "3") UIObj.Mouse3Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);
            }
        }
    }

    #MouseMove = (e) => {
        let rect = Game.GetCanvas().getBoundingClientRect();

        this.#MousePos = Vector(e.clientX - rect.left, e.clientY - rect.top);
        this.MouseMove.Fire(e.button, e.shiftKey, e.ctrlKey, e.altKey);

        let MouseRect = {
            position: this.#MousePos,
            scale: Vector.one
        }

        for (let UIObj of Game.UIObjects) {
            if (!(UIObj instanceof Button)) continue;
            if (!UIObj.enabled) continue;

            let willContinue = false;

            if (RectIntersection(MouseRect, UIObj)) {
                if (UIObj.mouseover == false) UIObj.MouseEnter.Fire();

                UIObj.mouseover = true;
                willContinue = true;
            }

            if (willContinue) continue;

            if (UIObj.mouseover) UIObj.MouseExit.Fire();

            UIObj.mouseover = false;
        }
    }

    GetKey(key) {
        return this.#KeysDown[key];
    }

    GetAxisRaw(axis) {
        let result = {
            vertical: 0,
            horizontal: 0
        }

        if (this.GetKey("W") || this.GetKey("ArrowUp") || this.GetKey("Space")) result.vertical += 1;
        if (this.GetKey("A") || this.GetKey("ArrowLeft")) result.horizontal -= 1;
        if (this.GetKey("S") || this.GetKey("ArrowDown")) result.vertical -= 1;
        if (this.GetKey("D") || this.GetKey("ArrowRight")) result.horizontal += 1;

        return result[axis.toLowerCase()];
    }

    GetMousePos() {
        return this.#MousePos;
    }
}