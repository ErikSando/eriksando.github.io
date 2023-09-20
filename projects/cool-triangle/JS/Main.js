class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

Vector.Midpoint = (v1, v2) => {
    return new Vector((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
}

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

    const triangleVertices = [
        new Vector(960, 100),
        new Vector(452, 980),
        new Vector(1468, 980)
    ]

    const triangle = new Triangle(triangleVertices[0], triangleVertices[1], triangleVertices[2]);

    let r1 = Math.random();
    let r2 = Math.random();

    let firstPointX = (1 - Math.sqrt(r1)) * 960 + (Math.sqrt(r1) * (1 - r2)) * 452 + (Math.sqrt(r1) * r2) * 1468;
    let firstPointY = (1 - Math.sqrt(r1)) * 100 + (Math.sqrt(r1) * (1 - r2)) * 980 + (Math.sqrt(r1) * r2) * 980;

    let firstPoint = new Circle(new Vector(firstPointX, firstPointY), 0.5);

    const objects = [triangle, firstPoint];

    let lastPoint = firstPoint;

    function Update() {
        for (let i = 0; i < newPointsPerUpdate; i++) {
            let vertex = triangleVertices[Math.floor(Math.random() * triangleVertices.length)];
            let midpoint = Vector.Midpoint(lastPoint.position, vertex);
            let newPoint = new Circle(midpoint, 0.5);
            lastPoint = newPoint;

            objects.push(newPoint);
        }
        
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