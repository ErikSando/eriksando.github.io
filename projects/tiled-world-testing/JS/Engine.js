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

class _Event {
    #listeners = [];

    AddListener(listener) {
        if (typeof listener != "function") return console.error("Event listener must be a function.");

        this.#listeners.push(listener);
    }

    RemoveListener(listener) {
        let index = this.#listeners.indexOf(listener);

        if (!this.#listeners[index]) return console.error("Could not find event listener to remove.");

        this.#listeners.splice(index, 1);
    }

    Invoke(...args) {
        for (let listener of this.#listeners) listener(...args);
    }
}

const Random = {
    Integer: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    Float: Math.random,

    Choice: (choices) => {
        return choices[Math.floor(Math.random() * choices.length)];
    }
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get normalised() {
        return new Vector(this.x / this.magnitude, this.y / this.magnitude);
    }

    get inverserd() {
        return new Vector(-this.x, -this.y);
    }

    multiply(arg) {
        if (arg instanceof Vector) {
            this.x 
        
        } else {
            return new Vector(this.x * arg, this.y * arg);
        }
    }

    equals(v) {
        return this.x == v.x && this.y == v.y;
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

    lerp(v, t) {
        let direction = v.minus(this);

        this.add(direction.multiplied(t));
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    copy() {
        return new Vector(this.x, this.y);
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

Vector.Lerp = (v1, v2, t) => {
    let direction = v2.minus(v1);

    v1.add(direction.multiplied(t));
}

Vector.FromAngle = (angle) => {
    return new Vector(Math.cos(angle), Math.sin(angle));
}

class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    get start() {
        return new Vector(this.x1, this.y1);
    }

    get end() {
        return new Vector(this.x2, this.y2);
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    get position() {
        return new Vector(this.x, this.y);
    }

    get topLeft() {
        return new Vector(this.x, this.y);
    }

    get topRight() {
        return new Vector(this.x + this.w, this.y);
    }

    get bottomRight() {
        return new Vector(this.x + this.w, this.y + this.h);
    }

    get bottomLeft() {
        return new Vector(this.x, this.y + this.h);
    }

    get sides() {
        return {
            left: new Line(this.x, this.y, this.x, this.y + this.h),
            right: new Line(this.x + this.w, this.y, this.x + this.w, this.y),
            top: new Line(this.x, this.y, this.x + this.w, this.y),
            bottom: new Line(this.x, this.y + this.h, this.x + this.w, this.y + this.h)
        }
    }

    get left() {
        return this.x;
    }

    get right() {
        return this.x + this.w;
    }

    get top() {
        return this.y;
    }

    get bottom() {
        return this.y + this.h;
    }
}

class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    get position() {
        return new Vector(this.x, this.y);
    }
}

class Triangle {
    colour = "lightgrey";
    outlineColor = "grey";
    outlineWidth = 2;

    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    Draw(ctx) {
        ctx.fillStyle = this.colour;
        ctx.strokeStyle = this.outlineColor;
        ctx.lineWidth = this.outlineWidth;

        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.lineTo(this.c.x, this.c.y);
        ctx.fill();
        ctx.stroke();
    }
}

function Clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function Lerp(a, b, t) {
    return a + t * (b - a);
}

function LineIntersection(l1, l2) {
    let x1 = l1.x1;
    let x2 = l1.x2;
    let x3 = l2.x1;
    let x4 = l2.x2;
    let y1 = l1.y1;
    let y2 = l1.y2;
    let y3 = l2.y1;
    let y4 = l2.y2;

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

function RectIntersection(r1, r2) {
    return (!(r1.x >= r2.x + r2.w || r1.x + r1.w <= r2.x || r1.y >= r2.y + r2.h || r1.y + r1.h <= r2.y));
}

function CircleIntersection(c1, c2) {
    return c1.position.minus(c2.position).magnitude < c1.radius + c2.radius;
}

function RectAndPointIntersection(r, p) {
    if (r.position.x > p.x || r.position.x + r.scale.x < p.x || r.position.y > p.y || r.position.y + r.scale.y < p.y) return false;

    return true;
}

function RectAndLineIntersection(r, l) {
    let intersection;
    let closestDistance;

    for (let side of r.sides) {
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
        let { x1, x2, y1, y2 } = wall;

        let x3 = this.position.x;
        let y3 = this.position.y;
        let x4 = this.position.x + this.direction.x;
        let y4 = this.position.y + this.direction.y;

        let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    
        if (denominator == 0) return;

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
    constructor(ignoreList) {
        this.ignoreList = ignoreList;
    }
}

window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});