function Clamp(value, min, max) {
    if (value < min) return min;
    if (value < max) return max;

    return value;
}

function RectIntersection(o1, o2) {
    if(o1.position.x + o1.scale.x < o2.position.x
    || o1.position.x > o2.position.x + o2.scale.x
    || o1.position.y + o1.scale.y < o2.position.y
    || o1.position.y > o2.position.y + o2.scale.y) return false;

    return true;
}

function Raycast(startPos, endPos) {
    let hit;
    
    // find game object that the ray collides with

    return hit;
}

function Vector(x, y) {
    return {
        x: x,
        y: y,

        magnitude() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },

        normalised() {
            return Vector(this.x / this.magnitude(), this.y / this.magnitude());
        },

        add(vector) {
            if (!vector instanceof Object || !('x' in vector) || !('y' in vector)) return;

            return Vector(this.x + vector.x, this.y + vector.y);
        },

        sub(vector) {
            if (!vector instanceof Object || !('x' in vector) || !('y' in vector)) return;

            return Vector(this.x - vector.x, this.y - vector.y);
        },

        mul(vector) {
            if (!vector instanceof Object || !('x' in vector) || !('y' in vector)) return;

            return Vector(this.x * vector.x, this.y * vector.y);
        },

        div(vector) {
            if (!vector instanceof Object || !('x' in vector) || !('y' in vector)) return;

            return Vector(this.x / vector.x, this.y / vector.y);
        }
    }
}

Vector.zero = Vector(0, 0);
Vector.one = Vector(1, 1);
Vector.up = Vector(0, -1);
Vector.right = Vector(1, 0);
Vector.down = Vector(0, 1);
Vector.left = Vector(-1, 0);

const Random = {
    Integer(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    Float() {
        return Math.random();
    },

    Choice(choices) {
        return choices[Math.floor(Math.random() * choices.length)];
    }
}

class _Animation {
    #frames = [];
    #frame = 0;
    #image;
    playing = false;
    paused = false;
    fps = 12;

    constructor(frames) {
        this.#frames = frames || [];

        if (this.#frames.length) this.#image = this.#frames[0];
    }

    Play() {
        if (!this.#frames.length || this.playing) return;

        if (!this.paused) {
            this.#frame = 0;
            this.#image = this.#frames[this.#frame];
        }

        this.paused = false;
        this.playing = true;

        const nextFrame = () => {
            if (this.paused) return;
            if (!this.playing) {
                this.#frame = 0;
                this.#image = this.#frames[this.#frame];

                return;
            }

            if (this.#frame >= this.#frames.length - 1) {
                this.playing = false;
                this.paused = false;
                
                return;
            }

            this.#frame++;
            this.#image = this.#frames[this.#frame];

            setTimeout(nextFrame, 1000 / this.fps);
        }

        setTimeout(nextFrame, 1000 / this.fps);
    }

    Pause() {
        this.paused = true;
    }

    Stop() {
        this.playing = false;
    }

    SetFrame(n) {
        if (typeof n != 'number' || Math.floor(n) != n) return console.error('Can only set the frame to an integer.');
        if (n >= this.#frames.length) return console.error('Number is too high, cannot set frame.');

        this.#frame = n;
    }

    GetImage() {
        return this.#image;
    }
}

class _Event {
    #listeners = [];

    AddListener(listener) {
        if (typeof listener != 'function') return console.error('Event listener must be a function.');

        this.#listeners.push(listener);
    }

    RemoveListener(listener) {
        let index = this.#listeners.indexOf(listener);

        if (this.#listeners[index]) this.#listeners.splice(index, 1);
    }

    Fire(...args) {
        for (let listener of this.#listeners) listener(...args);
    }
}

const Game = new class {
    #lastUpdate;
    #canvas;
    #ctx;

    Settings = {
        Gravity: 30,
        TerminalVel: 3000,
        BgImage: null,
        BgColour: 'black',
        ImageSmoothing: false,
        AutoCanvasResize: true
    }

    UpdateGroup = [];
    //DrawGroup = [];
    #UIObjects = [];
    scene;

    Camera = {
        position: Vector.zero,
        zoom: 1,
        subject: null // Useless rn, this will be a GameObject that the camera follows
    }

    CanvasChanged = new _Event();

    constructor() {
        this.UI = {
            Add: (UIObj) => {
                if (!UIObj instanceof UIObject) return console.error('Can only add UI Objects.');

                this.#UIObjects.push(UIObj);
            },

            Remove: (UIObj) => {
                let index = this.#UIObjects.indexOf(UIObj);

                if (this.#UIObjects[index]) this.#UIObjects.splice(index, 1);
            },

            GetUIObjects: () => {
                return this.#UIObjects;
            }
        }
    }

    #ResizeCanvas = () => {
        if (this.Settings.AutoCanvasResize && this.#canvas) {
            this.#canvas.width = window.innerWidth;
            this.#canvas.height = window.innerHeight;

            this.#ctx.imageSmoothingEnabled = this.Settings.ImageSmoothing;
        }
    }

    CreateCanvas() {
        this.#canvas = document.createElement('canvas');
        this.#ctx = this.#canvas.getContext('2d');

        this.CanvasChanged.Fire();

        document.body.appendChild(this.#canvas);
    }

    SetCanvas(canvas) {
        try {
            this.#canvas = canvas;
            this.#ctx = this.#canvas.getContext('2d');

            this.CanvasChanged.Fire();

            this.#ResizeCanvas();

        } catch (e) {
            console.error('Could not set canvas.');
        }
    }

    GetCanvas() {
        return this.#canvas;
    }

    Start() {
        if (!this.#canvas) return console.error('No canvas has been set.');

        this.#lastUpdate = performance.now();
        requestAnimationFrame(this.#Update);
    }

    #Update = (timestamp) => {
        const delta = (timestamp - this.#lastUpdate) / 1000;
        this.#lastUpdate = timestamp;

        if (!delta || isNaN(delta) || delta < 0 || delta > 1) {
            this.#Draw();
            
            requestAnimationFrame(this.#Update);

            return;
        }

        for (let member of this.UpdateGroup) if (member.Update) member.Update(delta);
        for (let UIObj of this.#UIObjects) UIObj.Update();

        this.#Draw();

        requestAnimationFrame(this.#Update);
    }

    #Draw() {
        this.#ctx.globalAlpha = 1;

        if (this.Settings.BgImage) {
            this.#ctx.drawImage(this.Settings.BgImage, 0, 0, this.#canvas.width, this.#canvas.height);
        
        } else {
            this.#ctx.fillStyle = this.Settings.BgColour;
            this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
        }

        //this.#ctx.setTransform(this.Camera.zoom, 0, 0, this.Camera.zoom, -this.Camera.position.x, -this.Camera.position.y);

        for (let gameObject of this.scene.gameObjects) gameObject.Draw(this.#ctx);
        for (let UIObj of this.#UIObjects) UIObj.Draw(this.#ctx);
    }
}

const Input = new class {
    #Keys = {
        Backspace: 'BACKSPACE',
        Tab: 'TAB',
        Enter: 'ENTER',
        Shift: 'SHIFT',
        Control: 'CONTROL',
        Alt: 'ALT',
        Pause: 'PAUSE',
        CapsLock: 'CAPSLOCK',
        Escape: 'ESCAPE',
        Space: ' ',
        PageUp: 'PAGEUP',
        PageDown: 'PAGEDOWN',
        End: 'END',
        Home: 'HOME',
        ArrowLeft: 'ARROWLEFT',
        ArrowUp: 'ARROWUP',
        ArrowRight: 'ARROWRIGHT',
        ArrowDown: 'ARROWDOWN',
        PrintScreen: 'PRINTSCREEN',
        Insert: 'INSERT',
        Delete: 'DELETE',
        Digit0: '0',
        Digit1: '1',
        Digit2: '2',
        Digit3: '3',
        Digit4: '4',
        Digit5: '5',
        Digit6: '6',
        Digit7: '7',
        Digit8: '8',
        Digit9: '9',
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
        E: 'E',
        F: 'F',
        G: 'G',
        H: 'H',
        I: 'I',
        J: 'J',
        K: 'K',
        L: 'L',
        M: 'M',
        N: 'N',
        O: 'O',
        P: 'P',
        Q: 'Q',
        R: 'R',
        S: 'S',
        T: 'T',
        U: 'U',
        V: 'V',
        W: 'W',
        X: 'X',
        Y: 'Y',
        Z: 'Z',
        Meta: 'META',
        ContextMenu: 'CONTEXTMENU',
        AudioVolumeMute: 'AUDIOVOLUMEMUTE',
        AudioVolumeDown: 'AUDIOVOLUMEDOWN',
        AudioVolumeUp: 'AUDIOVOLUMEUP',
        F1: 'F1',
        F2: 'F2',
        F3: 'F3',
        F4: 'F4',
        F5: 'F5',
        F6: 'F6',
        F7: 'F7',
        F8: 'F8',
        F9: 'F9',
        F10: 'F10',
        F11: 'F11',
        F12: 'F12',
        NumLock: 'NUMLOCK',
        ScrollLock: 'SCROLLLOCK',
        Semicolon: ';',
        Equal: '=',
        Comma: ',',
        Minus: '-',
        Period: '.',
        Slash: '/',
        Backquote: '`',
        BracketLeft: '[',
        Backslash: '\\',
        BracketRight: ']',
        Apostrophe: '\'',
        Tilde: '~',
        Exclamation: '!',
        At: '@',
        Sharp: '#',
        Dollar: '$',
        Percent: '%',
        Caret: '^',
        Ampersand: '&',
        Asterisk: '*',
        ParenthesisLeft: '(',
        ParenthesisRight: ')',
        Underscore: '_',
        Plus: '+',
        OpenBrace: '{',
        CloseBrace: '}',
        Pipe: '|',
        Colon: ':',
        Quote: '"',
        AngleBracketLeft: '<',
        AngleBracketRight: '>',
        QuestionMark: '?'
    }

    #MousePos = Vector.zero;

    MouseMove = new _Event();
    MouseDown = new _Event();
    MouseUp = new _Event();

    #KeysDown = {}

    KeyDown = new _Event();
    KeyUp = new _Event();

    constructor() {
        for (let key in this.#Keys) this.#KeysDown[key] = false;

        document.addEventListener('keydown', (e) => {
            for (let key in this.#Keys) {
                if (this.#Keys[key] == e.key.toUpperCase()) {
                    this.#KeysDown[key] = true;
                    this.KeyDown.Fire(key, e.shiftKey, e.ctrlKey, e.altKey);
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            for (let key in this.#Keys) {
                if (this.#Keys[key] == e.key.toUpperCase()) {
                    this.#KeysDown[key] = false;
                    this.KeyUp.Fire(key, e.shiftKey, e.ctrlKey, e.altKey);
                }
            }
        });

        Game.CanvasChanged.AddListener(() => {
            document.addEventListener('mousemove', (e) => {
                let rect = Game.GetCanvas().getBoundingClientRect();

                this.#MousePos = Vector(e.clientX - rect.left, e.clientY - rect.top);
                this.MouseMove.Fire(e.button, e.shiftKey, e.ctrlKey, e.altKey);
            });
        });

        document.addEventListener('mousedown', (e) => {
            this.MouseDown.Fire(e.button, e.shiftKey, e.ctrlKey, e.altKey);

            let MouseRect = {
                position: this.#MousePos,
                scale: Vector.one
            }

            for (let UIObj of Game.UI.GetUIObjects()) {
                if (RectIntersection(MouseRect, UIObj)) {
                    UIObj.MouseDown.Fire(e.button, e.shiftKey, e.ctrlKey, e.altKey);
                }
            }
        });

        document.addEventListener('mouseup', (e) => {
            this.MouseUp.Fire(e.button, e.shiftKey, e.ctrlKey, e.altKey);

            let MouseRect = {
                position: this.#MousePos,
                scale: Vector.one
            }

            for (let UIObj of Game.UI.GetUIObjects()) {
                if (RectIntersection(MouseRect, UIObj)) {
                    UIObj.MouseUp.Fire(e.button, e.shiftKey, e.ctrlKey, e.altKey);
                }
            }
        });
    }

    GetKey(key) {
        return this.#KeysDown[key];
    }

    GetAxisRaw(axis) {
        let result = {
            vertical: 0,
            horizontal: 0
        }

        if (this.GetKey('W') || this.GetKey('ArrowUp')) result.vertical += 1;
        if (this.GetKey('A') || this.GetKey('ArrowLeft')) result.horizontal -= 1;
        if (this.GetKey('S') || this.GetKey('ArrowDown')) result.vertical -= 1;
        if (this.GetKey('D') || this.GetKey('ArrowRight')) result.horizontal += 1;

        return result[axis.toLowerCase()];
    }

    GetMousePos() {
        return this.#MousePos;
    }
}

class UIObject {
    bgColour = 'grey';
    bgOpacity = 1;
    outlineColour = 'black';
    outlineOpacity = 1;
    outlineSize = 1;
    visible = true;
    MouseEnter = new _Event();
    MouseExit = new _Event();
    MouseDown = new _Event();
    MouseUp = new _Event();

    #mouseover = false;

    constructor(position, scale) {
        this.position = position || Vector.zero;
        this.scale = scale || Vector(150, 50);

        Game.UI.Add(this);
    }

    Update() {
        let MouseRect = {
            position: Input.GetMousePos(),
            scale: Vector.one
        }

        if (RectIntersection(this, MouseRect)) {
            if (!this.#mouseover) {
                this.#mouseover = true;

                this.MouseEnter.Fire();
            }

        } else {
            if (this.#mouseover) {
                this.MouseExit.Fire();
            }

            this.#mouseover = false;
        }
    }

    Draw(ctx) {
        ctx.globalAlpha = this.outlineOpacity;
        ctx.strokeStyle = this.outlineColour;
        ctx.lineWidth = this.outlineSize;
        ctx.strokeRect(
            this.position.x - this.outlineSize,
            this.position.y - this.outlineSize,
            this.scale.x + this.outlineSize * 2,
            this.scale.y + this.outlineSize * 2
        );

        ctx.globalAlpha = this.bgOpacity;
        ctx.fillStyle = this.bgColour;
        ctx.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);

        if (this.text) {
            ctx.globalAlpha = this.textOpacity;
            ctx.font = this.textSize + ' px' + this.font;
            ctx.fillText(this.text, this.position.x, this.position.y);
        }
    }

    Destroy() {
        Game.UI.Remove(this);
    }
}

class Frame extends UIObject {}

class TextLabel extends UIObject {
    text = '';
    textSize = 15;
    textOpacity = 1;
    font = 'Arial';

    constructor(text, position, scale) {
        super(position, scale);

        this.text = text;
    }
}

class GameObject {
    image;
    colour = 'grey';
    opacity = 1;

    constructor(position, scale) {
        this.position = position || Vector.zero;
        this.scale = scale || Vector(50, 50);

        Game.scene.Add(this);
    }

    Draw(ctx) {
        ctx.globalAlpha = this.opacity;

        if (this.image) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.scale.x, this.scale.y);
            
            return;
        }

        ctx.fillStyle = this.colour;
        ctx.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);
    }

    Destroy() {
        Game.scene.Remove(this);
    }
}

class Scene {
    constructor(gameObjects) {
        this.gameObjects = gameObjects || [];
    }

    Add(gameObject) {
        if (!gameObject instanceof GameObject) return console.error('Can only add game objects to the scene.');
        
        this.gameObjects.push(gameObject);
    }

    Remove(gameObject) {
        let index = this.gameObjects.indexOf(gameObject);

        if (this.gameObjects[index]) this.gameObjects.splice(index, 1);
    }
}

Game.scene = new Scene();

class UpdatesEachFrame {
    constructor() {
        Game.UpdateGroup.push(this);
    }
}