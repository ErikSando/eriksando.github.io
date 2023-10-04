const ground1 = new GameObject(new Vector(200, 800), new Vector(600, 100), true);
const ground2 = new GameObject(new Vector(1000, 800), new Vector(600, 100), true);

const wall0 = new GameObject(new Vector(-200, 300), new Vector(100, 200), true);
const wall1 = new GameObject(new Vector(0, 500), new Vector(100, 200), true);
const wall2 = new GameObject(new Vector(1200, 300), new Vector(100, 200), true);
const wall3 = new GameObject(new Vector(300, 300), new Vector(200, 100), true);

const FPS = new TextLabel(new Vector(15, 15), new Vector(150, 50), "... FPS");
FPS.textSize = 35;
FPS.textAlignX = TextAlignX.Left;
FPS.textAlignY = TextAlignY.Top;

const scene = new Scene([ground1, ground2, wall0, wall1, wall2, wall3], [FPS]);

Game.scene = scene;

const player = new Player(new Vector(500, 700), scene);

let drawShadows = true;
let drawLines = false;
let drawIntersections = false;

let backgroundColour = "rgb(110, 120, 130)";
let shadowColour = "rgb(50, 50, 50)";
let intersectionColour = "red";

Game.Settings.BackgroundColour = drawShadows ? shadowColour : backgroundColour;

Game.Loaded.AddListener(() => {
    Game.Camera.position = new Vector(
        player.GameObject.position.x - (Game.Settings.NativeWidth - player.GameObject.scale.x) / 2,
        player.GameObject.position.y - (Game.Settings.NativeHeight - player.GameObject.scale.y) / 2
    );

    Game.CreateCanvas();
    Game.Start();
});

Game.PostUpdate.AddListener((delta) => {
    FPS.text = Game.GetFPS() + " FPS";
    
    let targetPosition = new Vector(
        player.GameObject.position.x - (Game.Settings.NativeWidth - player.GameObject.scale.x) / 2,
        player.GameObject.position.y - (Game.Settings.NativeHeight - player.GameObject.scale.y) / 2
    );

    Game.Camera.position.lerp(targetPosition, 5 * delta);
});

Game.PreDraw.AddListener((ctx) => {
    let viewPoint = player.GameObject.center;
    let walls = [];

    for (let gameObject of Game.scene.GameObjects) {
        if (gameObject == player.GameObject) continue;
        if (!RectIntersection(gameObject, Game.ViewPort)) continue;
    
        for (let side of gameObject.GetSides()) walls.push(side);
    }

    for (let side of Game.ViewPort.GetSides()) walls.push(side);

    let allPoints = [];
    
    for (let wall of walls) {
        allPoints.push(wall.start, wall.end);

        for (let _wall of walls) {
            let intersection = LineIntersection(wall, _wall);
            if (intersection) allPoints.push(intersection);
        }
    }

    let keys = [];
    let points = [];

    for (let point of allPoints) {
        let key = point.x + " " + point.y;

        if (!keys.includes(key)) {
            keys.push(key);
            points.push(point);
        }
    }

    let angles = [];

    for (let point of points) {
        let angle = Math.atan2(point.y - viewPoint.y, point.x - viewPoint.x);
        angles.push(angle - 0.00001, angle, angle + 0.00001);
    }

    let intersections = [];

    for (let angle of angles) {
        let ray = new Ray(viewPoint, angle);

        let intersect;
        let closestDistance;

        for (let wall of walls) {
            let result = ray.cast(wall);

            if (result) {
                if (!closestDistance || result.distance < closestDistance) {
                    intersect = result.point;
                    closestDistance = result.distance;
                }
            }
        }

        if (!intersect) continue;

        intersect._angle = angle;
        intersections.push(intersect);
    }

    intersections = intersections.sort((a, b) => a._angle - b._angle);

    if (drawShadows && intersections.length) {
        ctx.fillStyle = backgroundColour;
        ctx.beginPath();
        ctx.moveTo(intersections[0].x, intersections[0].y);

        for (let i = 1; i < intersections.length; i++) ctx.lineTo(intersections[i].x, intersections[i].y);

        ctx.fill();
    }

    if (drawLines) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;

		for (let i = 0; i < intersections.length; i++) {
			ctx.beginPath();
			ctx.moveTo(viewPoint.x, viewPoint.y,);
			ctx.lineTo(intersections[i].x, intersections[i].y);
			ctx.stroke();
		}
    }

    if (drawIntersections && intersections.length) {
        for (let i = 0; i < intersections.length; i++) {
            fillCircle(new Circle(intersections[i], 5), ctx, intersectionColour, 1);
        }
    }
});