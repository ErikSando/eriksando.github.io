/*

    A game engine made for rendering 2D worlds as pseudo 3D
    I added a lot of stuff that isn't used because why not

*/

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

const KeyCode = {
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
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    Home: "Home",
    Insert: "Insert",
    KeyA: "KeyA",
    KeyB: "KeyB",
    KeyC: "KeyC",
    KeyD: "KeyD",
    KeyE: "KeyE",
    KeyF: "KeyF",
    KeyG: "KeyG",
    KeyH: "KeyH",
    KeyI: "KeyI",
    KeyJ: "KeyJ",
    KeyK: "KeyK",
    KeyL: "KeyL",
    KeyM: "KeyM",
    KeyN: "KeyN",
    KeyO: "KeyO",
    KeyP: "KeyP",
    KeyQ: "KeyQ",
    KeyR: "KeyR",
    KeyS: "KeyS",
    KeyT: "KeyT",
    KeyU: "KeyU",
    KeyV: "KeyV",
    KeyW: "KeyW",
    KeyX: "KeyX",
    KeyY: "KeyY",
    KeyZ: "KeyZ",
    MetaLeft: "MetaLeft",
    MetaRight: "MetaRight",
    Minus: "Minus",
    NumLock: "NumLock",
    NumadDecimal: "NumadDecimal",
    Numpad0: "Numpad0",
    Numpad1: "Numpad1",
    Numpad2: "Numpad2",
    Numpad3: "Numpad3",
    Numpad4: "Numpad4",
    Numpad5: "Numpad5",
    Numpad6: "Numpad6",
    Numpad7: "Numpad7",
    Numpad8: "Numpad8",
    Numpad9: "Numpad9",
    NumpadAdd: "NumpadAdd",
    NumpadDivide: "NumpadDivide",
    NumpadMultiply: "NumpadMultiply",
    NumpadSubtract: "NumpadSubtract",
    PageDown: "PageDown",
    PageUp: "PageUp",
    Pause: "Pause",
    Period: "Period",
    PrintScreen: "PrintScreen",
    ScrollLock: "ScrollLock",
    SemiColon: "Semicolon",
    ShiftLeft: "ShiftLeft",
    ShiftRight: "ShiftRight",
    Slash: "Slash",
    Space: "Space",
    Tab: "Tab",
    Period: "Period"
}

const PI = Math.PI;
const TwoPI = 2 * PI;
const DegreesToRadians = PI / 180;
const RadiansToDegrees = 180 / PI;

const TileSize = 50;

const Clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const Lerp = (a, b, t) => a + t * (b - a);

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalised() {
        if (this.magnitude == 0) return new Vector(0, 0);

        return new Vector(this.x / this.magnitude, this.y / this.magnitude);
    }

    get inversed() {
        return new Vector(-this.x, -this.y);
    }
    
    get dot() {
        return this.x * v.x + this.y * v.y;
    }

    get cross() {
        return this.x * v.y - this.y * v.x;
    }

    get angle() {
        return -Math.atan2(-this.y, this.x);
    }

    multiplied(v) {
        if (v instanceof Vector) return new Vector(this.x * v.x, this.y * v.y);
        else return new Vector(this.x * v, this.y * v);
    }

    multiply(v) {
        if (v instanceof Vector) {
            this.x *= v.x;
            this.y *= v.y;

        } else {
            this.x *= v;
            this.x *= v;
        }
    }

    divided(v) {
        if (v instanceof Vector) return new Vector(this.x / v.x, this.y / v.y);
        else return new Vector(this.x / v, this.y / v);
    }

    divide(v) {
        if (v instanceof Vector) {
            this.x /= v.x;
            this.y /= v.y;

        } else {
            this.x /= v;
            this.x /= v;
        }
    }

    plus(v) {
        if (v instanceof Vector) return new Vector(this.x + v.x, this.y + v.y);
        else return new Vector(this.x + v, this.y + v);
    }

    add(v) {
        if (v instanceof Vector) {
            this.x += v.x;
            this.y += v.y;
        
        } else {
            this.x += v;
            this.y += v;
        }
    }

    minus(v) {
        if (v instanceof Vector) return new Vector(this.x - v.x, this.y - v.y);
        else return new Vector(this.x - v, this.y - v);
    }

    subtract(v) {
        if (v instanceof Vector) {
            this.x -= v.x;
            this.y -= v.y;
        
        } else {
            this.x -= v;
            this.y -= v;
        }
    }

    equals = (v) => this.x == v.x && this.y == v.y;
    angleTo = (v) => Math.acos(this.dot(v) * (this.magnitude * v.magnitude));
    lerp = (v, t) => this.add(v.minus(this).multiplied(t));
    copy = () => new Vector(this.x, this.y);
}

Vector.up = () => new Vector(0, -1);
Vector.down = () => new Vector(0, 1);
Vector.left = () => new Vector(-1, 0);
Vector.right = () => new Vector(1, 0);
Vector.one = () => new Vector(1, 1);
Vector.zero = () => new Vector(0, 0);

Vector.FromAngle = (angle) => new Vector(Math.cos(angle), Math.sin(angle));
Vector.DistanceBetween = (v1, v2) => Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
Vector.AngleBetween = (v1, v2) => Math.acos(v1.dot(v2) * (v1.magnitude * v2.magnitude));
Vector.Lerp = (v1, v2, t) => v1.plus(v2.minus(v1).multiplied(t));

class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    get normalised() {
        if (this.magnitude == 0) return new Vector3(0, 0, 0);

        return new Vector3(this.x / this.magnitude, this.y / this.magnitude, this.z / this.magnitude);
    }

    get inversed() {
        return new Vector3(-this.x, -this.y, -this.z);
    }

    multiplied(v) {
        if (v instanceof Vector3) return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
        else return new Vector3(this.x * v, this.y * v, this.z * v);
    }

    multiply(v) {
        if (v instanceof Vector3) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;

        } else {
            this.x *= v;
            this.y *= v;
            this.z *= v;
        }
    }

    divided(v) {
        if (v instanceof Vector3) return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
        else return new Vector3(this.x / v, this.y / v, this.z / v);
    }

    divide(v) {
        if (v instanceof Vector3) {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;

        } else {
            this.x /= v;
            this.y /= v;
            this.z /= z;
        }
    }

    plus(v) {
        if (v instanceof Vector3) return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
        else return new Vector3(this.x + v, this.y + v, this.z + v);
    }

    add(v) {
        if (v instanceof Vector3) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
        
        } else {
            this.x += v;
            this.y += v;
            this.z += v;
        }
    }

    minus(v) {
        if (v instanceof Vector3) return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
        else return new Vector3(this.x - v, this.y - v, this.z - v);
    }

    subtract(v) {
        if (v instanceof Vector3) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
        
        } else {
            this.x -= v;
            this.y -= v;
            this.z -= v;
        }
    }
}

Vector3.FromAngle = (angle) => new Vector3(Math.cos(angle), Math.sin(angle), 0);

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

    Invoke = (...args) => {
        for (let listener of this.#listeners) listener(...args);
    }
}

class Rectangle {
    orientation = 0;

    constructor(position, scale) {
        this.position = position;
        this.scale = scale;

        this.vertices = {
            topLeft: () => this.position,
            topRight: () => new Vector(this.position.x + this.scale.x, this.position.y),
            bottomLeft: () =>  new Vector(this.position.x, this.position.y + this.scale.y),
            bottomRight: () =>  this.position.plus(this.scale)
        }

        this.sides = {
            top: () => new Line(this.vertices.topLeft(), this.vertices.topRight()),
            right: () => new Line(this.vertices.topRight(), this.vertices.bottomRight()),
            bottom: () => new Line(this.vertices.bottomRight(), this.vertices.bottomLeft()),
            left: () => new Line(this.vertices.bottomLeft(), this.vertices.topLeft())
        }
    }

    get top() {
        return this.position.y;
    }

    get bottom() {
        return this.position.y + this.scale.y;
    }

    get left() {
        return this.position.x;
    }

    get right() {
        return this.position.x + this.scale.x;
    }

    get center() {
        return new Vector(this.position.x + this.scale.x / 2, this.position.y + this.scale.y / 2);
    }

    GetVertices() {
        return [this.vertices.topLeft(), this.vertices.topRight(), this.vertices.bottomRight(), this.vertices.bottomLeft()];
    }

    GetSides() {
        return [this.sides.top(), this.sides.right(), this.sides.bottom(), this.sides.left()];
    }
}

class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

class UIObject {
    visible = true;
    bgColour = "rgb(150, 150, 150)";
    bgOpacity = 1;
    outlineColour = "rgb(80, 80, 80)";
    outlineThickness = 1;
    outlineOpacity = 1;

    constructor(position = Vector.zero(), scale = Vector.zero(), layer = 1) {
        this.position = position;
        this.scale = scale;
        this.layer = layer;
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
        ctx.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);
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

    TouchDown = new _Event();
    TouchUp = new _Event();

    TouchEnter = new _Event();
    TouchExit = new _Event();

    TouchStart = new _Event();
    TouchEnd = new _Event();

    constructor(position, scale, layer = 1) {
        super(position, scale, layer);
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

    constructor(position, scale, text = "", layer = 1) {
        super(position, scale, layer);

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
        let textY = this.position.y + this.scale.y / 2 + this.textSize / 15;

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
        ctx.strokeText(this.text, textX, textY, this.scale.x);

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

    constructor(position, scale, text = "", layer = 1) {
        super(position, scale, layer);

        this.text = text;
    }

    Draw(ctx) {
        if (!this.visible) return;

        super.Draw(ctx);

        ctx.font = this.textSize + "px " + this.font;

        let textW = Math.min(this.scale.x, ctx.measureText(this.text).width);
        let textX = this.position.x + this.scale.x / 2 - textW / 2;
        
        ctx.textBaseline = "middle";
        let textY = this.position.y + this.scale.y / 2 + this.textSize / 15;

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
        ctx.strokeText(this.text, textX, textY, this.scale.x);

        ctx.globalAlpha = this.textOpacity;
        ctx.fillStyle = this.textColour;
        ctx.fillText(this.text, textX, textY, this.scale.x);
    }
}

class ImageLabel extends UIObject {
    imageOpacity = 1;

    constructor(position, scale, image = new Image(), layer = 1) {
        super(position, scale, layer);

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

    constructor(position, scale, image = new Image(), layer = 1) {
        super(position, scale, layer);

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
    GameObjects = [];
    #uiLayers = {}

    //GameObjectsAdded = new _Event();      -> invokes with an array of all the game objects added
    //GameObjectsRemoved = new _Event();    -> invokes with an array of all the game objects removed
    //GameObjectsChanged = new _Event();    -> invokes with no arguments, just an indication of when a game object is added/removed.

    constructor(GameObjects = [], UIObjects = [], TileMap = []) {
        this.GameObjects = GameObjects;

        for (let uiObject of UIObjects) {
            if (!this.#uiLayers[uiObject.layer]) this.#uiLayers[uiObject.layer] = [];

            this.#uiLayers[uiObject.layer].push(uiObject);
        }

        this.TileMap = TileMap;
    }

    Add(...gameObjects) {
        let added = false;

        for (let gameObject of gameObjects) {
            if (!(gameObject instanceof GameObject)) continue;

            this.GameObjects.push(gameObject);

            added = true;
        }

        if (!added && gameObjects.length) console.error("Could not add game object/s.");
    }

    Remove(...gameObjects) {
        let removed = false;

        for (let gameObject of gameObjects) {
            let index = this.GameObjects.indexOf(gameObject);

            if (!this.GameObjects[index]) continue;

            this.GameObjects[index].Destroying.Invoke();
            this.GameObjects.splice(index, 1);

            removed = true;
        }

        if (!removed && gameObjects.length) console.error("Could not find game object to remove.");
    }

    AddUI(...uiObjects) {
        for (let uiObject of uiObjects) {
            if (!(uiObject instanceof UIObject)) {
                console.error("Specified UI object is not a UIObject, cannot add to scene.");
                continue;
            }

            if (!this.#uiLayers[uiObject.layer]) this.#uiLayers[uiObject.layer] = [];
            this.#uiLayers[uiObject.layer].push(uiObject);
        }
    }

    RemoveUI(...uiObjects) {
        let removed = false;

        for (let uiObject of uiObjects) {
            let index = this.#uiLayers[uiObject.layer].indexOf(uiObject);
            let layer = uiObject.layer;

            if (!this.#uiLayers[layer][index]) continue;
            removed = true;

            this.#uiLayers[layer].splice(index, 1);

            if (!this.#uiLayers[layer].length) delete this.#uiLayers[layer];
        }

        if (!removed) console.error("Could not find game object to remove.");
    }

    ClearUI() {
        this.#uiLayers = {}
    }

    ReplaceUI(...uiObjects) {
        this.ClearUI();

        for (let uiObject of uiObjects) this.AddUI(uiObject);
    }

    ReplaceUIArray(uiObjects) {
        this.ClearUI();

        for (let uiObject of uiObjects) this.AddUI(uiObject);
    }

    AddArray(gameObjects) {
        for (let gameObject of gameObjects) this.Add(gameObject);
    }

    RemoveArray(gameObjects) {
        for (let gameObject of gameObjects) this.Remove(gameObject);
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

    get UIObjects() {
        let uiObjects = [];

        for (let layer in this.#uiLayers) {
            for (let uiObject of this.#uiLayers[layer]) uiObjects.push(uiObject);
        }

        return uiObjects;
    }
}

function LoadTilemap(tileMap, tileSize) {
    let gameObjects = [];

    for (let i = 0; i < tileMap.length; i++) {
        for (let j = 0; j < tileMap.length; j++) {
            let tile = tileMap[i][j];

            if (tile) {
                let hColour, vColour;
                
                switch (tile) {
                    // case 1:
                    //     hColour = "rgb(180, 0, 0)";
                    //     vColour = "rgb(150, 0, 0)";
                    // break;

                    case 2:
                        hColour = "rgb(0, 200, 0)";
                        vColour = "rgb(0, 180, 0)";
                    break;
                }

                gameObjects.push(new GameObject(new Vector(j * tileSize, i * tileSize), new Vector(tileSize, tileSize), hColour, vColour));
            }
        }
    }

    return new Scene(gameObjects, [], tileMap);
}

class Ray {
    constructor(position, direction) {
        this.position = position;

        if (direction instanceof Vector) {
            this.direction = direction;
            this.angle = direction.angle;
        
        } else {
            this.direction = Vector.FromAngle(direction);
            this.angle = direction;
        }
    }
}

function HorizontalRaycast(start, angle, maxDistance = Infinity) {
    if (angle instanceof Vector) angle = angle.angle;

    let yStep = TileSize;
    let firstY = Math.floor(start.y / TileSize) * TileSize - 0.01;

    if (angle > 0 && angle < PI) {
        firstY += TileSize + 0.01;
    }
    else if (angle > PI && angle < TwoPI) {
        yStep = -TileSize;
    }
    else {
        return {
            position: null,
            distance: Infinity
        }
    }

    let xStep = yStep / Math.tan(angle);
    let firstX = start.x + (firstY - start.y) / Math.tan(angle);

    let tileMap = Game.scene.TileMap;

    for (
        let y = firstY, x = firstX;
        y >= 0 && y <= tileMap.length * TileSize && x >= 0 && x <= tileMap[0].length * TileSize;
        y += yStep, x += xStep)
    {
        let yIndex = Math.floor(y / TileSize);
        let xIndex = Math.floor(x / TileSize);

        let tile = tileMap[yIndex][xIndex];

        if (tile) {
            let pos = new Vector(x, y);

            return {
                position: pos,
                distance: Vector.DistanceBetween(start, pos),
                wallType: "h"
            }
        }
    }

    return {
        position: null,
        distance: Infinity
    }
}

function VerticalRaycast(start, angle, maxDistance = Infinity) {
    if (angle instanceof Vector) angle = angle.angle;
    
    let xStep = TileSize;
    let firstX = Math.floor(start.x / TileSize) * TileSize - 0.01;

    if ((angle > 3 * PI / 2 && angle <= TwoPI) || (angle >= 0 && angle < PI / 2)) {
        firstX += TileSize + 0.01;
    }
    else if (angle > PI / 2 && angle < 3 * PI / 2) {
        xStep = -TileSize;
    }
    else {
        return {
            position: null,
            distance: Infinity
        }
    }

    let yStep = xStep * Math.tan(angle);
    let firstY = start.y + (firstX - start.x) * Math.tan(angle);

    let tileMap = Game.scene.TileMap;

    for (let y = firstY, x = firstX;
        y >= 0 && y <= tileMap.length * TileSize && x >= 0 && x <= tileMap[0].length * TileSize;
        y += yStep, x += xStep)
    {
        let yIndex = Math.floor(y / TileSize);
        let xIndex = Math.floor(x / TileSize);

        let tile = tileMap[yIndex][xIndex];

        if (tile) {
            let pos = new Vector(x, y);

            return {
                position: pos,
                distance: Vector.DistanceBetween(start, pos),
                wallType: "v"
            }
        }
    }

    return {
        position: null,
        distance: Infinity
    }
}

function Raycast(start, angle, maxDistance = Infinity) {
    if (angle instanceof Vector) angle = angle.angle;
    
    let hitH = HorizontalRaycast(start, angle, maxDistance);
    let hitV = VerticalRaycast(start, angle, maxDistance);

    if (hitH.distance == Infinity && hitV.distance == Infinity) return null;

    return hitH.distance < hitV.distance ? hitH : hitV;
}

class Camera {
    orientation = 0;

    direction = {
        forward: () => this.#GetDirection(0),
        down: () => this.#GetDirection(180),
        left: () => this.#GetDirection(270),
        right: () => this.#GetDirection(90)
    }
    
    constructor(position = new Vector3(0, 0, 20), FOV = 60) {
        this.position = position;
        this.FOV = FOV * DegreesToRadians;
    }

    #GetDirection = (offset) => Vector3.FromAngle(this.orientation + offset * DegreesToRadians);
}

class Renderer {
    lightAngles = [Vector.down().angle, Vector.left().angle]; // the bottom and left sides of game objects will be lighter
    //horizontalColour = "rgb(180, 180, 180)";
    //verticalColour = "rgb(190, 190, 190)";
    horizontalColour = "rgb(0, 180, 0)";
    verticalColour = "rgb(0, 200, 0)";
    resolution = 1;
    lineHeightMultiplier = 80;

    Settings = {
        //BackgroundColour: "rgb(100, 200, 250)",
        //GroundColour: "rgb(100, 100, 100)"
        BackgroundColour: "rgb(255, 255, 255)",
        GroundColour: "rgb(0, 0, 255)"
    }

    Render(ctx, camera, viewport) {
        //ctx.lineWidth = 2;

        //let mult = 1.4;
        //let offset = { x: 500, y: 120 }
        
        // ctx.strokeStyle = "grey";

        // for (let i = 0; i < worldData.length; i++) {
        //     for (let j = 0; j < worldData[i].length; j++) {
        //         if (worldData[i][j]) {
        //             ctx.fillStyle = "white";
        //             ctx.fillRect(j * TileSize * mult + offset.x, i * TileSize * mult + offset.y, TileSize * mult, TileSize * mult);
        //         }
        //         else {
        //             ctx.fillStyle = "black";
        //             ctx.fillRect(j * TileSize * mult + offset.x, i * TileSize * mult + offset.y, TileSize * mult, TileSize * mult);
        //         }

        //         ctx.strokeRect(j * TileSize * mult + offset.x, i * TileSize * mult + offset.y, TileSize * mult, TileSize * mult);
        //     }
        // }
        
        //let camPos = new Vector(camera.position.x * mult + offset.x, camera.position.y * mult + offset.y);

        ctx.fillStyle = this.Settings.BackgroundColour;
        ctx.fillRect(0, 0, viewport.scale.x, viewport.scale.y);

        ctx.fillStyle = this.Settings.GroundColour;
        ctx.fillRect(0, viewport.scale.y / 2, viewport.scale.x, viewport.scale.y / 2);

        let rays = [];
        let column = 0;
        
        for (let angle = camera.orientation - camera.FOV / 2; angle <= camera.orientation + camera.FOV / 2; angle += camera.FOV / viewport.scale.x * this.resolution) {
            let formattedAngle = angle;
            
            while (formattedAngle > TwoPI) formattedAngle -= TwoPI;
            while (formattedAngle < 0) formattedAngle += TwoPI;
            
            let ray = new Ray(camera.position, formattedAngle);
            ray.column = column;

            column++;

            rays.push(ray);
        }

        for (let ray of rays) {
            let intersection = Raycast(camera.position, ray.angle, Infinity, ctx);

            if (intersection) {
                let angle = camera.orientation - ray.angle;

                let colour = intersection.wallType == "h" ? this.horizontalColour : this.verticalColour;

                //dividing by the cosine causes warping on the outside of the camera, more noticable with high field of view
                let lineHeight = viewport.scale.y / intersection.distance / camera.FOV / Math.cos(angle) * this.lineHeightMultiplier;

                let center = viewport.scale.y / 2 + camera.position.z / intersection.distance;
                let top = center - lineHeight / 2;
                let bottom = center + lineHeight / 2;

                ctx.strokeStyle = colour;
                ctx.lineWidth = this.resolution + 1;
                ctx.beginPath();
                ctx.moveTo(ray.column * this.resolution, top);
                ctx.lineTo(ray.column * this.resolution, bottom);
                ctx.stroke();

                // ctx.lineWidth = 1;
                // ctx.strokeStyle = "red";
                // ctx.beginPath()
                // ctx.moveTo(camPos.x, camPos.y);
                // ctx.lineTo(intersection.position.x * mult + offset.x, intersection.position.y * mult + offset.y);
                // ctx.stroke();
           }

            // let dotSize = 4 * 2;
            
            // ctx.fillStyle = "yellow";
            // ctx.fillRect(camPos.x - dotSize / 2, camPos.y - dotSize / 2, dotSize, dotSize);

            // let pointerLength = 20;
            // let pointerEnd = camPos.plus(Vector.FromAngle(camera.orientation).multiplied(pointerLength));
    
            // ctx.lineWidth = 2;
            // ctx.strokeStyle = "yellow";
            // ctx.beginPath();
            // ctx.moveTo(camPos.x, camPos.y);
            // ctx.lineTo(pointerEnd.x, pointerEnd.y);
            // ctx.stroke();
        }
    }
}

const Game = new class {
    canvas;
    ctx;

    #lastUpdate;
    #lastFPS;
    #fpses = [];
    FPS = 0;

    UpdateGroup = [];

    Loaded = new _Event();
    CanvasChanged = new _Event();
    Started = new _Event();
    PreUpdate = new _Event();
    PostUpdate = new _Event();
    PreDraw = new _Event();
    PostDraw = new _Event();

    scene = new Scene();
    renderer = new Renderer();
    camera = new Camera();

    Settings = {
        NativeWidth: 1920,
        NativeHeight: 1080,
        ImageSmoothing: false,
        Gravity: 50
    }

    #ResizeCanvas = () => {
        let aspectRatio = this.Settings.NativeWidth / this.Settings.NativeHeight;
        let dominantAxis = (window.innerWidth <= window.innerHeight * aspectRatio) ? "x" : "y";

        if (dominantAxis == "x") {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerWidth / aspectRatio;

        } else {
            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerHeight * aspectRatio;
        }

        this.ctx.imageSmoothingEnabled = this.Settings.ImageSmoothing;
    }

    CreateCanvas() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.CanvasChanged.Invoke();

        document.body.appendChild(this.canvas);
    }

    SetCanvas(canvas) {
        try {
            this.canvas = canvas;
            this.ctx = this.canvas.getContext("2d");

            this.CanvasChanged.Invoke();

        } catch (e) {
            console.error("Could not set canvas.", e);
        }
    }

    GetCanvas() {
        return this.canvas;
    }

    Start = () => {
        window.addEventListener("resize", this.#ResizeCanvas);
        this.#ResizeCanvas();

        requestAnimationFrame(this.#Start);
    }

    #Start = (timestamp) => {
        this.#lastUpdate = timestamp;
        this.#lastFPS = timestamp;

        this.Started.Invoke();

        requestAnimationFrame(this.#Update);
    }

    #Update = (timestamp) => {
        const delta = (timestamp - this.#lastUpdate) / 1000;
        this.#lastUpdate = timestamp;

        if (!delta || isNaN(delta) || delta < 0 || delta > 0.1) {
            this.#Draw();
            requestAnimationFrame(this.#Update);
            return;
        }

        this.PreUpdate.Invoke(delta);

        let fps = 1 / delta;
        this.#fpses.push(fps);

        if (timestamp - this.#lastFPS > 1000) {
            this.#lastFPS = timestamp;

            let totalFPS = 0;
            for (let fps of this.#fpses) totalFPS += fps;

            this.FPS = totalFPS / this.#fpses.length;
            this.#fpses = [];
        }

        for (let member of this.UpdateGroup) if (member.Update) member.Update(delta);
        //for (let gameObject of this.scene.GameObjects) gameObject.Update(delta);

        Input.Update();

        this.PostUpdate.Invoke(delta);

        this.#Draw();

        requestAnimationFrame(this.#Update);
    }

    #Draw = () => {
        let scale = this.canvas.width / this.Settings.NativeWidth;
        this.ctx.setTransform(scale, 0, 0, scale, 0, 0);

        this.ctx.globalAlpha = 1;

        this.ctx.fillStyle = this.Settings.BackgroundColour;
        this.ctx.fillRect(0, 0, this.Settings.NativeWidth, this.Settings.NativeHeight);

        this.ctx.fillStyle = this.Settings.GroundColour;
        this.ctx.fillRect(0, this.Settings.NativeHeight / 2, this.Settings.NativeWidth, this.Settings.NativeHeight / 2);

        this.PreDraw.Invoke(this.ctx);

        this.renderer.Render(this.ctx, this.camera, new Rectangle(new Vector(0, 0), new Vector(this.Settings.NativeWidth, this.Settings.NativeHeight)));

        for (let uiObject of this.scene.UIObjects) if (uiObject.visible) uiObject.Draw(this.ctx);

        this.PostDraw.Invoke(this.ctx);
    }
}

class UpdatesEachFrame {
    constructor() {
        this.AddToGame();
        this.active = true;
    }

    AddToGame() {
        if (Game.UpdateGroup.includes(this)) return console.error("Already a part of game, can not add.");

        Game.UpdateGroup.push(this);
        this.active = true;
    }

    RemoveFromGame() {
        this.active = false;
        
        let index = Game.UpdateGroup.indexOf(this);
        if (index < 0) return console.error("Not apart of game, can not remove.");
        
        Game.UpdateGroup.splice(index, 1);
    }
}

class GameObject {
    direction = {
        forward: () => this.#GetDirection(270),
        down: () => this.#GetDirection(90),
        left: () => this.#GetDirection(180),
        right: () => this.#GetDirection(0)
    }

    constructor(position, scale, horizontalColour, verticalColour) {
        this.position = position;
        this.scale = scale;

        this.horizontalColour = horizontalColour || "rgb(0, 200, 0)";
        this.verticalColour = verticalColour || "rgb(0, 180, 0)";

        this.vertices = {
            topLeft: () => this.position,
            topRight: () => new Vector(this.position.x + this.scale.x, this.position.y),
            bottomLeft: () =>  new Vector(this.position.x, this.position.y + this.scale.y),
            bottomRight: () =>  this.position.plus(this.scale)
        }

        this.sides = {
            top: () => new Line(this.vertices.topLeft(), this.vertices.topRight()),
            right: () => new Line(this.vertices.topRight(), this.vertices.bottomRight()),
            bottom: () => new Line(this.vertices.bottomRight(), this.vertices.bottomLeft()),
            left: () => new Line(this.vertices.bottomLeft(), this.vertices.topLeft())
        }
    }

    #GetDirection = (offset) => Vector.FromAngle(this.orientation + offset * DegreesToRadians);
    GetVertices = () => [this.vertices.topLeft(), this.vertices.topRight(), this.vertices.bottomRight(), this.vertices.bottomLeft()];
    GetSides = () => [this.sides.top(), this.sides.right(), this.sides.bottom(), this.sides.left()];
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
    #KeyPressed = {}
    #KeyReleased = {}

    KeyDown = new _Event();
    KeyUp = new _Event();

    constructor() {
        for (let keyCode in KeyCode) {
            this.#KeysDown[KeyCode[keyCode]] = false;
            this.#KeyPressed[KeyCode[keyCode]] = false;
            this.#KeyReleased[KeyCode[keyCode]] = false;
        }

        window.addEventListener("blur", () => {
            for (let keyCode in this.#KeysDown) this.#KeysDown[keyCode] = false;
            for (let keyCode in this.#KeyPressed) this.#KeyPressed[keyCode] = false;
            for (let keyCode in this.#KeyReleased) this.#KeyReleased[keyCode] = false;
        });

        document.addEventListener("keydown", (e) => {
            if (!this.#KeysDown[e.code]) this.#KeyPressed[e.code] = true;

            this.#KeysDown[e.code] = true;
            this.KeyDown.Invoke(e.code, e.shiftKey, e.ctrlKey, e.altKey);
        });

        document.addEventListener("keyup", (e) => {
            if (this.#KeysDown[e.code]) this.#KeyReleased[e.code] = true;

            this.#KeysDown[e.code] = false;
            this.KeyUp.Invoke(e.code, e.shiftKey, e.ctrlKey, e.altKey);
        });

        Game.Started.AddListener(() => {
            document.addEventListener("mousemove", this.#MouseMove);
        });
    }

    Update() {
        for (let keyCode in this.#KeyPressed) this.#KeyPressed[keyCode] = false;
        for (let keyCode in this.#KeyReleased) this.#KeyReleased[keyCode] = false;
    }

    #MouseMove = (e) => {
        let canvas = Game.canvas;
        let rect = canvas.getBoundingClientRect();
        let scale = Game.Settings.NativeWidth / canvas.width;

        let previousPosition = this.GetMousePosition();

        this.#MousePos = new Vector((e.clientX - rect.x), (e.clientY - rect.y)).multiplied(scale);

        let info = {
            position: this.GetMousePosition(),
            previousPosition: previousPosition,
            movement: new Vector(e.movementX, e.movementY)
        }

        this.MouseMove.Invoke(info, e.button, e.shiftKey, e.ctrlKey, e.altKey);
    }

    GetKey = (keyCode) => this.#KeysDown[keyCode];
    GetKeyDown = (keyCode) => this.#KeyPressed[keyCode];
    GetKeyUp = (keyCode) => this.#KeyReleased[keyCode];

    GetAxisRaw(axis) {
        let result = {
            vertical: 0,
            horizontal: 0
        }

        if (this.GetKey(KeyCode.KeyW)) result.vertical += 1;
        if (this.GetKey(KeyCode.KeyA)) result.horizontal -= 1;
        if (this.GetKey(KeyCode.KeyS)) result.vertical -= 1;
        if (this.GetKey(KeyCode.KeyD)) result.horizontal += 1;

        return result[axis.toLowerCase()];
    }

    GetMousePosition = () => this.#MousePos.copy();
}

window.addEventListener("contextmenu", e => e.preventDefault());
window.addEventListener("load", Game.Loaded.Invoke);