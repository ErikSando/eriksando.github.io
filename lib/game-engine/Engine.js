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

const BackgroundFit = { // for the background image
    Tile: 1,
    Fill: 2,
    None: 3
}

const CanvasResizeType = { // Not finished, only aspect ratio works good
    AspectRatio: 1,
    Fullscreen: 2,
    MatchWidth: 3,
    MatchHeight: 4,
    None: 5
}

const TweenType = { // idk what im doing just making stuff up as i go along
    Linear: "x",
    Sine: "Math.sin(x)",
    Cosine: "Math.cos(x)",
    Quad: "Math.pow(x, 2)",
    Cubic: "Math.pow(x, 3)",
    Quart: "Math.pow(x, 4)",
    Quint: "Math.pow(x, 5)"
}

const TweenDirection = {
    In: 1,
    Out: 1
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

const Enum = { // For quality of life, typing "Enum." in an IDE will show all the Enums so you don't need to search the source code for what you need
    TextAlignX: TextAlignX,
    TextAlignY: TextAlignY,
    BackgroundFit: BackgroundFit,
    CanvasResizeType: CanvasResizeType,
    TweenDirection: TweenDirection,
    TweenType: TweenType,
    KeyCode: KeyCode,
}

const DegreesToRadians = Math.PI / 180;
const RadiansToDegrees = 180 / Math.PI;
const TwoPI = 2 * Math.PI;

const Angle90 = 90 * DegreesToRadians;
const Angle180 = Math.PI;
const Angle270 = 270 * DegreesToRadians;

const Clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const Lerp = (a, b, t) => a + t * (b - a);

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalised() {
        return new Vector(this.x / this.magnitude, this.y / this.magnitude);
    }

    get inversed() {
        return new Vector(-this.x, -this.y);
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
        if (v instanceof Vector) return new Vector(this.x +v.x, this.y + v.y);
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

    get dot() {
        return this.x * v.x + this.y * v.y;
    }

    get cross() {
        return this.x * v.y - this.y * v.x;
    }

    get angle() {
        return -Math.atan2(-this.y, this.x);
    }

    equals = (v) => this.x === v.x && this.y === v.y;
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

class CollisionGroup {
    constructor(name, cantCollide = []) {
        this.name = name;
        this.cantCollide = cantCollide;
    }
}

class Polygon {
    constructor(vertices, edges) {
        this.vertices = vertices;
        this.edges = edges;
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

    get width() {
        return this.scale.x;
    }

    get height() {
        return this.scale.y;
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

class Circle {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
    }
}

class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

function Wait(milliseconds) {
    return new Promise(resolve => { setTimeout(resolve, milliseconds) });
}

function RectIntersection(r1, r2) {
    if (r1.position.x + r1.scale.x <= r2.position.x ||
        r1.position.x >= r2.position.x + r2.scale.x ||
        r1.position.y + r1.scale.y <= r2.position.y ||
        r1.position.y >= r2.position.y + r2.scale.y) return false;

    return true;
}

function CircleIntersection(c1, c2) {
    let distance = c1.position.minus(c2.position).magnitude;

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

    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) return false;

    denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    if (denominator === 0) return false;

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
    if (r.position.x > p.x || r.position.x + r.scale.x < p.x || r.position.y > p.y || r.position.y + r.scale.y < p.y) return false;

    return true;
}

function RectAndLineIntersection(r, l) {
    let rSides = [
        new Line(r.vertices.topLeft(), r.vertices.topRight()),
        new Line(r.vertices.topRight(), r.vertices.bottomRight()),
        new Line(r.vertices.bottomRight(), r.vertices.bottomLeft()),
        new Line(r.vertices.bottomLeft(), r.vertices.topLeft())
    ]

    let intersection;
    let closestDistance;

    for (let side of rSides) {
        let _intersection = LineIntersection(side, l);

        if (_intersection) {
            let distance = Vector.DistanceBetween(_intersection, l.start);

            if (!closestDistance || closestDistance > distance) {
                closestDistance = distance;
                intersection = _intersection;
            }
        }
    }

    // might need this
    // if (!intersection) {
    //     if (RectAndPointIntersection(r, l.start) || RectAndPointIntersection(r, l.end)) return true;
    // }

    return intersection;
}

function GetRotatedRectVertex(center, vertex, orientation) {
    let angle = (orientation % 360) * DegreesToRadians;

    let distance = Vector.DistanceBetween(center, vertex);
    let distanceX = vertex.x - center.x;
    let distanceY = vertex.y - center.y;

    let relativeAngle = Math.atan2(distanceY, distanceX);

    return new Vector(
        center.x + distance * Math.cos(relativeAngle + angle),
        center.y + distance * Math.sin(relativeAngle + angle)
    );
}

function GetRotatedRectVertices(r) {
    let center = r.center;

    let topLeft = GetRotatedRectVertex(center, r.vertices.topLeft(), r.orientation);
    let topRight = GetRotatedRectVertex(center, r.vertices.topRight(), r.orientation);
    let bottomLeft = GetRotatedRectVertex(center, r.vertices.bottomLeft(), r.orientation);
    let bottomRight = GetRotatedRectVertex(center, r.vertices.bottomRight(), r.orientation);

    return {
        topRight: topRight,
        bottomRight: bottomRight,
        bottomLeft: bottomLeft,
        topLeft: topLeft
    }
}

// function PolygonCollision(polygon1, polygon2) {
//     //console.log(polygon1, polygon2);

//     let perpendicularStack = [];
//     let min1;
//     let max1;
//     let min2;
//     let max2;
//     let dot;

//     for (let i = 0; i < polygon1.edges.length; i++) {
//         let perpendicularLine = new Vector(-polygon1.edges[i].y, polygon1.edges[i].x);
//         perpendicularStack.push(perpendicularLine);
//     }

//     for (let i = 0; i < polygon2.edges.length; i++) {
//         let perpendicularLine = new Vector(-polygon2.edges[i].y, polygon2.edges[i].x);
//         perpendicularStack.push(perpendicularLine);
//     }

//     console.log(perpendicularStack, polygon1, polygon2);

//     for (let i = 0; i < perpendicularStack.length; i++) {
//         for (let j = 0; j < polygon1.vertices.length; j++) {
//             dot = polygon1.vertices[j].dot(perpendicularStack[i]);
        
//             //console.log(dot);

//             if (dot < min1 || !min1) min1 = dot;
//             if (dot > max1 || !max1) max1 = dot;
//         }

//         for (let j = 0; j < polygon2.vertices.length; j++) {
//             dot = polygon2.vertices[j].dot(perpendicularStack[i]);
        
//             //console.log(dot);

//             if (dot < min2 || !min2) min2 = dot;
//             if (dot > max2 || !max2) max2 = dot;
//         }

//         //console.log(min1, max1, min2, max2);

//         if ((min1 < max2 && min1 > min2) || (min2 < max1 && min2 > min1)) continue;
//         else return false;
//     }

//     return true;
// }

// function RotatedRectIntersection(r1, r2) {
//     let vertices1 = GetRotatedRectVertices(r1);
//     let vertices2 = GetRotatedRectVertices(r2);

//     let edges1 = [
//         vertices1.bottomRight.minus(vertices1.topRight),
//         vertices1.bottomLeft.minus(vertices1.bottomRight),
//         vertices1.topLeft.minus(vertices1.bottomLeft),
//         vertices1.topRight.minus(vertices1.topLeft)
//     ]

//     let edges2 = [
//         vertices2.bottomRight.minus(vertices2.topRight),
//         vertices2.bottomLeft.minus(vertices2.bottomRight),
//         vertices2.topLeft.minus(vertices2.bottomLeft),
//         vertices2.topRight.minus(vertices2.topLeft)
//     ]

//     let polygon1 = new Polygon(vertices1, edges1);
//     let polygon2 = new Polygon(vertices2, edges2);

//     return PolygonCollision(polygon1, polygon2);
// }

function RectAndTriangleIntersection(r, t) {
    if (RectAndPointIntersection(r, t.a) || RectAndPointIntersection(r, t.b) || RectAndPointIntersection(r, t.c)) return true;

    let tSides = [
        new Line(t.a, t.b),
        new Line(t.b, t.c),
        new Line(t.c, t.a)
    ]

    for (let side of tSides) {
        let intersection = RectAndLineIntersection(r, side);
        if (intersection) return intersection;
    }

    return false;
}

function SetData(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
}

const GetData = (key, _default) => JSON.parse(window.localStorage.getItem(key)) || _default;

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

class AnimationImage {
    image = new Image();
    
    constructor(image, offset = Vector.zero(), scale) {
        if (image instanceof Image) this.image = image;
        else this.image.src = image;

        this.offset = offset;

        if (!scale) {
            if (this.image.width && this.image.height) {
                this.scale = new Vector(this.image.width, this.image.height);

            } else {
                this.scale = Vector.zero();

                this.image.onload = () => {
                    this.scale = new Vector(this.image.width, this.image.height);
                }
            }

            return;
        }

        this.scale = scale;
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

    Invoke = (...args) => {
        for (let listener of this.#listeners) listener(...args);
    }
}

class _Animation {
    #frames = [];
    #frame = 0;

    // make these do something
    centered = false;
    matchWidth = true;
    matchHeight = true;

    #totalDelta = 0;

    Ended = new _Event();

    constructor(frames = [], fps = 6, flipX = false, flipY = false) {
        for (let i = 0; i < frames.length; i++) {
            if (frames[i] instanceof Image) {
                frames[i] = new AnimationImage(frames[i]);
            }
        }
        
        this.#frames = frames;
        this.fps = fps;
        this.flipX = flipX;
        this.flipY = flipY;
    }

    get frame() {
        return this.#frame;
    }

    Update(delta) {
        this.#totalDelta += delta;

        if (this.#totalDelta > 1 / this.fps) {
            if (this.#frame >= this.#frames.length - 1) {
                this.Ended.Invoke();
                this.#frame = 0;
            
            } else this.#frame++;

            this.#totalDelta -= 1 / this.fps;
        }
    }

    Reset() {
        this.#frame = 0;
    }

    GetImage() {
        return this.#frames[this.#frame];
    }

    Copy() {
        return new _Animation(this.#frames, this.fps, this.flipX, this.flipY);
    }
}

function LoadSpritesheet(image, tileSize, columns = 1, rows = 1, start = Vector.zero(), tiles) {
    if (!(image instanceof Image)) return console.error("Spritesheet must be an image.");
    if (!tileSize && columns === 1 && rows === 1) tileSize = new Vector(image.width, image.height);
    if (!(tileSize instanceof Vector)) return console.error("Tile size must be a vector.");

    let images = new Array(tiles || columns * rows);
    let tile = 1;

    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let index = x + y * columns;

            let _image = new AnimationImage(image, new Vector(start.x + x * tileSize.x, start.y + y * tileSize.y), tileSize);

            images[index] = _image;

            tile++;
            if (tiles && tile > tiles) break;
        }
    }

    return images;
}

class AnimationInfo {
    constructor(fps = 6, flipX = false, flipY = false) {
        this.fps = fps;
        this.flipX = flipX;
        this.flipY = flipY;
    }
}

function LoadSpritesheetAnimation(image, animInfo = AnimationInfo(), tileSize, columns = 1, rows = 1, start = Vector.zero(), tiles) {
    if (!(image instanceof Image)) return console.error("Spritesheet must be an image.");
    if (!tileSize && columns === 1 && rows === 1) tileSize = new Vector(image.width, image.height);
    if (!(tileSize instanceof Vector)) return console.error("Tile size must be a vector.");

    let images = new Array(tiles || columns * rows);
    let tile = 1;

    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            let index = x + y * columns;

            let _image = new AnimationImage(image, new Vector(start.x + x * tileSize.x, start.y + y * tileSize.y), tileSize);

            images[index] = _image;

            tile++;
            if (tiles && tile > tiles) break;
        }
    }

    return new _Animation(images, animInfo.fps, animInfo.flipX, animInfo.flipY);
}

function fillRect(ctx, rect, colour = "red", opacity = 1) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = colour;
    ctx.fillRect(rect.position.x, rect.position.y, rect.scale.x, rect.scale.y);
}

function strokeRect(ctx, rect, colour = "red", opacity = 1, thickness = 1) {
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = colour;
    ctx.lineWidth = thickness;
    ctx.strokeRect(rect.position.x, rect.position.y, rect.scale.x, rect.scale.y);
}

function fillCircle(ctx, circle, colour = "red", opacity = 1) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(circle.position.x, circle.position.y, circle.radius, 0, TwoPI);
    ctx.fill();
}

function strokeCircle(ctx, circle, colour = "red", opacity = 1, thickness = 1) {
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = colour;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.arc(circle.position.x, circle.position.y, circle.radius, 0, TwoPI);
    ctx.stroke();
}

function fillTriangle(ctx, triangle, colour = "red", opacity = 1) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.moveTo(triangle.a.x, triangle.a.y);
    ctx.lineTo(triangle.b.x, triangle.b.y);
    ctx.lineTo(triangle.c.x, triangle.c.y);
    ctx.fill();
}

function strokeTriangle(ctx, triangle, colour = "red", opacity = 1, thickness = 1) {
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = colour;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(triangle.a.x, triangle.a.y);
    ctx.lineTo(triangle.b.x, triangle.b.y);
    ctx.lineTo(triangle.c.x, triangle.c.y);
    ctx.stroke();
}

function fillPolygon(ctx, polygon, colour = "red", opacity = 1) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);

    for (let i = 1; i < polygon.vertices.length; i++) {
        ctx.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
    }

    ctx.fill();
}

function strokePolygon(ctx, polygon, colour = "red", opacity = 1, thickness = 1) {
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = colour;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);

    for (let i = 1; i < polygon.vertices.length; i++) {
        ctx.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
    }
    
    ctx.stroke();
}

function fillArcSegment(ctx, position, radius = 100, startAngle = 0, endAngle = 180, counterclockwise = false, colour = "red", opacity = 1) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = colour;
    ctx.arc(position.x, position.y, radius, startAngle * DegreesToRadians, endAngle * DegreesToRadians, counterclockwise);
    ctx.fill();
}

function strokeArc(ctx, position, radius = 100, startAngle = 0, endAngle = 180, counterclockwise = false, colour = "red", opacity = 1, thickness = 1) {
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = colour;
    ctx.lineWidth = thickness;
    ctx.arc(position.x, position.y, radius, startAngle * DegreesToRadians, endAngle * DegreesToRadians, counterclockwise);
    ctx.stroke();
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
        
            let scale = Game.canvas.width / Game.Settings.NativeWidth;
            let newThickness = Math.round(this.outlineThickness * scale) / scale;

            ctx.strokeRect(
                this.position.x - newThickness / 2 + Game.Camera.position.x + 1,
                this.position.y - newThickness / 2 + Game.Camera.position.y + 1,
                this.scale.x + newThickness - 2,
                this.scale.y + newThickness - 2
            );
        }

        ctx.globalAlpha = this.bgOpacity;
        ctx.fillStyle = this.bgColour;
        ctx.fillRect(this.position.x + Game.Camera.position.x, this.position.y + Game.Camera.position.y, this.scale.x, this.scale.y);
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

        if (this.textAlignX === TextAlignX.Left) {
            textX = this.position.x;

        } else if (this.textAlignX === TextAlignX.Right) {
            textX = this.position.x = this.scale.x - textW;
        }

        if (this.textAlignY === TextAlignY.Top) {
            ctx.textBaseline = "top";
            textY = this.position.y;

        } else if (this.textAlignY === TextAlignY.Bottom) {
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

        if (this.textAlignX === TextAlignX.Left) {
            textX = this.position.x;

        } else if (this.textAlignX === TextAlignX.Right) {
            textX = this.position.x = this.scale.x - textW;
        }

        if (this.textAlignY === TextAlignY.Top) {
            ctx.textBaseline = "top";
            textY = this.position.y;

        } else if (this.textAlignY === TextAlignY.Bottom) {
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
        ctx.drawImage(this.image, this.position.x + Game.Camera.position.x, this.position.y + Game.Camera.position.y, this.scale.x, this.scale.y);
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
        ctx.drawImage(this.image, this.position.x + Game.Camera.position.x, this.position.y + Game.Camera.position.y, this.scale.x, this.scale.y);
    }
}

class UIGroup {
    visible = true;

    constructor(members = []) {
        this.members = members;
        this.changeVisibility = new Array(this.members.length); // the ui objects that can have their visibility changed

        for (let i = 0; i < this.members.length; i++) this.changeVisibility[i] = this.members[i].visible ? 1 : 0;
    }

    set visible(visible) {
        if (visible) {
            for (let i = 0; i < this.members.length; i++) {
                if (this.changeVisibility[i]) {
                    this.members[i].visible = true;
                }
            }
        }
        else {
            for (let i = 0; i < this.members.length; i++) {
                if (this.changeVisibility[i]) {
                    this.members[i].visible = false;
                }
            }
        }
    }

    TweenPosition(position, time, style, direction) {

    }

    Draw(ctx) {
        for (let uiObject of this.members) {
            if (uiObject.visible) uiObject.Draw(ctx);
        }
    }
}

class Scene {
    #layers = {}
    #uiLayers = {}

    // GameObjectAdded = new _Event();
    // GameObjectRemoved = new _Event();
    // GameObjectsChanged = new _Event();

    BackgroundImage = new Image();
    BackgroundImageFit;
    BackgroundImageStart = Vector.zero();

    UpdateGroup = [];

    constructor(GameObjects = [], UIObjects = [], Particles = [], BackgroundImage, BackgroundColour, Gravity, TerminalVelocity) {
        for (let gameObject of GameObjects) {
            if (!this.#layers[gameObject.layer]) this.#layers[gameObject.layer] = [];

            this.#layers[gameObject.layer].push(gameObject);
        }

        for (let uiObject of UIObjects) {
            if (!this.#uiLayers[uiObject.layer]) this.#uiLayers[uiObject.layer] = [];

            this.#uiLayers[uiObject.layer].push(uiObject);
        }

        this.Particles = Particles;

        if (BackgroundImage) {
            if (BackgroundImage instanceof Image) this.BackgroundImage = BackgroundImage;
            else this.BackgroundImage.src = BackgroundImage;
        }

        this.BackgroundColour = BackgroundColour;
        this.Gravity = Gravity;
        this.TerminalVelocity = TerminalVelocity;
    
        if (Gravity && !TerminalVelocity) this.TerminalVelocity = Gravity * 0.625;
    }

    Add(...gameObjects) {
        //let added = false;
        //let addedObjs = [];

        for (let gameObject of gameObjects) {
            if (!(gameObject instanceof GameObject)) {
                console.error("Specified game object is not a GameObject, cannot add to scene.");
                continue;
            }

            if (!this.#layers[gameObject.layer]) this.#layers[gameObject.layer] = [];
            this.#layers[gameObject.layer].push(gameObject);
            //addedObjs.push(gameObject);
            //added = true;
        }

        // if (added) {
        //     this.GameObjectAdded.Invoke(addedObjs);
        //     this.GameObjectsChanged.Invoke();
        // }
    }

    Remove(...gameObjects) {
        let removed = false;
        // let removedObjs = [];

        for (let gameObject of gameObjects) {
            let index = this.#layers[gameObject.layer].indexOf(gameObject);
            let layer = gameObject.layer;

            if (!this.#layers[layer][index]) continue;
            removed = true;

            this.#layers[layer][index].Destroying.Invoke();
            this.#layers[layer].splice(index, 1);
            //removedObjs.push(gameObject);

            if (!this.#layers[layer].length) delete this.#layers[layer];
        }

        // if (removed) {
        //     this.GameObjectRemoved.Invoke(removedObjs);
        //     this.GameObjectsChanged.Invoke();
        // 
        // } else console.error("Could not find game object to remove.");

        if (!removed) console.error("Could not find game object to remove.");
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

    AddParticles(...particles) {
        for (let particle of particles) {
            if (!(particle instanceof Particle)) {
                console.error("Specified particle is not a Particle, cannot add to scene.");
                continue;
            }

            this.Particles.push(particle);
        }
    }

    RemoveParticles(...particles) {
        for (let particle of particles) {
            let index = this.Particles.indexOf(particle);

            if (!this.Particles[index]) {
                console.error("Could not find particle to remove.");
                continue;
            }

            this.Particles.splice(index, 1);
        }
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

    AddParticleArray(particles) {
        for (let particle of particles) this.AddParticles(particle);
    }

    RemoveParticleArray(particles) {
        for (let particle of particles) this.RemoveParticles(particle);
    }

    FindGameObjectsByTag(tag) {
        let gameObjects = [];

        for (let gameObject of this.GameObjects) {
            if (gameObject.tag === tag) gameObjects.push(gameObject);
        }

        return gameObjects;
    }

    get GameObjects() {
        let gameObjects = [];

        for (let layer in this.#layers) {
            for (let gameObject of this.#layers[layer]) gameObjects.push(gameObject);
        }

        return gameObjects;
    }

    get UIObjects() {
        let uiObjects = [];

        for (let layer in this.#uiLayers) {
            for (let uiObject of this.#uiLayers[layer]) uiObjects.push(uiObject);
        }

        return uiObjects;
    }
}

const Debug = {
    lines: [],
    lineThicknesses: [],
    rectangles: [],
    circles: [],
    triangles: [],
    colour: "red",

    AddLine(line, thickness = 1, lifespan) {
        this.lines.push(line);
        this.lineThicknesses.push(thickness);

        if (lifespan) setTimeout(this.RemoveLine(line), lifespan);
    },

    AddRectangle(rectangle, lifespan) {
        this.rectangles.push(rectangle);

        if (lifespan) setTimeout(this.RemoveRectangle(rectangle), lifespan);
    },

    AddCircle(circle, lifespan) {
        this.circles.push(circle);

        if (lifespan) setTimeout(this.RemoveCircle(circle), lifespan);
    },

    AddTriangle(triangle, lifespan) {
        this.triangles.push(triangle);

        if (lifespan) setTimeout(this.RemoveTriangle(triangle), lifespan);
    },

    RemoveLine(line) {
        let index = this.lines.indexOf(line);

        if (index != -1) {
            this.lines.splice(index, 1);
            this.lineThicknesses.splice(index, 1);
        }
    },

    RemoveRectangle(rectangle) {
        if (this.rectangles.includes(rectangle)) this.rectangles.splice(this.rectangles.indexOf(rectangle), 1);
    },

    RemoveCircle(circle) {
        if (this.circles.includes(circle)) this.circles.splice(this.circles.indexOf(circle), 1);
    },

    RemoveTriangle(triangle) {
        if (this.triangles.includes(triangle)) this.triangles.splice(this.triangles.indexOf(triangle), 1);
    },

    ClearLines() {
        this.lines = [];
    },

    ClearRectangles() {
        this.rectangles = [];
    },

    ClearCircles() {
        this.circles = [];
    },

    ClearTriangles() {
        this.triangles = [];
    },

    Clear() {
        this.lines = [];
        this.rectangles = [];
        this.circles = [];
        this.triangles = [];
    },

    SetColour(colour) {
        this.colour = colour;
    },

    DrawLine(line, thickness = 1) {
        let ctx = Game.ctx;

        ctx.strokeStyle = this.colour;
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.stroke();
    },

    DrawRectangle(rectangle) {
        let ctx = Game.ctx;

        ctx.strokeStyle = this.colour;
        ctx.lineWidth = 2;
        ctx.strokeRect(rectangle.position.x, rectangle.position.y, rectangle.scale.x, rectangle.scale.y);
    },

    DrawCircle(circle) {
        let ctx = Game.ctx;

        ctx.strokeStyle = this.colour;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(circle.position.x, circle.position.y, circle.radius, 0, TwoPI);
        ctx.stroke();
    },

    DrawTriangle(triangle) {
        let ctx = Game.ctx;

        ctx.strokeStyle = this.colour;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.lineTo(triangle.a.x, triangle.a.y);
        ctx.lineTo(triangle.b.x, triangle.b.y);
        ctx.lineTo(triangle.c.x, triangle.c.y);
        ctx.lineTo(triangle.a.x, triangle.a.y);
        ctx.stroke();
    },

    Draw() {
        for (let i = 0; i < this.lines.length; i++) this.DrawLine(this.lines[i], this.lineThicknesses[i]);
        for (let rectangle of this.rectangles) this.DrawRectangle(rectangle);
        for (let circle of this.circles) this.DrawCircle(circle);
        for (let triangle of this.triangles) this.DrawTriangle(triangle);
    }
}

const Game = new class {
    #lastUpdate;
    #lastFPS;
    #fpses = [];
    FPS = 0;

    UpdateGroup = [];

    Loaded = new _Event();
    CanvasChanged = new _Event();
    Started = new _Event();
    PreUpdate = new _Event();
    PostUpdate = new _Event(); // not sure what post update can do that pre update cant and vice versa, but will keep them both just in case that both have specific use cases
    PreDraw = new _Event();
    PostDraw = new _Event();

    Settings = {
        Gravity: 2400,
        TerminalVelocity: 1500,
        BackgroundColour: "white",
        BackgroundImage: new Image(),
        BackgroundImageStart: Vector.zero(),
        BackgroundImageFit: BackgroundFit.Tile,
        CanvasResizeType: CanvasResizeType.AspectRatio,
        NativeWidth: 1920,
        NativeHeight: 1080,
        ImageSmoothingEnabled: false,
        ContextMenuEnabled: false,
        MaximumDelta: 0.2
    }

    Camera = {
        position: Vector.zero(),
        orientation: 0,
    }

    ViewPort = new Rectangle(this.Camera.position, new Vector(this.Settings.NativeWidth, this.Settings.NativeHeight));

    scene = new Scene();

    mobile;
    MobileUI = [];

    get Gravity() {
        return this.scene.Gravity || this.Settings.Gravity;
    }

    get TerminalVelocity() {
        return this.scene.TerminalVelocity || this.Settings.TerminalVelocity;
    }

    constructor() {
        this.Loaded.AddListener(() => {
            delete this.Loaded;
        });
    }

    #ResizeCanvasAspectRatio = () => {
        let aspectRatio = this.Settings.NativeWidth / this.Settings.NativeHeight;
        let dominantAxis = (window.innerWidth < window.innerHeight * aspectRatio) ? "x" : "y";

        if (dominantAxis === "x") {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerWidth / aspectRatio;

        } else {
            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerHeight * aspectRatio;
        }
    }

    #ResizeCanvasFullscreen = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    #ResizeCanvasMatchWidth = () => {
        let aspectRatio = this.Settings.NativeWidth / this.Settings.NativeHeight;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerWidth / aspectRatio;
    }

    #ResizeCanvasMatchHeight = () => {
        let aspectRatio = this.Settings.NativeWidth / this.Settings.NativeHeight;

        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerHeight * aspectRatio;
    }

    #ResizeCanvas = () => {
        switch (this.Settings.CanvasResizeType) {
            case CanvasResizeType.AspectRatio: this.#ResizeCanvasAspectRatio(); break;
            case CanvasResizeType.Fullscreen: this.#ResizeCanvasFullscreen(); break;
            case CanvasResizeType.MatchWidth: this.#ResizeCanvasMatchWidth(); break;
            case CanvasResizeType.MatchHeight: this.#ResizeCanvasMatchHeight(); break;
        }

        this.ctx.imageSmoothingEnabled = this.Settings.ImageSmoothingEnabled;
    }

    #ScaleCtxAspectRatio = () => {
        let scale = this.canvas.width / this.Settings.NativeWidth;
        this.ctx.setTransform(scale, 0, 0, scale, -this.Camera.position.x * scale, -this.Camera.position.y * scale);
    }

    #ScaleCtxFullscreen = () => {
        let scale = Math.max(this.canvas.width / this.Settings.NativeWidth, this.canvas.height / this.Settings.NativeHeight);
        this.ctx.setTransform(scale, 0, 0, scale, -this.Camera.position.x * scale, -this.Camera.position.y * scale);
    }

    #ScaleCtxMatchWidth = () => {
        let scale = this.canvas.width / this.Settings.NativeWidth;
        this.ctx.setTransform(scale, 0, 0, scale, -this.Camera.position.x * scale, -this.Camera.position.y * scale);
    }

    #ScaleCtxMatchHeight = () => {
        let scale = this.canvas.height / this.Settings.NativeHeight;
        this.ctx.setTransform(scale, 0, 0, scale, -this.Camera.position.x * scale, -this.Camera.position.y * scale);
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

        this.mobile = "ontouchstart" in window; // probably not the best method

        requestAnimationFrame(this.#Start);
    }

    #Start = (timestamp) => {
        this.#lastUpdate = timestamp;
        this.#lastFPS = timestamp;

        for (let member of this.UpdateGroup) if (member.Start) member.Start(timestamp);

        this.Started.Invoke();

        requestAnimationFrame(this.#Update);
    }

    #Update = (timestamp) => {
        const delta = (timestamp - this.#lastUpdate) / 1000;
        this.#lastUpdate = timestamp;

        if (!delta || isNaN(delta) || delta < 0 || delta > this.Settings.MaximumDelta) {
            this.#Draw();
            requestAnimationFrame(this.#Update);
            return;
        }

        this.#fpses.push(1 / delta);

        if (timestamp - this.#lastFPS > 1000) {
            this.#lastFPS = timestamp;

            let totalFPS = 0;
            for (let fps of this.#fpses) totalFPS += fps;

            this.FPS = totalFPS / this.#fpses.length;
            this.#fpses = [];
        }

        this.PreUpdate.Invoke(delta);

        let gameObjects = this.scene.GameObjects;

        for (let member of this.UpdateGroup) if (member.Update) member.Update(delta);
        for (let member of this.scene.UpdateGroup) if (member.Update) member.Update(delta);
        for (let gameObject of gameObjects) gameObject.Update(delta, gameObjects, RectIntersection(this.ViewPort, gameObject));
        for (let particle of this.scene.Particles) particle.Update(delta);

        Input.Update();

        this.PostUpdate.Invoke(delta);

        this.#Draw();

        requestAnimationFrame(this.#Update);
    }

    #Draw = () => {
        switch (this.Settings.CanvasResizeType) {
            case CanvasResizeType.AspectRatio: this.#ScaleCtxAspectRatio(); break;
            case CanvasResizeType.Fullscreen: this.#ScaleCtxFullscreen(); break;
            case CanvasResizeType.MatchWidth: this.#ScaleCtxMatchWidth(); break;
            case CanvasResizeType.MatchHeight: this.#ScaleCtxMatchHeight(); break;
            default: break;
        }
        
        this.ViewPort.position = this.Camera.position;
        this.ViewPort.scale = new Vector(this.Settings.NativeWidth, this.Settings.NativeHeight);

        this.ctx.globalAlpha = 1;

        this.ctx.clearRect(this.Camera.position.x, this.Camera.position.y, this.Settings.NativeWidth, this.Settings.NativeHeight);

        let useColour = false;

        let backgroundImage = this.scene.BackgroundImage.src ? this.scene.BackgroundImage : this.Settings.BackgroundImage.src ? this.Settings.BackgroundImage : 0;
        let backgroundColour = this.scene.BackgroundColour || this.Settings.BackgroundColour;

        if (this.scene.BackgroundColour) useColour = true;

        if (backgroundImage && !useColour) {
            let startX;
            let startY;

            if (this.scene.BackgroundImageStart.x) {
                startX = this.scene.BackgroundImageStart.x % this.Settings.NativeWidth;
            }
            else {
                startX = this.Settings.BackgroundImageStart.x % this.Settings.NativeWidth;
            }

            if (this.scene.BackgroundImageStart.y) {
                startY = this.scene.BackgroundImageStart.y % this.Settings.NativeHeight;
            }
            else {
                startY = this.Settings.BackgroundImageStart.y % this.Settings.NativeHeight;
            }

            this.ctx.globalAlpha = 1;

            this.ctx.drawImage(backgroundImage, startX + this.Camera.position.x, startY + this.Camera.position.y);

            let backgroundImageFit = this.scene.BackgroundImageFit || this.Settings.BackgroundImageFit;

            if (backgroundImageFit === BackgroundFit.Tile) {
            

                let distanceFromLeft = startX + this.Camera.position.x;
                let distanceFromRight = this.Settings.NativeWidth - (startX + backgroundImage.width);
                let distanceFromTop = startY + this.Camera.position.y;
                let distanceFromBottom = this.Settings.NativeHeight - (startY + backgroundImage.height);

                let tilesLeft = Math.ceil(distanceFromLeft / backgroundImage.width);
                let tilesRight = Math.ceil(distanceFromRight / backgroundImage.width);
                let tilesAbove = Math.ceil(distanceFromTop / backgroundImage.height);
                let tilesBelow = Math.ceil(distanceFromBottom / backgroundImage.height);

                //console.log(tilesLeft, tilesRight, tilesAbove, tilesBelow);

                // for (let x = 0; x < tilesLeft; x++) {
                //     this.ctx.drawImage(image, x * -image.width, -image.height);
                // }

                // for (let x = tilesLeft; x > 0; x--) {
                //     for (let y = tilesAbove; y > 0; y--) {
                //         this.ctx.drawImage(image, x * -image.width, y * -image.height);
                //     }
                // }

                // for (let x = tilesLeft; x > 0; x--) {
                //     for (let y = tilesBelow; y > 0; y--) {
                //         this.ctx.drawImage(image, x * -image.width, y * image.height);
                //     }
                // }

                // for (let x = tilesRight; x > 0; x--) {
                //     for (let y = tilesAbove; y > 0; y--) {
                //         this.ctx.drawImage(image, x * image.width, y * -image.height);
                //     }
                // }

                // for (let x = tilesRight; x > 0; x--) {
                //     for (let y = tilesBelow; y > 0; y--) {
                //         this.ctx.drawImage(image, x * image.width, y * image.height);
                //     }
                // }
            }

        } else {
            this.ctx.fillStyle = backgroundColour;
            this.ctx.fillRect(this.Camera.position.x, this.Camera.position.y, this.Settings.NativeWidth, this.Settings.NativeHeight);
        }

        this.PreDraw.Invoke(this.ctx);

        for (let gameObject of this.scene.GameObjects) if (RectIntersection(this.ViewPort, gameObject)) gameObject.Draw(this.ctx);
        for (let particle of this.scene.Particles) if (RectIntersection(this.ViewPort, particle)) particle.Draw(this.ctx);
        for (let uiObject of this.scene.UIObjects) if (uiObject.visible) uiObject.Draw(this.ctx);

        if (this.mobile) {
            for (let uiObject of this.MobileUI) if (uiObject.visible) uiObject.Draw(this.ctx);
        }

        Debug.Draw();

        this.PostDraw.Invoke(this.ctx);
    }

    GetFPS() {
        return Math.round(this.FPS);
    }
}

class UpdatesEachFrame {
    constructor() {
        this.AddToGame();
    }

    AddToGame() {
        if (Game.UpdateGroup.includes(this)) return console.error("Already a part of game, cannot add.");

        Game.UpdateGroup.push(this);
        this.active = true;
    }

    RemoveFromGame() {
        this.active = false;
        
        let index = Game.UpdateGroup.indexOf(this);
        if (index < 0) return console.error("Not apart of game, cannot remove.");
        
        Game.UpdateGroup.splice(index, 1);
    }
}

class SceneUpdatesEachFrame {
    constructor(scene) {
        this.scene = scene;
        this.AddToScene();
    }

    AddToScene() {
        if (this.scene.UpdateGroup.includes(this)) return console.error("Already a part of scene, cannot add.");

        this.scene.UpdateGroup.push(this);
        this.active = true;
    }

    RemoveFromScene() {
        this.active = false;

        let index = this.scene.UpdateGroup.indexOf(this);
        if (index == -1) return console.error("Not apart of scene, cannot remove.");

        this.scene.UpdateGroup.splice(index, 1);
    }

    MoveToScene(scene) {
        this.RemoveFromScene();
        this.scene = scene;
        this.AddToScene();
    }
}

class GameObject {
    opacity = 1;
    colour = "lightgrey";
    velocity = Vector.zero();
    animation;
    image;
    tag = "none";
    layer = 1;
    orientation = 0;
    canTouch = true;

    CollisionEnter = new _Event();
    CollisionExit = new _Event();

    TouchEnter = new _Event();
    TouchExit = new _Event();

    Destroying = new _Event();

    CollidingObjects = [];
    #newCollidingObjects = [];

    #collisionEnters = []; 
    #collisionExits = [];

    TouchingObjects = [];
    #newTouchingObjects = [];

    #touchEnters = []; 
    #touchExits = [];

    #collisionNextFrame = {
        above: false,
        below: false,
        left: false,
        right: false
    }

    collision = {
        above: false,
        below: false,
        left: false,
        right: false
    }

    collisionGroup;
    mass = 10;
    drag = 8;

    direction = {
        forward: () => this.#GetDirection(270),
        down: () => this.#GetDirection(90),
        left: () => this.#GetDirection(180),
        right: () => this.#GetDirection(0)
    }

    constructor(position = Vector.zero(), scale = new Vector(50, 50), anchored = false, collidable = true, useGravity = true, usePhysics = false) {
        this.position = position;
        this.scale = scale;
        this.anchored = anchored;
        this.collidable = collidable;
        this.useGravity = useGravity;
        this.usePhysics = usePhysics;

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

        //this.diagonal = Math.sqrt(this.scale.x * this.scale.x + this.scale.y * this.scale.y);
    }

    #GetDirection(offset) {
        // let angleDegrees = this.orientation % 360 + offset;
        // let angleRadians = angleDegrees * DegreesToRadians;

        // if (angleDegrees >= 0 && angleDegrees <= 90) {
        //     return new Vector(-Math.sin(angleRadians), Math.cos(angleRadians));
        
        // } else if (angleDegrees <= 180) {
        //     return new Vector(-Math.cos(angleRadians - Angle90), -Math.sin(angleRadians - Angle90));
        
        // } else if (angleDegrees <= 270) {
        //     return new Vector(Math.sin(angleRadians - Angle180), -Math.cos(angleRadians - Angle180));
        
        // } else {
        //     return new Vector(Math.cos(angleRadians - Angle270), Math.sin(angleRadians - Angle270));
        // }

        return Vector.FromAngle(this.orientation + offset * DegreesToRadians);
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

    Update(delta, gameObjects, inFrame = false) {
        if (this.animation && inFrame) this.animation.Update(delta);
        if (this.anchored) return;

        if (this.useGravity) {
            this.velocity.y += Game.Gravity * delta;
            if (this.velocity.y > Game.TerminalVelocity) this.velocity.y = Game.TerminalVelocity;
        }

        if (this.usePhysics) {
            // not real physics, might improve it later
            this.velocity.x = Lerp(this.velocity.x, 0, this.drag * delta);
        }

        for (let gameObject of this.#collisionEnters) this.CollisionEnter.Invoke(gameObject);
        for (let gameObject of this.#collisionExits) this.CollisionExit.Invoke(gameObject);
        for (let gameObject of this.#touchEnters) this.TouchEnter.Invoke(gameObject);
        for (let gameObject of this.#touchExits) this.TouchExit.Invoke(gameObject);

        this.#collisionEnters = [];
        this.#collisionExits = [];
        this.#touchEnters = [];
        this.#touchExits = [];

        for (let direction in this.#collisionNextFrame) {
            this.collision[direction] = this.#collisionNextFrame[direction];
            this.#collisionNextFrame[direction] = false;
        }

        this.CollidingObjects = this.#newCollidingObjects;
        this.#newCollidingObjects = [];

        this.TouchingObjects = this.#newTouchingObjects;
        this.#newTouchingObjects = [];

        let nextFrameX = {
            position: new Vector(this.position.x + this.velocity.x * delta, this.position.y),
            scale: this.scale
        }

        let nextFrameY = {
            position: new Vector(this.position.x, this.position.y + this.velocity.y * delta),
            scale: this.scale
        }

        if (!(this.collidable || this.canTouch)) return this.position.add(this.velocity.multiplied(delta));

        for (let gameObject of gameObjects) {
            if (this === gameObject) continue;

            let willCollide = this.collidable && gameObject.collidable;

            if (willCollide && this.collisionGroup && gameObject.collisionGroup) {
                if (this.collisionGroup.cantCollide.includes(gameObject.collisionGroup.name) ||
                gameObject.collisionGroup.cantCollide.includes(this.collisionGroup.name)) willCollide = false;
            }

            let colliding = false;
            let touching = false;

            // TODO: try make a phyics engine, use real equations for friction and conservation of momentum and whatever
            
            // for collision get the closest object and do collision detection with that to prevent teleporting to game objects behind the closest one
            // future me doesn't know what past me was meaning to say with the above comment

            if (RectIntersection(nextFrameX, gameObject)) {
                if (this.canTouch) touching = true;

                if (willCollide) {
                    colliding = true;
                
                    if (this.velocity.x > 0) {
                        this.#collisionNextFrame.right = true;
                        this.velocity.x = (gameObject.left - this.right) / delta;
                    }
                    else if (this.velocity.x < 0) {
                        this.#collisionNextFrame.left = true;
                        this.velocity.x = (gameObject.right - this.left) / delta;
                    }
                }
            }

            if (RectIntersection(nextFrameY, gameObject)) {
                if (this.canTouch) touching = true;

                if (willCollide) {
                    colliding = true;

                    if (this.velocity.y >= 0) {
                        this.#collisionNextFrame.below = true;
                        this.velocity.y = (gameObject.top - this.bottom) / delta;
                    }
                    else {
                        this.#collisionNextFrame.above = true;
                        this.velocity.y = (gameObject.bottom - this.top) / delta;

                        nextFrameY.position.y = this.position.y + this.velocity.y * delta;
                    }
                }
            }

            if (colliding) this.#newCollidingObjects.push(gameObject);
            if (touching) this.#newTouchingObjects.push(gameObject);
        }

        for (let gameObject of this.#newCollidingObjects) {
            if (!this.CollidingObjects.includes(gameObject)) this.#collisionEnters.push(gameObject);
        }

        for (let gameObject of this.CollidingObjects) {
            if (!this.#newCollidingObjects.includes(gameObject)) this.#collisionExits.push(gameObject);
        }

        for (let gameObject of this.#newTouchingObjects) {
            if (!this.TouchingObjects.includes(gameObject)) this.#touchEnters.push(gameObject);
        }

        for (let gameObject of this.TouchingObjects) {
            if (!this.#newTouchingObjects.includes(gameObject)) this.#touchExits.push(gameObject);
        }

        this.position.add(this.velocity.multiplied(delta));
    }

    Draw(ctx) {
        ctx.globalAlpha = this.opacity;

        ctx.save();
        ctx.translate(this.position.x + this.scale.x / 2, this.position.y + this.scale.y / 2);
        ctx.rotate(this.orientation);

        if (this.animation) {
            let animImage = this.animation.GetImage();

            let flipX = this.animation.flipX;
            let flipY = this.animation.flipY;

            let scaleX = flipX ? -1 : 1;
            let scaleY = flipY ? -1 : 1;

            let positionX = flipX ? this.scale.x / 2 - this.scale.x : -this.scale.x / 2;
            let positionY = flipY ? this.scale.y / 2 - this.scale.y : -this.scale.y / 2;

            ctx.scale(scaleX, scaleY);

            ctx.globalAlpha = this.opacity;
            ctx.drawImage(animImage.image, animImage.offset.x, animImage.offset.y, animImage.scale.x, animImage.scale.y, positionX, positionY, this.scale.x, this.scale.y);
            
            ctx.restore();

            return;
        }

        if (this.image) {
            let flipX = this.image.flipX;
            let flipY = this.image.flipY;

            let scaleX = flipX ? -1 : 1;
            let scaleY = flipY ? -1 : 1;

            let positionX = flipX ? this.scale.x / 2 - this.scale.x : -this.scale.x / 2;
            let positionY = flipY ? this.scale.y / 2 - this.scale.y : -this.scale.y / 2;

            ctx.scale(scaleX, scaleY);

            ctx.drawImage(this.image, positionX, positionY, this.scale.x, this.scale.y);
            ctx.restore();

            return;
        }

        ctx.fillStyle = this.colour;
        ctx.fillRect(-this.scale.x / 2, -this.scale.y / 2, this.scale.x, this.scale.y);
        ctx.restore();
    }
}

class Particle {
    opacity = 1;

    constructor(position, scale, animation, removeOnAnimEnd = false, velocity = Vector.zero(), orientation = 0) {
        this.position = position;
        this.scale = scale || new Vector(this.animation.GetImage().image.width, this.animation.GetImage().image.height);
        this.animation = animation;
        this.velocity = velocity;
        this.orientation = orientation;

        if (removeOnAnimEnd) {
            this.animation.Ended.AddListener(() => {
                Game.scene.RemoveParticles(this);
                delete this;
            });
        }
    }

    Update(delta) {
        this.animation.Update(delta);
        this.position.add(this.velocity.multiplied(delta));
    }

    Draw(ctx) {
        ctx.save();
        ctx.translate(this.position.x + this.scale.x / 2, this.position.y + this.scale.y / 2);
        ctx.rotate(this.orientation);

        let animImage = this.animation.GetImage();

        let flipX = this.animation.flipX;
        let flipY = this.animation.flipY;

        let scaleX = flipX ? -1 : 1;
        let scaleY = flipY ? -1 : 1;

        let positionX = flipX ? this.scale.x / 2 - this.scale.x : -this.scale.x / 2;
        let positionY = flipY ? this.scale.y / 2 - this.scale.y : -this.scale.y / 2;

        ctx.scale(scaleX, scaleY);

        ctx.globalAlpha = this.opacity;
        ctx.drawImage(animImage.image, animImage.offset.x, animImage.offset.y, animImage.scale.x, animImage.scale.y, positionX, positionY, this.scale.x, this.scale.y);
        
        ctx.restore();
    }
}

class TweenInfo {
    constructor(time, style, direction, propertyTable) {
        this.time = time;
        this.style = style;
        this.direction = direction;
        this.propertyTable = propertyTable;
    }
}

class Tween extends UpdatesEachFrame {
    Play = this.AddToGame;
    Pause = this.RemoveFromGame;

    Ended = new _Event();

    #startValues = {};

    constructor(object, info) {
        super();
        this.RemoveFromGame();

        this.object = object;
        this.info = info;

        for (let property in this.info.propertyTable) {
            if (this.object[property] instanceof Vector) this.#startValues[property] = this.object[property].copy();
            else this.#startValues[property] = (this.object[property] + 1) - 1;
        };
    }

    Update(delta) { // only does linear rn
        for (let property in this.info.propertyTable) {
            if (this.info.propertyTable[property] instanceof Vector) {
                let distance = this.info.propertyTable[property].minus(this.#startValues[property]).magnitude;
                let direction = this.info.propertyTable[property].minus(this.object[property]).normalised.multiplied(distance);
                let increment = direction.divided(this.info.time / delta);
                
                if (increment.magnitude > Vector.DistanceBetween(this.info.propertyTable[property], this.object[property])) {
                    for (let property in this.info.propertyTable) this.object[property] = this.info.propertyTable[property];
                    this.RemoveFromGame();
                    this.Ended.Invoke();
                    return;
                }

                this.object[property].add(increment);

            } else {
                let direction = this.info.propertyTable[property] - this.#startValues[property];
                let difference = this.info.propertyTable[property] - this.object[property];
                let increment = direction / (this.info.time / delta);

                if (Math.abs(increment) > Math.abs(difference)) {
                    for (let property in this.info.propertyTable) this.object[property] = this.info.propertyTable[property];
                    this.RemoveFromGame();
                    this.Ended.Invoke();
                    return;
                }

                this.object[property] += increment;
            }
        }
    }
}

class Ray {
    constructor(position, direction) {
        this.position = position;

        if (direction instanceof Vector) {
            this.direction = direction;
        
        } else {
            this.direction = Vector.FromAngle(direction);
        }
    }

    cast(wall) {
        let x1 = wall.start.x;
        let y1 = wall.start.y;
        let x2 = wall.end.x;
        let y2 = wall.end.y;

        let x3 = this.position.x;
        let y3 = this.position.y;
        let x4 = this.position.x + this.direction.x;
        let y4 = this.position.y + this.direction.y;

        let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    
        if (denominator === 0) return;

        let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
    
        if (t > 0 && t < 1 && u > 0) {
            return {
                point: new Vector(x1 + t * (x2 - x1), y1 + t * (y2 - y1)),
                distance: u
            }
        
        } else return;
    }
}

class RaycastInfo {
    constructor(ignoreList = [], includeNonCollidable = false, includeNonTouchable = false) {
        this.ignoreList = ignoreList;
        this.includeNonCollidable = includeNonCollidable;
        this.includeNonTouchable = includeNonTouchable;
    }
}

function Raycast(start, direction, maxDistance = Infinity, info = new RaycastInfo()) {
    let hit;
    let position;
    let distance;
    let ray = new Line(start, start.plus(direction.normalised.multiplied(maxDistance)));

    if (!(info instanceof RaycastInfo)) return console.error("No raycast info, cannot raycast.");

    for (let gameObject of Game.scene.GameObjects) {
        if (!gameObject.collidable && !info.includeNonCollidable) continue;
        if (!gameObject.canTouch && !info.includeNonTouchable) continue;

        let intersection = RectAndLineIntersection(gameObject, ray);

        if (intersection && !info.ignoreList.includes(gameObject)) {
            let _distance = Vector.DistanceBetween(start, intersection);

            if ((distance && distance < _distance) || _distance > maxDistance) continue;

            distance = _distance;
            hit = gameObject;
            position = intersection;
        }
    }

    if (hit) return { hit: hit, position: position }
    else return null;
}

// function Raycast(start, end, info = new RaycastInfo()) {
//     let hit;
//     let position
//     let distance;
//     let ray = new Line(start, end);

//     if (!(info instanceof RaycastInfo)) return console.error("No raycast info, cannot raycast.");

//     for (let gameObject of Game.scene.GameObjects) {
//         if (!gameObject.collidable && !info.includeNonCollidable) continue;
//         if (!gameObject.canTouch && !info.includeNonTouchable) continue;

//         let intersection = RectAndLineIntersection(gameObject, ray);

//         if (intersection && !info.ignoreList.includes(gameObject)) {
//             let _distance = Vector.DistanceBetween(start, gameObject.center);

//             if (distance && distance < _distance) continue;

//             distance = _distance;
//             hit = gameObject;
//             position = intersection;
//         }
//     }

//     if (hit) return { hit: hit, position: position }
//     else return null;
// }

function RaycastOnLayer(start, end, layer, info = new RaycastInfo()) { // change this to user direction instead of end
    let hit;
    let distance;
    let ray = new Line(start, end);

    if (!layer) return console.error("No layer specified, didn't raycast.");
    if (!(info instanceof RaycastInfo)) return console.error("No raycast info, cannot raycast.");

    for (let gameObject of Game.scene.GameObjects) {
        if (!gameObject.collidable && !info.includeNonCollidable) continue;
        if (!gameObject.canTouch && !info.includeNonTouchable) continue;

        let intersection = RectAndLineIntersection(gameObject, ray);

        if (intersection && !info.ignoreList.includes(gameObject)) {
            if (layer != gameObject.layer) continue;

            let _distance = Vector.DistanceBetween(start, gameObject.center);

            if (distance && distance < _distance) continue;

            distance = _distance;
            hit = gameObject;
            position = intersection;
        }
    }

    if (hit) return { hit: hit, position: position }
    else return null;
}

function RaycastByTag(start, end, tag, info = new RaycastInfo()) {
    let hit;
    let distance;
    let ray = new Line(start, end);

    if (!tag) return console.error("No tag specified, cannot raycast.");
    if (!(info instanceof RaycastInfo)) return console.error("No raycast info, cannot raycast.");

    for (let gameObject of Game.scene.GameObjects) {
        if (!gameObject.collidable && !info.includeNonCollidable) continue;
        if (!gameObject.canTouch && !info.includeNonTouchable) continue;

        let intersection = RectAndLineIntersection(gameObject, ray);

        if (intersection && !info.ignoreList.includes(gameObject)) {
            if (tag != gameObject.tag) continue;

            let _distance = Vector.DistanceBetween(start, gameObject.center);

            if (distance && distance < _distance) continue;

            distance = _distance;
            hit = gameObject;
            position = intersection;
        }
    }

    if (hit) return { hit: hit, position: position }
    else return null;
}

function PiercingRaycast(start, end, info = new RaycastInfo()) {
    let hits = [];
    let ray = new Line(start, end);

    if (!(info instanceof RaycastInfo)) return console.error("No raycast info, cannot raycast.");

    for (let gameObject of Game.scene.GameObjects) {
        if (!gameObject.collidable && !info.includeNonCollidable) continue;
        if (!gameObject.canTouch && !info.includeNonTouchable) continue;

        let intersection = RectAndLineIntersection(gameObject, ray);

        if (intersection && !info.ignoreList.includes(gameObject)) {
            hits.push({ hit: gameObject, position: intersection });
        }
    }

    return hits;
}

function PiercingRaycastOnLayer(start, end, layer, info = new RaycastInfo()) {
    let hits = [];
    let ray = new Line(start, end);

    if (!layer) return console.error("No layer specified, didn't raycast.");
    if (!(info instanceof RaycastInfo)) return console.error("No raycast info, cannot raycast.");

    for (let gameObject of Game.scene.GameObjects) {
        if (!gameObject.collidable && !info.includeNonCollidable) continue;
        if (!gameObject.canTouch && !info.includeNonTouchable) continue;
        if (gameObject.layer != layer) continue;

        let intersection = RectAndLineIntersection(gameObject, ray);

        if (intersection && !info.ignoreList.includes(gameObject)) {
            hits.push({ hit: gameObject, position: intersection });
        }
    }

    return hits;
}

function PiercingRaycastByTag(start, end, tag, info = new RaycastInfo()) {
    let hits = [];
    let ray = new Line(start, end);

    if (!tag) return console.error("No tag specified, cannot raycast.");
    if (!(info instanceof RaycastInfo)) return console.error("No raycast info, cannot raycast.");

    for (let gameObject of Game.scene.GameObjects) {
        if (!gameObject.collidable && !info.includeNonCollidable) continue;
        if (!gameObject.canTouch && !info.includeNonTouchable) continue;
        if (gameObject.tag != tag) continue;

        let intersection = RectAndLineIntersection(gameObject, ray);

        if (intersection && !info.ignoreList.includes(gameObject)) {
            hits.push({ hit: gameObject, position: intersection });
        }
    }

    return hits;
}

function GameObjectsCollidingWithRect(rect, ignoreList = []) {
    let gameObjects = [];

    for (let gameObject of Game.scene.GameObjects) {
        if (!gameObject.collidable) continue;
        if (ignoreList.includes(gameObject)) continue;

        if (RectIntersection(rect, gameObject)) gameObjects.push(gameObject);
    }

    return gameObjects;
}

function GameObjectsTouchingRect(rect, ignoreList = []) {
    let gameObjects = [];

    for (let gameObject of Game.scene.GameObjects) {
        if (!gameObject.canTouch) continue;
        if (ignoreList.includes(gameObject)) continue;

        if (RectIntersection(rect, gameObject)) gameObjects.push(gameObject);
    }

    return gameObjects;
}

function GameObjectsInRect(rect, ignoreList = []) {
    let gameObjects = [];

    for (let gameObject of Game.scene.GameObjects) {
        if (ignoreList.includes(gameObject)) continue;

        if (RectIntersection(rect, gameObject)) gameObjects.push(gameObject);
    }

    return gameObjects;
}

function GameObjectsCollidingWithCircle(circle, ignoreList = []) {
    let gameObjects = [];

    for (let gameObject of Game.scene.GameObjects) {
        if (!gameObject.collidable) continue;
        if (ignoreList.includes(gameObject)) continue;

        if (RectAndCircleIntersection(gameObject, circle)) gameObjects.push(gameObject);
    }

    return gameObjects;
}

function GameObjectsTouchingCircle(circle, ignoreList = []) {
    let gameObjects = [];

    for (let gameObject of Game.scene.GameObjects) {
        if (!gameObject.canTouch) continue;
        if (ignoreList.includes(gameObject)) continue;

        if (RectAndCircleIntersection(gameObject, circle)) gameObjects.push(gameObject);
    }

    return gameObjects;
}

function GameObjectsInCircle(circle, ignoreList = []) {
    let gameObjects = [];

    for (let gameObject of Game.scene.GameObjects) {
        if (ignoreList.includes(gameObject)) continue;

        if (RectAndCircleIntersection(gameObject, circle)) gameObjects.push(gameObject);
    }

    return gameObjects;
}

const Input = new class {
    #KeysDown = {}
    #KeyPressed = {}
    #KeyReleased = {}

    KeyDown = new _Event();
    KeyUp = new _Event();

    #MousePos = Vector.zero();

    MouseMove = new _Event();

    MouseButtonDown = new _Event();
    MouseButtonUp = new _Event();

    Mouse1Down = new _Event();
    Mouse1Up = new _Event();

    Mouse2Down = new _Event();
    Mouse2Up = new _Event();

    Mouse3Down = new _Event();
    Mouse3Up = new _Event();

    MouseWheel = new _Event();

    #MouseButtonsDown = {}
    #MouseButtonPressed = {}
    #MouseButtonReleased = {}

    #MouseButtonID = ["1", "3", "2"];

    constructor() {
        for (let keyCode in KeyCode) {
            this.#KeysDown[KeyCode[keyCode]] = false;
            this.#KeyPressed[KeyCode[keyCode]] = false;
            this.#KeyReleased[KeyCode[keyCode]] = false;
        }

        let mouseButtons = 5;
        for (let i = 1; i <= mouseButtons; i++) {
            this.#MouseButtonsDown[i] = false;
            this.#MouseButtonPressed[i] = false;
            this.#MouseButtonReleased[i] = false;
        }

        window.addEventListener("blur", () => {
            for (let keyCode in this.#KeysDown) this.#KeysDown[keyCode] = false;
            for (let keyCode in this.#KeyPressed) this.#KeyPressed[keyCode] = false;
            for (let keyCode in this.#KeyReleased) this.#KeyReleased[keyCode] = false;
        });

        let started = false;

        Game.Started.AddListener(() => {
            if (started) return; // prevents lag if user spams Game.Start();
            started = true;

            window.addEventListener("keydown", this.#KeyDown);
            window.addEventListener("keyup", this.#KeyUp);
            window.addEventListener("mousedown", this.#MouseDown);
            window.addEventListener("mouseup", this.#MouseUp);
            window.addEventListener("mousemove", this.#MouseMove);
            window.addEventListener("wheel", this.#MouseWheel);
            window.addEventListener("touchstart", this.#TouchStart);
            window.addEventListener("touchend", this.#TouchEnd);
            window.addEventListener("touchmove", this.#TouchMove);
            //window.addEventListener("touchcancel", this.#TouchCancel);
        });
    }

    Update() {
        for (let keyCode in this.#KeyPressed) this.#KeyPressed[keyCode] = false;
        for (let keyCode in this.#KeyReleased) this.#KeyReleased[keyCode] = false;

        for (let mouseButton in this.#MouseButtonPressed) this.#MouseButtonPressed[mouseButton] = false;
        for (let mouseButton in this.#MouseButtonReleased) this.#MouseButtonReleased[mouseButton] = false;
    }

    #KeyDown = (e) => {
        if (!this.#KeysDown[e.code]) this.#KeyPressed[e.code] = true;
        this.#KeysDown[e.code] = true;
        this.KeyDown.Invoke(e.code, e.key, e.shiftKey, e.ctrlKey, e.altKey);
    }

    #KeyUp = (e) => {
        if (this.#KeysDown[e.code]) this.#KeyReleased[e.code] = true;
        this.#KeysDown[e.code] = false;
        this.KeyUp.Invoke(e.code, e.key, e.shiftKey, e.ctrlKey, e.altKey);
    }

    #CheckButton = (mousePos, uiObject) => {
        if (!(uiObject instanceof Button) || !uiObject.visible || !uiObject.enabled) return false;

        let mouseRect = {
            position: mousePos,
            scale: Vector.one()
        }

        return RectIntersection(mouseRect, uiObject);
    }

    #CheckMouseOver(mousePos, uiObject) {
        let MouseRect = {
            position: mousePos,
            scale: Vector.one()
        }

        if (!(uiObject instanceof Button) || !uiObject.visible || !uiObject.enabled) return;

        if (RectIntersection(MouseRect, uiObject)) {
            if (uiObject.mouseover === false) uiObject.MouseEnter.Invoke();
            uiObject.mouseover = true;

            return;
        }

        if (uiObject.mouseover) uiObject.MouseExit.Invoke();
        uiObject.mouseover = false;
    }

    #CheckTouchOver(mousePos, uiObject) {
        let MouseRect = {
            position: mousePos,
            scale: Vector.one()
        }

        if (!(uiObject instanceof Button) || !uiObject.visible || !uiObject.enabled) return;

        if (RectIntersection(MouseRect, uiObject)) {
            if (!uiObject.mouseover) {
                uiObject.TouchEnter.Invoke();
                uiObject.TouchStart.Invoke();
                uiObject.mouseover = true;
            }

            return;
        }

        if (uiObject.mouseover) {
            uiObject.TouchExit.Invoke();
            uiObject.TouchEnd.Invoke();
            uiObject.mouseover = false;
        }
    }

    #MouseDown = (e) => {
        let button = this.#MouseButtonID[e.button] || e.button;

        this.MouseButtonDown.Invoke(button, this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        
        if (!this.#MouseButtonsDown[button]) this.#MouseButtonPressed[button] = true;
        
        this.#MouseButtonsDown[button] = true;

        let buttonTargeted = false;

        for (let uiObject of Game.scene.UIObjects) {
            if (!this.#CheckButton(this.#MousePos, uiObject)) continue;

            buttonTargeted = true;

            if (button === "1") uiObject.Mouse1Down.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
            else if (button === "2") uiObject.Mouse2Down.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
            else if (button === "3") uiObject.Mouse3Down.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        }

        if (buttonTargeted) return;

        if (button === "1") this.Mouse1Down.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        else if (button === "2") this.Mouse2Down.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        else if (button === "3") this.Mouse3Down.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
    }

    #MouseUp = (e) => {
        let button = this.#MouseButtonID[e.button];

        this.MouseButtonUp.Invoke(button, this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);

        if (this.#MouseButtonsDown[button]) this.#MouseButtonReleased[button] = true;

        this.#MouseButtonsDown[button] = false;

        let buttonTargeted = false;

        for (let uiObject of Game.scene.UIObjects) {
            if (!this.#CheckButton(this.#MousePos, uiObject)) continue;

            buttonTargeted = true;

            if (button === "1") uiObject.Mouse1Up.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
            else if (button === "2") uiObject.Mouse2Up.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
            else if (button === "3") uiObject.Mouse3Up.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        }

        if (buttonTargeted) return;

        if (button === "1") this.Mouse1Up.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        else if (button === "2") this.Mouse2Up.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
        else if (button === "3") this.Mouse3Up.Invoke(this.#MousePos.copy(), e.shiftKey, e.ctrlKey, e.altKey);
    }

    #MouseMove = (e) => {
        let canvas = Game.canvas;
        let rect = canvas.getBoundingClientRect();
        let scale = Game.Settings.NativeWidth / canvas.width;

        let oldPos = this.#MousePos.copy();

        this.#MousePos = new Vector((e.clientX - rect.x), (e.clientY - rect.y)).multiplied(scale);
        this.MouseMove.Invoke(this.#MousePos.copy(), oldPos, e.shiftKey, e.ctrlKey, e.altKey);

        for (let uiObject of Game.scene.UIObjects) this.#CheckMouseOver(this.#MousePos, uiObject);
    }

    #MouseWheel = (e) => {
        let direction = 0;

        if (e.deltaY > 0) direction = 1;
        else if (e.deltaY < 0) direction = -1; 

        this.MouseWheel.Invoke(direction);
    }

    #TouchStart = (e) => {
        if (!Game.mobile) return;

        let canvas = Game.canvas;
        let rect = canvas.getBoundingClientRect();
        let scale = Game.Settings.NativeWidth / canvas.width;
        let mousePos = new Vector(e.changedTouches[0].clientX - rect.x, e.changedTouches[0].clientY - rect.y).multiplied(scale);

        for (let uiObject of Game.scene.UIObjects) {
            if (this.#CheckButton(mousePos, uiObject)) uiObject.Mouse1Down.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
        }

        for (let uiObject of Game.MobileUI) {
            if (this.#CheckButton(mousePos, uiObject)) {
                uiObject.TouchDown.Invoke();
                uiObject.TouchStart.Invoke();
                uiObject.mouseover = true;
            }
        }
    }

    #TouchEnd = (e) => {
        if (!Game.mobile) return;

        let canvas = Game.canvas;
        let rect = canvas.getBoundingClientRect();
        let scale = Game.Settings.NativeWidth / canvas.width;
        let mousePos = new Vector(e.changedTouches[0].clientX - rect.x, e.changedTouches[0].clientY - rect.y).multiplied(scale);

        for (let uiObject of Game.scene.UIObjects) {
            if (this.#CheckButton(mousePos, uiObject)) uiObject.Mouse1Up.Invoke(e.shiftKey, e.ctrlKey, e.altKey);
            if (uiObject instanceof Button) uiObject.MouseExit.Invoke();
        }

        for (let uiObject of Game.MobileUI) {
            if (this.#CheckButton(mousePos, uiObject)) {
                uiObject.TouchUp.Invoke();
                uiObject.TouchEnd.Invoke();
                uiObject.mouseover = false;
            }
        }
    }

    #TouchMove = (e) => {
        let scale = Game.Settings.NativeWidth / Game.GetCanvas().width;
        this.#MousePos = new Vector(e.changedTouches[0].clientX, e.changedTouches[0].clientY).multiplied(scale);

        for (let uiObject of Game.scene.UIObjects) this.#CheckTouchOver(this.#MousePos, uiObject);
        for (let uiObject of Game.MobileUI) this.#CheckTouchOver(this.#MousePos, uiObject);
    }

    GetKey = (keyCode) => this.#KeysDown[keyCode];
    GetKeyDown = (keyCode) => this.#KeyPressed[keyCode];
    GetKeyUp = (keyCode) => this.#KeyReleased[keyCode];

    GetMouseButton = (mouseButton) => this.#MouseButtonsDown[mouseButton];
    GetMouseButtonDown = (mouseButton) => this.#MouseButtonPressed[mouseButton];
    GetMouseButtonUp = (mouseButton) => this.#MouseButtonReleased[mouseButton];

    GetAxisRaw(axis) {
        let result = {
            vertical: 0,
            horizontal: 0
        }

        if (this.GetKey(KeyCode.KeyW) || this.GetKey(KeyCode.ArrowUp) || this.GetKey(KeyCode.Space)) result.vertical -= 1;
        if (this.GetKey(KeyCode.KeyA) || this.GetKey(KeyCode.ArrowLeft)) result.horizontal -= 1;
        if (this.GetKey(KeyCode.KeyS) || this.GetKey(KeyCode.ArrowDown)) result.vertical += 1;
        if (this.GetKey(KeyCode.KeyD) || this.GetKey(KeyCode.ArrowRight)) result.horizontal += 1;

        return result[axis.toLowerCase()];
    }

    GetMousePosition = () => this.#MousePos.copy();
}

class Stopwatch {
    time = {
        h: 0,
        m: 0,
        s: 0,
        ms: 0
    }

    Update(delta) {
        this.AddTime(delta * 1000);
    }

    AddTime(ms) {
        if (ms < 0) return this.SubtractTime(-ms);

        let s = 0;
        let m = 0;
        let h = 0;

        while (this.time.ms + ms > 999) {
            ms -= 1000;
            s++;
        }

        while (this.time.s + s > 59) {
            s -= 60;
            m++;
        }

        while (this.time.m + m > 59) {
            m -= 60;
            h++;
        }

        this.time.ms += ms;
        this.time.s += s;
        this.time.m += m;
        this.time.h += h;
    }

    SubtractTime(ms) {
        if (ms < 0) return this.AddTime(-ms);

        let s = 0;
        let m = 0;
        let h = 0;

        while (this.time.ms - ms < 0) {
            ms -= 1000;
            s++;
        }

        while (this.time.s - s < 0) {
            s -= 60;
            m++;
        }

        while (this.time.m - m < 0) {
            m -= 60;
            h++;
        }

        this.time.ms -= ms;
        this.time.s -= s;
        this.time.m -= m;
        this.time.h -= h;
    }

    GetTime() {
        let ms = Math.round(this.time.ms);
        let s = Math.round(this.time.s);
        let m = Math.round(this.time.m);
        let h = Math.round(this.time.h);

        if (ms < 10) ms = "00" + ms;
        else if (ms < 100) ms = "0" + ms;

        if (s < 10) s = "0" + s;
        if (m < 10) m = "0" + m;

        return this.time.h === 0 ? m + ":" + s + "." + ms : h + ":" + m + ":" + s + "." + ms;
    }
}

window.addEventListener("contextmenu", e => {
    if (!Game.Settings.ContextMenuEnabled) e.preventDefault();
});

window.addEventListener("load", Game.Loaded.Invoke);

console.log("Engine v2.1.5");