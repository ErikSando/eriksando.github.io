const DegreesToRadians = Math.PI / 180;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalised() {
        if (!this.x && !this.y) return new Vector(0, 0);
        if (!this.x) return new Vector(0, 1);
        if (!this.y) return new Vector(1, 0);

        return new Vector(this.x / this.magnitude(), this.y / this.magnitude());
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

    negate() {
        this.x = -this.x;
        this.y = -this.y;
    }
}

Vector.DistanceFrom = (v1, v2) => {
    return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));
}

Vector.Add = (v1, v2) => {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
}

Vector.Subtract = (v1, v2) => {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
}

Vector.up = new Vector(0, -1);
Vector.down = new Vector(0, 1);
Vector.left = new Vector(-1, 0);
Vector.right = new Vector(0, 1);

const Random = {
    Integer: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    Float: () => {
        return Math.random();
    },

    Choice: (choices) => {
        return choices[Math.floor(Math.random() * choices.length)];
    }
}

class Circle {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
    }

    Draw(ctx) {

    }
}

function Clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;

    return value;
}

function CircleIntersection(c1, c2) {
    if (!c1 || !c2) return;

    return Vector.DistanceFrom(c1.position, c2.position) < c1.radius + c2.radius;
}