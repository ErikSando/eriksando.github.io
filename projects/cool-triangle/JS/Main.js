const DegreesToRadians = Math.PI / 180;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    multiply(n) {
        return new Vector(this.x * n, this.y * n);
    }
}

Vector.Midpoint = (v1, v2) => new Vector((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
Vector.FromAngle = (angle) => new Vector(Math.cos((angle - 90) * DegreesToRadians), Math.sin((angle - 90) * DegreesToRadians));

class Triangle {
    colour = "white";
    strokeWidth = 2;

    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    Draw(ctx) {
        ctx.strokeStyle = this.colour;
        ctx.lineWidth = this.strokeWidth;
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.lineTo(this.c.x, this.c.y);
        ctx.lineTo(this.a.x, this.a.y);
        ctx.stroke();
    }
}

class Circle {
    colour = "white";

    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
    }

    Draw(ctx) {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

let newPointsPerUpdate = 50;

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let aspectRatio = 16/9;

    function Resize() {
        let dominantAxis = (window.innerWidth <= window.innerHeight * aspectRatio) ? "x" : "y";

        if (dominantAxis == "x") {
            canvas.width = window.innerWidth;
            canvas.height = window.innerWidth / aspectRatio;

        } else {
            canvas.height = window.innerHeight;
            canvas.width = window.innerHeight * aspectRatio;
        }

        ctx.imageSmoothingEnabled = false;
    }

    window.addEventListener("resize", Resize);
    Resize();

    let sideLength = 1000;

    // equilaterial triangle
    let a = new Vector(960, 100);
    let b = Vector.FromAngle(150).multiply(sideLength).add(a);
    let c = Vector.FromAngle(210).multiply(sideLength).add(a);

    let triangleVertices = [a, b, c];

    const triangle = new Triangle(a, b, c);

    let r1 = Math.random();
    let r2 = Math.random();

    // random point inside the triangle
    let firstPointX = (1 - Math.sqrt(r1)) * a.x + (Math.sqrt(r1) * (1 - r2)) * b.x + (Math.sqrt(r1) * r2) * c.x;
    let firstPointY = (1 - Math.sqrt(r1)) * a.y + (Math.sqrt(r1) * (1 - r2)) * b.y + (Math.sqrt(r1) * r2) * c.y;

    let firstPoint = new Circle(new Vector(firstPointX, firstPointY), 0.5);
    let lastPoint = firstPoint;

    // remove first few points
    for (let i = 0; i < 3; i++) {
        firstPoint = GetNewPoint();
    }

    const objects = [triangle, firstPoint];

    function GetNewPoint(point) {
        // get the mid point of the last point and a random vertex of the triangle
        let vertex = triangleVertices[Math.floor(Math.random() * triangleVertices.length)];
        let midpoint = Vector.Midpoint(lastPoint.position, vertex);

        return new Circle(midpoint, 0.5);
    }

    function AddNewPoint() {
        let newPoint = GetNewPoint();
        lastPoint = newPoint;
        objects.push(newPoint);   
    }

    function Update() {
        // get the mid point of the last point and a random vertex of the triangle
        for (let i = 0; i < newPointsPerUpdate; i++) AddNewPoint();
        
        Draw();

        requestAnimationFrame(Update);
    }

    function Draw() {
        let scale = canvas.width / 1920;

        ctx.setTransform(scale, 0, 0, scale, 0, 0);

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1920, 1080);

        for (let object of objects) object.Draw(ctx);
    }

    requestAnimationFrame(Update);
});