function Rect(x, y, w, h) {
    return {
        x: x,
        y: y,
        w: w,
        h: h,
        top: () => y,
        bottom: () => y + h,
        left: () => x,
        right: () => x + w,
        center: () => {
            return {
                x: x + w / 2,
                y: y + h / 2
            }
        }
    }
}

function RectIntersection(r1, r2) {
    if (r1.x + r1.w <= r2.x || r1.x >= r2.x + r2.w || r1.y + r1.h <= r2.y || r1.y >= r2.y + r2.h) return false;

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

    return { x: x, y: y }
}

function RectAndPointIntersection(r, p) {
    if (r.x <= p.x && r.x + r.w >= p.x && r.y <= p.y && r.y + r.h >= p.y) return true;

    return false;
}

function RectAndLineIntersection(r, l) {
    if (RectAndPointIntersection(r, l.start) || RectAndPointIntersection(r, l.end)) return true;

    let rSides = [
        { start: { x: r.x, y: r.y }, end: { x: r.x + r.w, y: r.y } },
        { start: { x: r.x + r.w, y: r.y }, end: { x: r.x + r.w, y: r.y + r.h } },
        { start: { x: r.x + r.w, y: r.y + r.h }, end: { x: r.x, y: r.y + r.h } },
        { start: { x: r.x, y: r.y + r.h }, end: { x: r.x, y: r.y } }
    ]

    for (let side of rSides) if (LineIntersection(side, l)) return true;

    return false;
}

function DistanceBetween(v1, v2) {
    return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
}

function RandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class _Event {
    #listeners = [];

    AddListener(listener) {
        if (typeof listener != "function") return console.error("Event listener must be a function.");

        this.#listeners.push(listener);
    }

    RemoveListener(listener) {
        let index = this.#listeners.indexOf(listener);

        if (!this.#listeners[index]) return console.error("Could not find listener, cannot remove.");

        this.#listeners.splice(index, 1);
    }

    Fire(...args) {
        for (let listener of this.#listeners) listener(...args);
    }
}

class _Animation {
    #frame = 0;
    #totalDelta = 0;

    constructor(frames, fps = 6) {
        this.frames = frames;
        this.fps = fps;
    }

    Reset() {
        this.#frame = 0;
        this.#totalDelta = 0;
    }

    Update(delta) {
        this.#totalDelta += delta;

        if (this.#totalDelta > 1 / this.fps) {
            this.#frame++;
            this.#totalDelta -= 1 / this.fps;
        }

        if (this.#frame >= this.frames.length) this.#frame = 0;   
    }

    GetImage() {
        return this.frames[this.#frame];
    }
}

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})