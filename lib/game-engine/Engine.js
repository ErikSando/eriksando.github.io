// Game Engine
// Create a project using "Create Project.cmd" or by importing this file into a HTML file

console.log("Engine v1.0.2");

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
    AltLeft: "AltLeft",
    AltRight: "AltRight",
    Apostrophe: "Apostrophe",
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowRight: "ArrowRight",
    ArrowUp: "ArrowUp",
    Backquote: "Backquote",
    Backslash: "Backslash",
    Backspace: "Backspace",
    BracketLeft: "BracketLeft",
    BracketRight: "BracketRight",
    CapsLock: "CapsLock",
    Comma: "Comma",
    ContextMenu: "ContextMenu",
    ControlLeft: "ControlLeft",
    ControlRight: "ControlRight",
    Delete: "Delete",
    Digit0: "Digit0",
    Digit1: "Digit1",
    Digit2: "Digit2",
    Digit3: "Digit3",
    Digit4: "Digit4",
    Digit5: "Digit5",
    Digit6: "Digit6",
    Digit7: "Digit7",
    Digit8: "Digit8",
    Digit9: "Digit9",
    End: "End",
    Enter: "Enter",
    Equal: "Equal",
    Escape: "Escape",
    F1: "F1",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5:"F5",
    F6:"F6",
    F7:"F7",
    F8:"F8",
    F9:"F9",
    F10:"F10",
    F11:"F11",
    F12:"F12",
    Home:"Home",
    Insert:"Insert",
    KeyA:"KeyA",
    KeyB:"KeyB",
    KeyC:"KeyC",
    KeyD:"KeyD",
    KeyE:"KeyE",
    KeyF:"KeyF",
    KeyG:"KeyG",
    KeyH:"KeyH",
    KeyI:"KeyI",
    KeyJ:"KeyJ",
    KeyK:"KeyK",
    KeyL:"KeyL",
    KeyM:"KeyM",
    KeyN:"KeyN",
    KeyO:"KeyO",
    KeyP:"KeyP",
    KeyQ:"KeyQ",
    KeyR:"KeyR",
    KeyS:"KeyS",
    KeyT:"KeyT",
    KeyU:"KeyU",
    KeyV:"KeyV",
    KeyW:"KeyW",
    KeyX:"KeyX",
    KeyY:"KeyY",
    KeyZ:"KeyZ",
    MetaLeft:"MetaLeft",
    MetaRight:"MetaRight",
    Minus:"Minus",
    NumLock:"NumLock",
    NumadDecimal:"NumadDecimal",
    Numpad0:"Numpad0",
    Numpad1:"Numpad1",
    Numpad2:"Numpad2",
    Numpad3:"Numpad3",
    Numpad4:"Numpad4",
    Numpad5:"Numpad5",
    Numpad6:"Numpad6",
    Numpad7:"Numpad7",
    Numpad8:"Numpad8",
    Numpad9:"Numpad9",
    NumpadAdd:"NumpadAdd",
    NumpadDivide:"NumpadDivide",
    NumpadMultiply: "NumpadMultiply",
    NumpadSubtract: "NumpadSubtract",
    PageDown: "PageDown",
    PageUp: "PageUp",
    Pause: "Pause",
    Period: "Period",
    PrintScreen: "PrintScreen",
    ScrollLock: "ScrollLock",
    SemiColon: "SemiColon",
    ShiftLeft: "ShiftLeft",
    ShiftRight: "ShiftRight",
    Slash: "Slash",
    Space: "Space",
    Tab: "Tab"
});

function Clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function Lerp(a, b, t) {
    return a + t * (b - a);
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

Vector.Lerp = (v1, v2, t) => {
    let direction = Vector.Subtract(v2, v1);

    return Vector.Add(v1, direction.multiply(t));
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
    if (r1.position.x + r1.scale.x <= r2.position.x
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

    Invoke(...args) {
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

            ctx.strokeRect(
                this.position.x - this.outlineThickness / 2,
                this.position.y - this.outlineThickness / 2,
                this.scale.x + this.outlineThickness, 
                this.scale.y + this.outlineThickness
            );
        }

        ctx.globalAlpha = this.bgOpacity;
        ctx.fillStyle = this.bgColour;
        ctx.fillRect(this.position.x + Game.Camera.position.x, this.position.y + Game.Camera.position.y, this.scale.x, this.scale.y);
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

        this.bgOpacity = 0;
        this.outlineOpacity = 0;
    }

    Draw(ctx) {
        if (!this.visible) return;

        super.Draw(ctx);

        ctx.font = this.textSize + "px " + this.font;

        let textW = Math.min(this.scale.x, ctx.measureText(this.text).width);
        let textX = this.position.x + this.scale.x / 2 - textW / 2;

        ctx.textBaseline = "middle";
        let textY = this.position.y + this.scale.y / 2;

        if (this.textAlignX == TextAlignX.Left) {
            textX = this.position.x;

        } else if (this.textAlignX == TextAlignX.Right) {
            textX = this.position.x = this.scale.x - textW;
        }

        if (this.textAlignY == TextAlignY.Top) {
            ctx.textBaseline = "top";
            textY = this.position.y;

        } else if (this.textAlignY == TextAlignY.Bottom) {
            ctx.textBaseline = "bottom";
            textY = this.position.y + this.scale.y;
        }

        ctx.globalAlpha = this.textStrokeOpacity;
        ctx.strokeStyle = this.textStrokeColour;
        ctx.lineWidth = this.textStrokeThickness * 2;
        ctx.strokeText(this.text, textX + Game.Camera.position.x, textY + Game.Camera.position.y, this.scale.x);

        ctx.globalAlpha = this.textOpacity;
        ctx.fillStyle = this.textColour;
        ctx.fillText(this.text, textX + Game.Camera.position.x, textY + Game.Camera.position.y, this.scale.x);
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

        let textW = Math.min(this.scale.x, ctx.measureText(this.text).width);
        let textX = this.position.x + this.scale.x / 2 - textW / 2;
        let textY = this.position.y + this.scale.y / 2 + this.textSize / 3.5;

        if (this.textAlignX == TextAlignX.Left) {
            textX = this.position.x;

        } else if (this.textAlignX == TextAlignX.Right) {
            textX = this.position.x = this.scale.x - textW;
        }

        if (this.textAlignY == TextAlignY.Top) {
            ctx.textBaseline = "top";
            textY = this.position.y;

        } else if (this.textAlignY == TextAlignY.Bottom) {
            textY = this.position.y + this.scale.y;
        }

        ctx.globalAlpha = this.textStrokeOpacity;
        ctx.strokeStyle = this.textStrokeColour;
        ctx.lineWidth = this.textStrokeThickness;
        ctx.strokeText(this.text, textX + Game.Camera.position.x, textY + Game.Camera.position.y, this.scale.x);

        ctx.globalAlpha = this.textOpacity;
        ctx.fillStyle = this.textColour;
        ctx.fillText(this.text, textX + Game.Camera.position.x, textY + Game.Camera.position.y, this.scale.x);
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
        ctx.drawImage(this.image, this.position.x + Game.Camera.position.x, this.position.y + Game.Camera.position.y, this.scale.x, this.scale.y);
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
        ctx.drawImage(this.image, this.position.x + Game.Camera.position.x, this.position.y + Game.Camera.position.y, this.scale.x, this.scale.y);
    }
}

class Scene {
    layers = {}

    constructor(name = "", GameObjects = [], UIObjects = [], Particles = []) {
        this.name = name;

        for (let gameObject of GameObjects) {
            if (!this.layers[gameObject.layer]) {
                this.layers[gameObject.layer] = [];
            }
            
            this.layers[gameObject.layer].push(gameObject);
        }

        this.Particles = Particles;
        this.UIObjects = UIObjects;
    }

    Add(...gameObjects) {
        for (let gameObject of gameObjects) {
            if (!(gameObject instanceof GameObject)) {
                console.error("Specified game object is not a GameObject, cannot add to scene.");
                continue;
            }

            if (!this.layers[gameObject.layer]) this.layers[gameObject.layer] = [];
            this.layers[gameObject.layer].push(gameObject);
        }
    }

    Remove(...gameObjects) {
        for (let gameObject of gameObjects) {
            let index = this.layers[gameObject.layer].indexOf(gameObject);
            let layer = gameObject.layer;

            if (!this.layers[layer][index]) {
                console.error("Could not find game object to remove.");
                continue;
            }

            this.layers[layer].splice(index, 1);

            if (!this.layers[layer].length) delete this.layers[layer];
        }
    }

    AddArray(gameObjects) {
        for (let gameObject of gameObjects) this.Add(gameObject);
    }

    RemoveArray(gameObjects) {
        for (let gameObject of gameObjects) this.Remove(gameObject);
    }

    AddUI(...uiObjects) {
        for (let uiObject of uiObjects) {
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
        Gravity: 2000,
        TerminalVelocity: 1200,
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
                this.UIAdded.Invoke();
            },

            Remove: (UIObj) => {
                if (!this.UIObjects.includes(UIObj)) return console.error("Can not find UI object, did not remove.");

                this.UIObjects.splice(this.UIObjects.indexOf(UIObj), 1);
                this.UIRemoved.Invoke();
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

        this.CanvasChanged.Invoke();

        document.body.appendChild(this.#canvas);

        window.addEventListener("resize", this.#ResizeCanvas);
        this.#ResizeCanvas();
    }

    SetCanvas(canvas) {
        try {
            this.#canvas = canvas;
            this.#ctx = this.#canvas.getContext("2d");

            this.CanvasChanged.Invoke();

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

        for (let layer in this.scene.layers) {
            for (let i in this.scene.layers[layer]) {
                let gameObject = this.scene.layers[layer][i];
                gameObject.Update(delta);
            }
        }

        for (let particle of this.scene.Particles) particle.Update(delta);
        for (let member of this.UpdateGroup) if (member.Update) member.Update(delta);

        this.Update.Invoke(delta);

        this.#Draw();

        requestAnimationFrame(this.#Update);
    }

    #Draw = () => {
        let scale = this.#canvas.width / this.Settings.NativeWidth;
        this.#ctx.setTransform(scale, 0, 0, scale, -this.Camera.position.x * scale, -this.Camera.position.y * scale);

        if (this.Settings.BackgroundImage.src) {
            let startX = this.Settings.BackgroundImageStart.x;
            let startY = this.Settings.BackgroundImageStart.y

            this.#ctx.translate(startX, startY);
            this.#ctx.drawImage(this.Settings.BackgroundImage, 0, 0);
            this.#ctx.translate(-startX, -startY);
            
        } else {
            this.#ctx.fillStyle = this.Settings.BackgroundColour;
            this.#ctx.fillRect(this.Camera.position.x, this.Camera.position.y, this.Settings.NativeWidth, this.Settings.NativeHeight);
        }

        let displayRect = {
            position: this.Camera.position,
            scale: new Vector(this.Settings.NativeWidth, this.Settings.NativeHeight)
        }

        for (let layer in this.scene.layers) {
            for (let i in this.scene.layers[layer]) {
                let gameObject = this.scene.layers[layer][i];

                if (RectIntersection(displayRect, gameObject)) {
                    gameObject.Draw(this.#ctx);
    
                    // if (this.Settings.Shadows) {
                    //     // trying to make shadows
                    //     // need to get the two vertices which are not closest or furthest
                    //     // make two lines from each of the two vertices to the furthest vertex
                    //     // make another two lines from those vertices away from the view point and not render anything between the four lines
    
                    //     let vertices = {
                    //         topLeft: new Vector(gameObject.left(), gameObject.top()),
                    //         topRight: new Vector(gameObject.right(), gameObject.top()),
                    //         bottomLeft: new Vector(gameObject.left(), gameObject.bottom()),
                    //         bottomRight: new Vector(gameObject.right(), gameObject.bottom())
                    //     }
    
                    //     let closestVertex;
                    //     let closestDistance;
    
                    //     for (let vertex in vertices) {
                    //         let distance = Vector.DistanceBetween(this.Settings.ViewPoint, vertex)
    
                    //         if (closestDistance && closestDistance < distance) continue;
    
                    //         closestVertex = vertices[vertex];
                    //         closestDistance = distance;
                    //     }
                    // }
                }
            }
        }

        for (let particle of this.scene.Particles) if (RectIntersection(displayRect, particle)) particle.Draw(this.#ctx);
        for (let uiObject of this.scene.UIObjects) if (uiObject.visible) uiObject.Draw(this.#ctx);

        this.Draw.Invoke();
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
    image;// = new Image();
    velocity = Vector.zero();
    animation;
    tag = "none";
    layer = 1;

    CollisionEnter = new _Event();
    CollisionExit = new _Event();

    TouchingObjects = [];

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

            let oldTouchingObjects = this.TouchingObjects;
            this.TouchingObjects = [];

            for (let gameObject of Game.GameObjects) {
                if (this == gameObject || !gameObject.collidable) continue;

                let colliding = false;

                if (RectIntersection(nextFrameX, gameObject)) {
                    colliding = true;

                    if (this.velocity.x >= 0) this.velocity.x = (gameObject.left() - this.right()) / delta;
                    else this.velocity.x = (gameObject.right() - this.left()) / delta;
                }

                if (RectIntersection(nextFrameY, gameObject)) {
                    colliding = true;

                    if (this.velocity.y >= 0) this.velocity.y = (gameObject.top() - this.bottom()) / delta;
                    else this.velocity.y = (gameObject.bottom() - this.top()) / delta;
                }

                if (colliding) this.TouchingObjects.push(gameObject);
            }

            for (let gameObject of this.TouchingObjects) {
                if (!oldTouchingObjects.includes(gameObject)) this.CollisionEnter.Invoke(gameObject);
            }

            for (let gameObject of oldTouchingObjects) {
                if (!this.TouchingObjects.includes(gameObject)) this.CollisionExit.Invoke(gameObject);
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

        if (this.image) {
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
    #MousePos = Vector.zero();

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
        for (let keyCode in KeyCode) this.#KeysDown[KeyCode[keyCode]] = false;

        document.addEventListener("keydown", (e) => {
            this.#KeysDown[e.code] = true;
        });

        document.addEventListener("keyup", (e) => {
            this.#KeysDown[e.code] = false;
        });

        document.addEventListener("mousedown", (e) => {
            if (e.button == "0") this.Mouse1Down.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
            else if (e.button == "2") this.Mouse2Down.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
            else if (e.button == "1") this.Mouse3Down.Invoke(e.shiftKey, e.ctrlKey, e.altKey);

            let MouseRect = {
                position: this.#MousePos,
                scale: Vector.one()
            }

            for (let uiObject of Game.UIObjects) {
                if (!(uiObject instanceof Button) || !uiObject.visible) continue;

                if (RectIntersection(MouseRect, uiObject)) {
                    if (e.button == "0") uiObject.Mouse1Down.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
                    else if (e.button == "2") uiObject.Mouse2Down.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
                    else if (e.button == "3") uiObject.Mouse3Down.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
                }
            }
        });

        document.addEventListener("mouseup", (e) => {
            if (e.button == "0") this.Mouse1Up.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
            else if (e.button == "2") this.Mouse2Up.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
            else if (e.button == "1") this.Mouse3Up.Invoke(e.shiftKey, e.ctrlKey, e.altKey);

            let MouseRect = {
                position: this.#MousePos,
                scale: Vector.one()
            }

            for (let uiObject of Game.UIObjects) {
                if (!(uiObject instanceof Button) || !uiObject.visible) continue;

                if (RectIntersection(MouseRect, uiObject)) {
                    if (e.button == "0") uiObject.Mouse1Up.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
                    else if (e.button == "2") uiObject.Mouse2Up.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
                    else if (e.button == "3") uiObject.Mouse3Up.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
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
        this.MouseMove.Invoke(e.button, e.shiftKey, e.ctrlKey, e.altKey);

        let MouseRect = {
            position: this.#MousePos,
            scale: Vector.one()
        }

        for (let uiObject of Game.UIObjects) {
            if (!(uiObject instanceof Button) || !uiObject.visible) continue;

            if (RectIntersection(MouseRect, uiObject)) {
                if (uiObject.mouseover == false) uiObject.MouseEnter.Invoke();

                uiObject.mouseover = true;

                continue;
            }

            if (uiObject.mouseover) uiObject.MouseExit.Invoke();

            uiObject.mouseover = false;
        }
    }

    GetKey(keyCode) {
        return this.#KeysDown[keyCode];
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

    GetMousePosition() {
        return new Vector(this.#MousePos.x, this.#MousePos.y);
    }
}

window.addEventListener("load", () => {
    Game.Loaded.Invoke();
});