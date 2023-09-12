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

const scene = new Scene("Main", [ground1, ground2, wall0, wall1, wall2, wall3], [FPS]);

Game.LoadScene(scene);

const player = new Player(new Vector(500, 700), scene);

const drawShadows = true;
const drawLines = false;

const backgroundColour = "rgb(110, 120, 130)";
const shadowColour = "rgb(50, 50, 50)";

Game.Settings.BackgroundColour = drawShadows ? shadowColour : backgroundColour;

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();
});

Game.PostUpdate.AddListener((delta) => {
    FPS.text = Game.GetFPS() + " FPS";
    
    let targetPosition = new Vector(
        player.GameObject.position.x - (Game.Settings.NativeWidth - player.GameObject.scale.x) / 2,
        player.GameObject.position.y - (Game.Settings.NativeHeight - player.GameObject.scale.y) / 2
    );

    Game.Camera.position = Vector.Lerp(
        Game.Camera.position,
        targetPosition,
        10 * delta
    );
});

Game.PreDraw.AddListener(() => {
    let viewPoint = player.GameObject.center;
    
    let ctx = Game.ctx;

    let walls = [];
    let vpVertices = Game.ViewPort.vertices;

    for (let gameObject of Game.GetGameObjects()) {
        if (gameObject == player.GameObject) continue;
        if (!RectIntersection(gameObject, Game.ViewPort)) continue;

        walls.push(
            new Line(gameObject.vertices.topLeft(), gameObject.vertices.topRight()),
            new Line(gameObject.vertices.topRight(), gameObject.vertices.bottomRight()),
            new Line(gameObject.vertices.bottomRight(), gameObject.vertices.bottomLeft()),
            new Line(gameObject.vertices.bottomLeft(), gameObject.vertices.topLeft())
        );
    }

    walls.push(
        new Line(vpVertices.topLeft(), vpVertices.topRight()),
        new Line(vpVertices.topRight(), vpVertices.bottomRight()),
        new Line(vpVertices.bottomRight(), vpVertices.bottomLeft()),
        new Line(vpVertices.bottomLeft(), vpVertices.topLeft()),
    )

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
        point.angle = angle;
        angles.push(angle - 0.00001, angle, angle + 0.00001);
    }

    let intersects = [];

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

        intersect.angle = angle;
        intersects.push(intersect);
    }

    intersects = intersects.sort(function (a, b) {
        return a.angle - b.angle;
    });

    // draw the visible portion of the world
    if (drawShadows && intersects.length) {
        ctx.fillStyle = backgroundColour;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(intersects[0].x, intersects[0].y);

        for (let i = 1; i < intersects.length; i++) {
            ctx.lineTo(intersects[i].x, intersects[i].y);
        }

        ctx.fill();
    }

    if (drawLines) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;

		for(let i = 0; i < intersects.length; i++){
			ctx.beginPath();
			ctx.moveTo(viewPoint.x, viewPoint.y,);
			ctx.lineTo(intersects[i].x, intersects[i].y);
			ctx.stroke();
		}
    }
});