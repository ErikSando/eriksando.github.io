// Game Engine

// Create a project using "Create Project.cmd" or by importing this file into a HTML file

console.log("Engine v1.0.0");

const TextAlignX = Object.freeze({
    Left: 1,
    Center: 2,
    Right: 3
});

const TextAlignY = Object.freeze({
    Top: 1,
    Center: 2,
    Bottom: 3
});

const KeyCode = Object.freeze({
    Backspace: "BACKSPACE",
    Tab: "TAB",
    Enter: "ENTER",
    ShiftLeft: "SHIFTLEFT",
    ShiftRight: "SHIFTRIGHT",
    ControlLeft: "CONTROLLEFT",
    ControlRight: "CONTROLRIGHT",
    AltLeft: "ALTLEFT",
    AltRight: "ALTRIGHT",
    Pause: "PAUSE",
    CapsLock: "CAPSLOCK",
    Escape: "ESCAPE",
    Space: "SPACE",
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
    Digit0: "DIGIT0",
    Digit1: "DIGIT1",
    Digit2: "DIGIT2",
    Digit3: "DIGIT3",
    Digit4: "DIGIT4",
    Digit5: "DIGIT5",
    Digit6: "DIGIT6",
    Digit7: "DIGIT7",
    Digit8: "DIGIT8",
    Digit9: "DIGIT9",
    KeyA: "KEYA",
    KeyB: "KEYB",
    KeyC: "KEYC",
    KeyD: "KEYD",
    KeyE: "KEYE",
    KeyF: "KEYF",
    KeyG: "KEYG",
    KeyH: "KEYH",
    KeyI: "KEYI",
    KeyJ: "KEYJ",
    KeyK: "KEYK",
    KeyL: "KEYL",
    KeyM: "KEYM",
    KeyN: "KEYN",
    KeyO: "KEYO",
    KeyP: "KEYP",
    KeyQ: "KEYQ",
    KeyR: "KEYR",
    KeyS: "KEYS",
    KeyT: "KEYT",
    KeyU: "KEYU",
    KeyV: "KEYV",
    KeyW: "KEYW",
    KeyX: "KEYX",
    KeyY: "KEYY",
    KeyZ: "KEYZ",
    MetaLeft: "METALEFT",
    MetaRight: "METARIGHT",
    ContextMenu: "CONTEXTMENU",
    // AudioVolumeMute: "AUDIOVOLUMEMUTE",
    // AudioVolumeDown: "AUDIOVOLUMEDOWN",
    // AudioVolumeUp: "AUDIOVOLUMEUP",
    Numpad0: "NUMPAD0",
    Numpad1: "NUMPAD1",
    Numpad2: "NUMPAD2",
    Numpad3: "NUMPAD3",
    Numpad4: "NUMPAD4",
    Numpad5: "NUMPAD5",
    Numpad6: "NUMPAD6",
    Numpad7: "NUMPAD7",
    Numpad8: "NUMPAD8",
    Numpad9: "NUMPAD9",
    NumpadMultiply: "NUMPADMULTIPLY",
    NumpadAdd: "NUMPADADD",
    NumpadSubtract: "NUMPADSUBTRACT",
    NumadDecimal: "NUMPADDECIMAL",
    NumpadDivide: "NUMPADDIVIDE",
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
    Semicolon: "SEMICOLON",
    Equal: "EQUAL",
    Comma: "COMMA",
    Minus: "MINUS",
    Period: "PERIOD",
    Slash: "SLASH",
    Backquote: "BACKQUOTE",
    BracketLeft: "BRACKETLEFT",
    Backslash: "BACKSLASH",
    BracketRight: "BRACKETRIGHT",
    Apostrophe: "QUOTE",
    // Tilde: "~",
    // Exclamation: "!",
    // At: "@",
    // Sharp: "#",
    // Dollar: "$",
    // Percent: "%",
    // Caret: "^",
    // Ampersand: "&",
    // Asterisk: "*",
    // ParenthesisLeft: "(",
    // ParenthesisRight: ")",
    // Underscore: "_",
    // Plus: "+",
    // OpenBrace: "{",
    // CloseBrace: "}",
    // Pipe: "|",
    // Colon: ":",
    // Quote: "\"",
    // AngleBracketLeft: "<",
    // AngleBracketRight: ">",
    // QuestionMark: "?"
});

function Clamp(value, min, max) {
    if (value < min) return min;
    if (value < max) return max;

    return value;
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;

    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalised() {
        return new Vector(this.x / this.magnitude(), this.y / this.magnitude());
    }

    inversed() {
        return new Vector(-this.x, -this.y);
    }

    multiply(n) {
        return new Vector(this.x * n, this.y * n);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
}

Vector.up = () => new Vector(0, -1);
Vector.down = () => new Vector(0, 1);
Vector.left = () => new Vector(-1, 0);
Vector.right = () => new Vector(1, 0);

Vector.one = () => new Vector(1, 1);
Vector.zero = () => new Vector(0, 0);

Vector.DistanceBetween = (v1, v2) => {
    return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
}

Vector.Add = (v1, v2) => {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
}

Vector.Subtract = (v1, v2) => {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
}

class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

class Circle {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
    }
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
    let x1 = l1.start.x;
    let x2 = l1.end.x;
    let x3 = l2.start.x;
    let x4 = l2.end.x;
    let y1 = l1.start.y;
    let y2 = l1.end.y;
    let y3 = l2.start.y;
    let y4 = l2.end.y;

    if ((x1 == x2 && y1 == y2) || (x3 == x4 && y3 == y4)) return false;

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    if (!denominator) return false;

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return false;

    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);

    return new Vector(x, y);
}

function RectAndCircleIntersection(r, c) {
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

function RectAndPointIntersection(r, p) {
    if (r.position.x <= p.x && r.position.x + r.scale.x >= p.x && r.position.y <= p.y && r.position.y + r.scale.y >= p.y) return true;

    return false;
}

function RectAndLineIntersection(r, l) {
    if (RectAndPointIntersection(r, l.start) || RectAndPointIntersection(r, l.end)) return true;

    let rSides = [
        { start: new Vector(r.position.x, r.position.y), end: new Vector(r.position.x + r.scale.x, r.position.y) },
        { start: new Vector(r.position.x + r.scale.x, r.position.y), end: new Vector(r.position.x + r.scale.x, r.position.y + r.scale.y) },
        { start: new Vector(r.position.x + r.scale.x, r.position.y + r.scale.y), end: new Vector(r.position.x, r.position.y + r.scale.y) },
        { start: new Vector(r.position.x, r.position.y + r.scale.y), end: new Vector(r.position.x, r.position.y) }
    ]

    for (let side of rSides) if (LineIntersection(side, l)) return true;

    return false;
}

function RectAndTriangleIntersection(r, t) {
    if (RectAndPointIntersection(r, t.a) || RectAndPointIntersection(r, t.b) || RectAndPointIntersection(r, t.c)) return true;
    
    let tSides = [
        { start: new Vector(t.a.x, t.a.y), end: new Vector(t.b.x, t.b.y) },
        { start: new Vector(t.b.x, t.b.y), end: new Vector(t.c.x, t.c.y) },
        { start: new Vector(t.c.x, t.c.y), end: new Vector(t.a.x, t.a.y) }
    ]

    for (let side of tSides) if (RectAndLineIntersection(r, side)) return true;

    return false;
}

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

    AddListener(listener) {
        if (typeof listener != "function") console.error("Event listener must be a function.");

        this.#listeners.push(listener);
    }

    RemoveListener(listener) {
        let index = this.#listeners.indexOf(listener);

        if (!this.#listeners[index]) console.error("Could not find listener to remove.");

        this.#listeners.splice(index, 1);
    }

    Fire(...args) {
        for (let listener of this.#listeners) listener(...args);
    }
}

class _Animation {
    #frames = [];
    #frame = 0;
    fps = 6;

    #totalDelta = 0;

    constructor(frames = []) {
        this.#frames = frames;
    }

    Update(delta) {
        this.#totalDelta += delta;
    
        if (this.#totalDelta > 1 / this.fps) {   
            if (this.#frame >= this.#frames.length - 1) this.#frame = 0;
            else this.#frame++;

            this.#totalDelta -= 1 / this.fps;
        }
    }

    Reset() {
        this.#frame = 0;
    }

    GetImage() {
        return this.#frames[this.#frame];
    }
}

class UIObject {
    visible = true;
    bgColour = "rgb(150, 150, 150)";
    bgOpacity = 1;
    outlineColour = "rgb(80, 80, 80)";
    outlineThickness = 1;
    outlineOpacity = 1;

    constructor(position = Vector.zero(), scale = Vector.zero()) {
        this.position = position;
        this.scale = scale;

        Game.UI.Add(this);
    }

    Draw(ctx) {
        if (this.outlineThickness > 0 && this.outlineOpacity > 0) {
            ctx.globalAlpha = this.outlineOpacity;
            ctx.strokeStyle = this.outlineColour;
            ctx.lineWidth = this.outlineThickness;

            ctx.rect(
                this.position.x - this.outlineThickness / 2,
                this.position.y - this.outlineThickness / 2,
                this.scale.x + this.outlineThickness,
                this.scale.y + this.outlineThickness
            );

            ctx.stroke();
        }

        ctx.globalAlpha = this.bgOpacity;
        ctx.fillStyle = this.bgColour;
        ctx.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);
    }

    Destroy() {
        Game.UI.Remove(this);

        delete this;
    }
}

class Button extends UIObject {
    enabled = true;

    mouseover = false;

    Mouse1Down = new _Event();
    Mouse1Up = new _Event();

    Mouse2Down = new _Event();
    Mouse2Up = new _Event();

    Mouse3Down = new _Event();
    Mouse3Up = new _Event();

    MouseEnter = new _Event();
    MouseExit = new _Event();

    constructor(position, scale) {
        super(position, scale);
    }
}

class TextLabel extends UIObject {
    font = "Arial";
    textSize = 25;
    textColour = "white";
    textOpacity = 1;
    textStrokeOpacity = 0;
    textStrokeColour = "black";
    textStrokeThickness = 1;
    textAlignX = TextAlignX.Center;
    textAlignY = TextAlignY.Center;

    constructor(position, scale, text = "") {
        super(position, scale);

        this.text = text;
    }

    Draw(ctx) {
        if (!this.visible) return;

        super.Draw(ctx);

        ctx.font = this.textSize + "px " + this.font;

        let textX, textY;

        if (this.textAlignX == TextAlignX.Left) {
            textX = this.position.x;

        } else if (this.textAlignX == TextAlignX.Center) {
            textX = this.position.x + this.scale.x / 2 - ctx.measureText(this.text).width / 2;

        } else {
            textX = this.position.x = this.scale.x - ctx.measureText(this.text).width;
        }

        if (this.textAlignY == TextAlignY.Top) {
            textY = this.position.y + this.textSize;
        
        } else if (this.textAlignY == TextAlignY.Center) {
            textY = this.position.y + this.scale.y / 2 + this.textSize / 2;
        
        } else {
            textY = this.position.y + this.scale.y;
        }

        ctx.globalAlpha = this.textStrokeOpacity;
        ctx.fillStyle = this.textStrokeColour;
        ctx.strokeText(this.text, textX, textY + this.textSize, this.scale.x);

        ctx.globalAlpha = this.textOpacity;
        ctx.fillStyle = this.textColour;
        ctx.fillText(this.text, textX, textY, this.scale.x);
    }
}

class TextButton extends Button {
    font = "Arial";
    textSize = 25;
    textColour = "white";
    textOpacity = 1;
    textStrokeOpacity = 0;
    textStrokeColour = "black";
    textStrokeThickness = 1;
    textAlignX = TextAlignX.Center;
    textAlignY = TextAlignY.Center;

    constructor(position, scale, text = "") {
        super(position, scale);

        this.text = text;
    }

    Draw(ctx) {
        if (!this.visible) return;

        super.Draw(ctx);

        ctx.font = this.textSize + "px " + this.font;

        let textX, textY;

        if (this.textAlignX == TextAlignX.Left) {
            textX = this.position.x;

        } else if (this.textAlignX == TextAlignX.Center) {
            textX = this.position.x + this.scale.x / 2 - ctx.measureText(this.text).width / 2;

        } else {
            textX = this.position.x = this.scale.x - ctx.measureText(this.text).width;
        }

        if (this.textAlignY == TextAlignY.Top) {
            textY = this.position.y + this.textSize;
        
        } else if (this.textAlignY == TextAlignY.Center) {
            textY = this.position.y + this.scale.y / 2 + this.textSize / 2;
        
        } else {
            textY = this.position.y + this.scale.y;
        }

        ctx.globalAlpha = this.textStrokeOpacity;
        ctx.strokeStyle = this.textStrokeColour;
        ctx.lineWidth = this.textStrokeThickness;
        ctx.strokeText(this.text, textX, textY, this.scale.x);

        ctx.globalAlpha = this.textOpacity;
        ctx.fillStyle = this.textColour;
        ctx.fillText(this.text, textX, textY, this.scale.x);
    }
}

class ImageLabel extends UIObject {
    imageOpacity = 1;

    constructor(position, scale, image = new Image()) {
        super(position, scale);

        this.image = image;

        this.bgOpacity = 0;
        this.outlineThickness = 0;
    }

    Draw(ctx) {
        if (!this.visible) return;

        super.Draw(ctx);

        ctx.globalAlpha = this.imageOpacity;
        ctx.drawImage(this.image, this.position.x, this.position.y, this.scale.x, this.scale.y);
    }
}

class ImageButton extends Button {
    imageOpacity = 1;

    constructor(position, scale, image = new Image()) {
        super(position, scale);

        this.image = image;

        this.bgOpacity = 0;
        this.outlineThickness = 0;
    }

    Draw(ctx) {
        if (!this.visible) return;

        super.Draw(ctx);

        ctx.globalAlpha = this.imageOpacity;
        ctx.drawImage(this.image, this.position.x, this.position.y, this.scale.x, this.scale.y);
    }
}

class Scene {
    constructor(name = "", GameObjects = [], UIObjects = [], Particles = []) {
        this.name = name;
        this.GameObjects = GameObjects;
        this.Particles = Particles;
        this.UIObjects = UIObjects;
    }

    Add(...gameObjects) {
        for (let gameObject of gameObjects) {
            if (!(gameObject instanceof GameObject)) {
                console.error("Specified game object is not a GameObject, cannot add to scene.");
                continue;
            }
    
            this.GameObjects.push(gameObject);
        }
    }

    Remove(...gameObjects) {
        for (let gameObject of gameObjects) {
            let index = this.GameObjects.indexOf(gameObject);

            if (!this.GameObjects[index]) {
                console.error("Could not find game object to remove.");
                continue;
            }

            this.GameObjects.splice(index, 1);
        }
    }

    AddArray(gameObjects) {
        for (let gameObject of gameObjects) this.Add(gameObject);
    }

    RemoveArray(gameObjects) {
        for (let gameObject of gameObjects) this.Remove(gameObject);
    }

    AddUI(...uiObjects) {
        for (let uiObject of this.uiObjects) {
            if (!(uiObject instanceof UIObject)) {
                console.error("Specified UI object is not a UIObject, cannot add to scene.");
                continue;
            }
        }
    }

    RemoveUI(...uiObjects) {
        for (let uiObject of uiObjects) {
            let index = this.UIObjects.indexOf(uiObject);

            if (!this.UIObjects[index]) {
                console.error("Could not find UI object to remove.");
                continue;
            }

            this.UIObjects.splice(index, 1);
        }
    }

    AddUIArray(uiObjects) {
        for (let uiObject of uiObjects) this.AddUI(uiObject);
    }

    RemoveUIArray(uiObjects) {
        for (let uiObject of uiObjects) this.RemoveUI(uiObject);
    }

    FindGameObjectByTag(tag) {
        for (let gameObject of this.GameObjects) {
            if (gameObject.tag == tag) return gameObject;
        }
    }
}

const Game = new class {
    #lastUpdate;
    #lastFpsDisplay;
    #fpses = [];
    #fps = 0;
    #canvas;
    #ctx;

    GameObjects = [];
    Particles = [];
    UIObjects = [];

    UpdateGroup = [];

    CanvasChanged = new _Event();

    UIAdded = new _Event();
    UIRemoved = new _Event();

    Update = new _Event();
    Draw = new _Event();

    CanvasChanged = new _Event();

    Loaded = new _Event();

    Settings = {
        Gravity: 1200,
        TerminalVelocity: 1000,
        BackgroundColour: "white",
        BackgroundImage: new Image(),
        BackgroundImageStart: Vector.zero(),
        NativeWidth: 1920,
        NativeHeight: 1080,
        ImageSmoothing: false,
        Shadows: false,
        ViewPoint: Vector.zero()
    }

    Camera = {
        position: Vector.zero()
    }

    scene = new Scene("Default");
    
    constructor() {
        this.UI = {
            Add: (UIObj) => {
                if (!UIObj instanceof UIObject) return console.error("Can only add UI Objects.");

                this.UIObjects.push(UIObj);
                this.UIAdded.Fire();
            },

            Remove: (UIObj) => {
                if (!this.UIObjects.includes(UIObj)) return console.error("Can not find UI object, did not remove.");

                this.UIObjects.splice(this.UIObjects.indexOf(UIObj), 1);
                this.UIRemoved.Fire();
            }
        }
    }

    #ResizeCanvas = () => {
        let aspectRatio = this.Settings.NativeWidth / this.Settings.NativeHeight;
        let dominantAxis = (window.innerWidth <= window.innerHeight * aspectRatio) ? "x" : "y";

        if (dominantAxis == "x") {
            this.#canvas.width = window.innerWidth;
            this.#canvas.height = window.innerWidth / aspectRatio;

        } else {
            this.#canvas.height = window.innerHeight;
            this.#canvas.width = window.innerHeight * aspectRatio;
        }

        this.#ctx.imageSmoothingEnabled = this.Settings.ImageSmoothing;
    }

    CreateCanvas() {
        this.#canvas = document.createElement("canvas");
        this.#ctx = this.#canvas.getContext("2d");

        this.CanvasChanged.Fire();

        document.body.appendChild(this.#canvas);

        window.addEventListener("resize", this.#ResizeCanvas);
        this.#ResizeCanvas();
    }

    SetCanvas(canvas) {
        try {
            this.#canvas = canvas;
            this.#ctx = this.#canvas.getContext("2d");

            this.CanvasChanged.Fire();

            window.addEventListener("resize", this.#ResizeCanvas);
            this.#ResizeCanvas();

        } catch (e) {
            console.error("Could not set canvas.", e);
        }
    }

    GetCanvas() {
        return this.#canvas;
    }

    Start = () => {
        requestAnimationFrame(this.#Start);
    }

    #Start = (timestamp) => {
        this.#lastUpdate = timestamp;
        this.#lastFpsDisplay = timestamp;

        requestAnimationFrame(this.#Update);
    }

    #Update = (timestamp) => {
        const delta = (timestamp - this.#lastUpdate) / 1000;
        this.#lastUpdate = timestamp;

        let fps = 1 / delta;
        this.#fpses.push(fps);

        if (timestamp - this.#lastFpsDisplay > 1000) {
            this.#lastFpsDisplay = timestamp;

            let totalFPS = 0;
            for (let fps of this.#fpses) totalFPS += fps;
        
            let fps = totalFPS / this.#fpses.length;

            this.#fps = fps;
            this.#fpses = [];
        }

        for (let gameObject of this.GameObjects) gameObject.Update(delta);
        for (let particle of this.Particles) particle.Update(delta);
        for (let member of this.UpdateGroup) if (member.Update) member.Update(delta);

        this.Update.Fire(delta);

        this.#Draw();

        requestAnimationFrame(this.#Update);
    }

    #Draw = () => {
        this.#ctx.fillStyle = this.Settings.BackgroundColour;
        this.#ctx.fillRect(this.Camera.position.x, this.Camera.position.y, this.Settings.NativeWidth, this.Settings.NativeHeight);
        this.#ctx.strokeRect(this.Camera.position.x, this.Camera.position.y, this.Settings.NativeWidth, this.Settings.NativeHeight);

        if (this.Settings.BackgroundImage.src) {
            let startX = this.Settings.BackgroundImageStart.x;
            let startY = this.Settings.BackgroundImageStart.y

            console.log(startX, startY);
            
            this.#ctx.translate(startX, startY);
            this.#ctx.drawImage(this.Settings.BackgroundImage, 0, 0);
            this.#ctx.translate(-startX, -startY);
        }

        let scale = this.#canvas.width / this.Settings.NativeWidth;
        this.#ctx.setTransform(scale, 0, 0, scale, -this.Camera.position.x, -this.Camera.position.y);

        let displayRect = {
            position: this.Camera.position,
            scale: new Vector(this.Settings.NativeWidth, this.Settings.NativeHeight)
        }

        for (let gameObject of this.scene.GameObjects) {
            if (RectIntersection(displayRect, gameObject)) {
                gameObject.Draw(this.#ctx);

                if (this.Settings.Shadows) {
                    // trying to make shadows
                    // need to get the two vertices which are not closest or furthest
                    // make two lines from each of the two vertices to the furthest vertex
                    // make another two lines from those vertices away from the view point and not render anything between the four lines

                    let vertices = {
                        topLeft: new Vector(gameObject.left(), gameObject.top()),
                        topRight: new Vector(gameObject.right(), gameObject.top()),
                        bottomLeft: new Vector(gameObject.left(), gameObject.bottom()),
                        bottomRight: new Vector(gameObject.right(), gameObject.bottom())
                    }

                    let closestVertex;
                    let closestDistance;

                    for (let vertex in vertices) {
                        let distance = Vector.DistanceBetween(this.Settings.ViewPoint, vertex)
                    
                        if (closestDistance && closestDistance < distance) continue;

                        closestVertex = vertices[vertex];
                        closestDistance = distance;
                    }
                }
            }
        }

        for (let particle of this.scene.Particles) if (RectIntersection(displayRect, particle)) particle.Draw(this.#ctx);

        for (let uiObject of this.scene.UIObjects) if (uiObject.visible) uiObject.Draw(this.#ctx);

        this.Draw.Fire();
    }

    LoadScene(scene) {
        if (!(scene instanceof Scene)) return console.error("Specified scene is not of type Scene, could not load.");

        this.scene = scene;
    }

    GetFPS() {
        return Number(this.#fps.toFixed(1));
    }
}

class UpdatesEachFrame {
    constructor() {
        Game.UpdateGroup.push(this);
    }
}

class GameObject {
    opacity = 1;
    colour = "lightgrey";
    image = new Image();
    velocity = Vector.zero();
    animation;
    tag = "none";

    CollisionEnter = new _Event();
    // implement this:
    //CollisionExit = new _Event();

    constructor(position = Vector.zero(), scale = new Vector(50, 50), anchored = false, collidable = true) {
        Game.GameObjects.push(this);

        this.position = position;
        this.scale = scale;
        this.anchored = anchored;
        this.collidable = collidable;

        //this.diagonal = Math.sqrt(this.scale.x * this.scale.x + this.scale.y * this.scale.y);
    }

    top() {
        return this.position.y;
    }

    bottom() {
        return this.position.y + this.scale.y;
    }

    left() {
        return this.position.x;
    }

    right() {
        return this.position.x + this.scale.x;
    }

    center() {
        return new Vector(this.position.x + this.scale.x / 2, this.position.y + this.scale.y / 2);
    }

    Update(delta) {
        if (this.animation) this.animation.Update(delta);

        if (this.anchored) return;

        this.velocity.y += Game.Settings.Gravity * delta;
        if (this.velocity.y > Game.Settings.TerminalVelocity) this.velocity.y = Game.Settings.TerminalVelocity;
        
        if (this.collidable) {
            let nextFrameX = {
                position: new Vector(this.position.x + this.velocity.x * delta, this.position.y),
                scale: this.scale
            }

            let nextFrameY = {
                position: new Vector(this.position.x, this.position.y + this.velocity.y * delta),
                scale: this.scale
            }

            for (let gameObject of Game.GameObjects) {
                if (this == gameObject || !gameObject.collidable) continue;

                // tested this with large amounts of game objects but didnt make much difference
                //let maximumDistance = (this.diagonal > gameObject.diagonal ? this.diagonal : gameObject.diagonal) + 1;
                //if (Vector.DistanceBetween(this.position, gameObject.position) > maximumDistance) continue;

                let collision = false;

                if (RectIntersection(nextFrameX, gameObject)) {
                    collision = true;

                    if (this.velocity.x >= 0) this.velocity.x = (gameObject.left() - this.right()) / delta;
                    else this.velocity.x = (gameObject.right() - this.left()) / delta;
                }

                if (RectIntersection(nextFrameY, gameObject)) {
                    collision = true;

                    if (this.velocity.y >= 0) this.velocity.y = (gameObject.top() - this.bottom()) / delta;
                    else this.velocity.y = (gameObject.bottom() - this.top()) / delta;
                }

                if (collision) this.CollisionEnter.Fire(gameObject);
            }
        }

        this.position.add(this.velocity.multiply(delta));
    }

    Draw(ctx) {
        ctx.globalAlpha = this.opacity;

        if (this.animation) {
            this.image = this.animation.GetImage();
            ctx.drawImage(this.image, this.position.x, this.position.y, this.scale.x, this.scale.y);

            return;
        }

        if (this.image.src) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.scale.x, this.scale.y);

            return;
        }

        ctx.fillStyle = this.colour;
        ctx.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);
    }

    Destroy() {
        let index = Game.scene.GameObjects.indexOf(this);

        if (!Game.scene.GameObjects[index]) return console.error("Game object does not exist in game.");

        Game.scene.GameObjects.splice(index, 1);
    }
}

class Particle {
    constructor(position, scale, animation, velocity = Vector.zero()) {
        this.position = position;
        this.animation = animation;
        this.scale = scale || new Vector(this.animation.GetImage().width, this.animation.GetImage().height);
        this.velocity = velocity;

        Game.Particles.push(this);
    }

    Update(delta) {
        this.animation.Update(delta);
        this.position.add(this.velocity.multiply(delta));
    }

    Draw(ctx) {
        ctx.drawImage(this.animation.GetImage(), this.position.x, this.position.y, this.scale.x, this.scale.y);
    }
}

function Raycast(start, end, ignoreList = []) {
    let hit;
    let distance;
    let ray = new Line(start, end);

    for (let gameObject of Game.GameObjects) {
        if (RectAndLineIntersection(gameObject, ray) && !ignoreList.includes(gameObject)) {
            let _distance = Vector.DistanceBetween(start, gameObject);

            if (distance && distance < _distance) continue;

            distance = _distance;
            hit = gameObject;
        }
    }

    return hit;
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

    #MousePos = Vector.zero();

    MouseMove = new _Event();

    Mouse1Down = new _Event();
    Mouse1Up = new _Event();

    Mouse2Down = new _Event();
    Mouse2Up = new _Event();

    Mouse3Down = new _Event();
    Mouse3Up = new _Event();

    #KeysDown = {}
    #KeyCodesDown = {}

    KeyDown = new _Event();
    KeyUp = new _Event();

    constructor() {
        for (let key in this.#Keys) this.#KeysDown[key.toUpperCase()] = false;
        for (let keyCode in KeyCode) this.#KeyCodesDown[keyCode.toUpperCase()] = false;

        document.addEventListener("keydown", (e) => {
            let pressedKey = e.key.toUpperCase();
            let pressedCode = e.code;

            for (let key in this.#Keys) {
                if (this.#Keys[key] == pressedKey) {
                    this.#KeysDown[key.toUpperCase()] = true;

                    let keyDownEvent = {
                        Key: key,
                        KeyCode: KeyCode[pressedCode],
                        ShiftLeft: this.GetKeyCode("ShiftLeft"),
                        ShiftRight: this.GetKeyCode("ShiftRight"),
                        CtrlLeft: this.GetKeyCode("ControlLeft"),
                        CtrlRight: this.GetKeyCode("ControlRight"),
                        AltLeft: this.GetKeyCode("AltLeft"),
                        AltRight: this.GetKeyCode("AltRight"),
                        ShiftKey: e.shiftKey,
                        CtrlKey: e.ctrlKey,
                        AltKey: e.altKey
                    }

                    this.KeyDown.Fire(keyDownEvent);
                }
            }

            for (let keyCode in KeyCode) {
                if (KeyCode[keyCode] == pressedCode.toUpperCase()) {
                    this.#KeyCodesDown[keyCode.toUpperCase()] = true;
                }
            }
        });

        document.addEventListener("keyup", (e) => {
            let pressedKey = e.key.toUpperCase();
            let pressedCode = e.code;

            for (let key in this.#Keys) {
                if (this.#Keys[key] == pressedKey) {
                    this.#KeysDown[key.toUpperCase()] = false;

                    let keyUpEvent = {
                        Key: key,
                        KeyCode: KeyCode[pressedCode],
                        ShiftLeft: this.GetKeyCode("ShiftLeft"),
                        ShiftRight: this.GetKeyCode("ShiftRight"),
                        CtrlLeft: this.GetKeyCode("ControlLeft"),
                        CtrlRight: this.GetKeyCode("ControlRight"),
                        AltLeft: this.GetKeyCode("AltLeft"),
                        AltRight: this.GetKeyCode("AltRight"),
                        ShiftKey: e.shiftKey,
                        CtrlKey: e.ctrlKey,
                        AltKey: e.altKey
                    }

                    this.KeyUp.Fire(keyUpEvent);
                }
            }

            for (let keyCode in KeyCode) {
                if (KeyCode[keyCode] == pressedCode.toUpperCase()) {
                    this.#KeyCodesDown[keyCode.toUpperCase()] = false;
                }
            }
        });

        Game.CanvasChanged.AddListener(() => {
            document.removeEventListener("mousemove", this.#MouseMove);
            document.addEventListener("mousemove", this.#MouseMove);
        });

        document.addEventListener("mousedown", (e) => {
            if (e.button == "0") this.Mouse1Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);
            if (e.button == "2") this.Mouse2Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);
            if (e.button == "1") this.Mouse3Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);
    
            let MouseRect = {
                position: this.#MousePos,
                scale: Vector.one()
            }

            for (let uiObject of Game.UIObjects) {
                if (!(uiObject instanceof Button)) continue;
                if (!uiObject.enabled) continue;
    
                if (RectIntersection(MouseRect, uiObject)) {
                    if (e.button == "0") uiObject.Mouse1Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);
                    else if (e.button == "2") uiObject.Mouse2Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);
                    else if (e.button == "3") uiObject.Mouse3Down.Fire(e.shiftKey, e.ctrlKey, e.altKey);
                }
            }
        });

        document.addEventListener("mouseup", (e) => {
            if (e.button == "0") this.Mouse1Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);
            if (e.button == "2") this.Mouse2Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);
            if (e.button == "1") this.Mouse3Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);
    
            let MouseRect = {
                position: this.#MousePos,
                scale: Vector.one()
            }
    
            for (let uiObject of Game.UIObjects) {
                if (!uiObject instanceof Button || !uiObject.visible) continue;
    
                console.log(uiObject.position.x, uiObject.position.y, uiObject.position.x + uiObject.scale.x, uiObject.position.y + uiObject.scale.y, MouseRect.position.x, MouseRect.position.y);

                if (RectIntersection(MouseRect, uiObject)) {
                    if (e.button == "0") uiObject.Mouse1Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);
                    else if (e.button == "2") uiObject.Mouse2Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);
                    else if (e.button == "3") uiObject.Mouse3Up.Fire(e.shiftKey, e.ctrlKey, e.altKey);
                }
            }
        });

        document.addEventListener("mousemove", this.#MouseMove);
    }

    #MouseMove = (e) => {
        let canvas = Game.GetCanvas();
        let rect = Game.GetCanvas().getBoundingClientRect();
        let scale = Game.Settings.NativeWidth / canvas.width;

        this.#MousePos = new Vector((e.clientX - rect.x), (e.clientY - rect.y)).multiply(scale);
        this.MouseMove.Fire(e.button, e.shiftKey, e.ctrlKey, e.altKey);

        let MouseRect = {
            position: this.#MousePos,
            scale: Vector.one()
        }

        for (let uiObject of Game.UIObjects) {
            if (!(uiObject instanceof Button) || !uiObject.visible) continue;

            if (RectIntersection(MouseRect, uiObject)) {
                if (uiObject.mouseover == false) uiObject.MouseEnter.Fire();

                uiObject.mouseover = true;
                
                continue;
            }

            if (uiObject.mouseover) uiObject.MouseExit.Fire();

            uiObject.mouseover = false;
        }
    }

    GetKey(key) {
        return this.#KeysDown[key.toUpperCase()];
    }

    GetKeyCode(keyCode) {
        return this.#KeyCodesDown[keyCode.toUpperCase()];
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

    GetMousePosition() {
        return this.#MousePos;
    }
}

window.addEventListener("load", () => {
    Game.Loaded.Fire();
});