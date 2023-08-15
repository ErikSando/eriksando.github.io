const TextAlignX = {
    Left: 1,
    Center: 2,
    Right: 3
}

const TextAlignY = {
    Top: 1,
    Center: 2,
    Bottom: 3
}

function Clamp(value, min, max) {
    if (value < min) return min;
    if (value < max) return max;

    return value;
}

function RectIntersection(r1, r2) {
    if(r1.position.x + r1.scale.x <= r2.position.x
    || r1.position.x >= r2.position.x + r2.scale.x
    || r1.position.y + r1.scale.y <= r2.position.y
    || r1.position.y >= r2.position.y + r2.scale.y) return false;

    return true;
}

function CircleIntersection(c1, c2) {
    let distance = c1.position.subtract(c2.position).magnitude();

    if (distance >= c1.radius + c2.radius) return false;

    return true;
}

function LineIntersection(l1, l2) {
    let x1 = l1.startPos.x;
    let x2 = l1.endPos.x;
    let x3 = l2.startPos.x;
    let x4 = l2.endPos.x;
    let y1 = l1.startPos.y;
    let y2 = l1.endPos.y;
    let y3 = l2.startPos.y;
    let y4 = l2.endPos.y;

    if ((x1 == x2 && y1 == y2) || (x3 == x4 && y3 == y4)) return false;

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    if (!denominator) return false;

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return false;

    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);

    return Vector(x, y);
}

function RectAndCircleIntersection(r, c){
    let distanceX = Math.abs(c.position.x - r.position.x - r.scale.x / 2);
    let distanceY = Math.abs(c.position.y - r.position.y - r.scale.y / 2);

    if (distanceX > (r.scale.x / 2 + c.radius)) return false;
    if (distanceY > (r.scale.y / 2 + c.radius)) return false;

    if (distanceX <= (r.scale.x / 2)) return true;
    if (distanceY <= (r.scale.y / 2)) return true;

    let dx = distanceX - r.scale.x / 2;
    let dy = distanceY - r.scale.y / 2;

    return (dx * dx + dy * dy <= c.raduis * c.radius);
}

function Raycast(startPos, endPos) {
    let hit;
    
    // find game object that the ray collides with

    return hit;
}

function Wait(time = 1000 / 60) {
    return new Promise(resolve => setTimeout(resolve, time));
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

        negated() {
            return Vector(-this.x, -this.y);
        },

        equals(vector) {
            return this.x == vector.x && this.y == vector.y;
        },

        add(arg) {
            return Vector(this.x + (arg.x || arg), this.y + (arg.y || arg));
        },

        subtract(arg) {
            return Vector(this.x - (arg.x || arg), this.y - (arg.y || arg));
        },

        multiply(arg) {
            return Vector(this.x * (arg.x || arg), this.y * (arg.y || arg));
        },

        divide(arg) {
            return Vector(this.x / (arg.x || arg), this.y / (arg.y || arg));
        },

        distanceFrom(v) {
            return Math.sqrt(Math.pow((v.x - this.x), 2) + Math.pow((v.y - this.y), 2))
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

class _Event {
    #listeners = [];
    #justfired = false;

    AddListener(listener) {
        if (typeof listener != 'function') return console.error('Event listener must be a function.');

        this.#listeners.push(listener);
    }

    RemoveListener(listener) {
        let index = this.#listeners.indexOf(listener);

        if (this.#listeners[index]) this.#listeners.splice(index, 1);
    }

    Wait() {
        return new Promise(resolve => {
            let interval = setInterval(() => {
                if (this.#justfired) {
                    this.#justfired = false;
                    clearInterval(interval);
                    resolve();
                }
            });
        });
    }

    Fire(...args) {
        for (let listener of this.#listeners) listener(...args);

        this.#justfired = true;

        // want to make this smarter but dont know how :')
        setTimeout(() => {
            this.#justfired = false;
        }, 10);
    }
}

class _Animation {
    #frames = [];
    #frame = 0;
    #image;
    playing = false;
    paused = false;
    fps = 12;
    Ended = new _Event();
    //loop = false;

    constructor(frames = []) {
        this.#frames = frames;

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

                this.Ended.Fire();

                return;
            }

            if (this.#frame >= this.#frames.length - 1) {
                this.playing = false;
                this.paused = false;

                this.Ended.Fire();
                
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

const Game = new class {
    #lastUpdate;
    #canvas;
    #ctx;

    Settings = {
        Gravity: 40,
        TerminalVel: 2400,
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

        for (let gameObject of this.scene.gameObjects) gameObject.Update(delta);
        for (let particle of this.scene.particles) particle.Update(delta);
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
        for (let particle of this.scene.particles) particle.Draw(this.#ctx);

        this.#ctx.resetTransform();
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
                if (!UIObj.MouseDown) continue;

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
                if (!UIObj.MouseUp) continue;
                
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
    outlineSize = 1;
    visible = true;

    #mouseover = false;

    constructor(position = Vector.zero, scale = Vector(150, 50)) {
        this.position = position;
        this.scale = scale;

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
        ctx.globalAlpha = this.bgOpacity;
        ctx.strokeStyle = this.outlineColour;
        ctx.lineWidth = this.outlineSize;
        ctx.fillStyle = this.bgColour;
        ctx.rect(this.position.x - this.outlineSize / 2, this.position.y - this.outlineSize / 2, this.scale.x + this.outlineSize, this.scale.y + this.outlineSize);
        ctx.stroke();

        ctx.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);

        if (this.image) {
            ctx.globalAlpha = this.imageOpacity;
            ctx.drawImage(this.image, this.position.x, this.position.y, this.scale.x, this.scale.y);
        }

        if (this.text) {
            ctx.globalAlpha = this.textOpacity;
            ctx.fillStyle = this.textColour;
            ctx.font = this.textSize + 'px ' + this.font;

            let textW = ctx.measureText(this.text).width;

            let textX = this.position.x + (this.scale.x - textW) / 2;
            let textY = this.position.y + this.scale.y / 2 + (this.textSize * 0.75 / 2);

            if (this.textAlignX == TextAlignX.Left) {
                textX = this.position.x;

            } else if (this.textAlignX == TextAlignX.Right) {
                textX = this.scale.x - textW;
            }

            if (this.textAlignY == TextAlignY.Top) {
                textY = this.position.y + this.textSize;
            
            } else if (this.textAlignY == TextAlignY.Bottom) {
                textY = this.position.y + this.scale.y;
            }

            ctx.fillText(this.text, textX, textY);
        }
    }

    Destroy() {
        Game.UI.Remove(this);
    }
}

class Frame extends UIObject {}

class TextLabel extends UIObject {
    textSize = 15;
    textColour = 'white';
    textOpacity = 1;
    textAlignX = TextAlignX.Center;
    textAlignY = TextAlignY.Center;
    font = 'Arial';

    constructor(text = '', position, scale) {
        super(position, scale);

        this.text = text;
    }
}

class TextButton extends UIObject {
    textSize = 15;
    textColour = 'white';
    textOpacity = 1;
    textAlignX = TextAlignX.Center;
    textAlignY = TextAlignY.Center;
    font = 'Arial';

    MouseEnter = new _Event();
    MouseExit = new _Event();
    MouseDown = new _Event();
    MouseUp = new _Event();

    constructor(text = '', position, scale) {
        super(position, scale);

        this.text = text;
    }
}

class ImageLabel extends UIObject {
    imageOpacity = 1;

    constructor(image = null, position, scale) {
        super(position, scale);

        this.image = image;
    }
}

class ImageButton extends UIObject {
    imageOpacity = 1;

    MouseEnter = new _Event();
    MouseExit = new _Event();
    MouseDown = new _Event();
    MouseUp = new _Event();

    constructor(image = null, position, scale) {
        super(position, scale);

        this.image = image;
    }
}

class GameObject {
    image;
    colour = 'grey';
    opacity = 1;
    canCollide = true;
    vel = Vector.zero;
    static = false;

    constructor(position = Vector.zero, scale = Vector(50, 50)) {
        this.position = position;
        this.scale = scale;

        Game.scene.Add(this);
    }

    Update(delta) {
        //this.position.x += this.vel.x * delta;
        //this.position.y += this.vel.y * delta;
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

class Particle {
    #animation;
    velocity = Vector.zero;

    constructor(animation = new _Animation(), position = Vector.zero, scale = Vector.zero) {
        this.#animation = animation;
        this.position = position;
        this.scale = scale;

        this.#animation.Play();
        this.#animation.Ended.AddListener(() => this.#animation.Play());

        Game.scene.Add(this);
    }

    Update(delta) {
        console.log('updating particle, vel: ' + this.velocity.x + ', ' + this.velocity.y);

        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;
    }

    Draw(ctx) {
        ctx.drawImage(this.#animation.GetImage(), this.position.x, this.position.y, this.scale.x, this.scale.y);
    }
}

class Scene {
    particles = [];

    constructor(gameObjects = []) {
        this.gameObjects = gameObjects;
    }

    Add(arg) {
        if (arg instanceof GameObject) this.gameObjects.push(arg);
        else if (arg instanceof Particle) this.particles.push(arg);
        else console.error('Can only add game objects or particles to the scene.');
    }

    Remove(arg) {
        let index = this.gameObjects.indexOf(arg);

        if (index != -1) this.gameObjects.splice(index, 1);
        else index = this.particles.indexOf(arg);

        if (index != -1) this.particles.splice(index, 1);
    }
}

Game.scene = new Scene();

class UpdatesEachFrame {
    constructor() {
        Game.UpdateGroup.push(this);
    }
}