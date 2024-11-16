let mouse = new Circle(new Vector(0, 0), 5);

Game.Settings.BackgroundColour = "black";
Game.Settings.CameraPosition = new Vector(-200, -200);

let wall1 = new Line(new Vector(0, 0), new Vector(0, 500));
let wall2 = new Line(new Vector(0, 0), new Vector(500, 0));

let enemies = [ new Vector(130, 100), new Vector(180, 80) ];

Game.PostDraw.AddListener(() => {
    let mousePos = Input.GetMousePosition();
    mouse.position = mousePos;

    let range = 120;
    let visibleEnemies = [];
    let totalUrgency = 0;

    function GetUrgency(d, wall = false) {
        let m = wall ? -100 : -60;
        let u = Math.pow(Math.E, m * (d / range));

        return wall ? u / 2 : u;
    }

    for (let enemy of enemies) {
        let distance = Vector.DistanceBetween(mousePos, enemy);

        if (distance <= range) {
            let urgency = GetUrgency(distance);
            visibleEnemies.push([enemy, urgency]);
            totalUrgency += urgency;
        }
    }

    let n = visibleEnemies.length;

    if (mouse.position.x < range) {
       // for (let i = 0; i < n; i++) {
            let urgency = GetUrgency(mouse.position.x, true);
            visibleEnemies.push([new Vector(0, mouse.position.y), urgency]);
            totalUrgency += urgency;
        //}
    }

    if (mouse.position.y < range) {
       // for (let i = 0; i < n; i++) {
            let urgency = GetUrgency(mouse.position.y, true);
            visibleEnemies.push([new Vector(mouse.position.x, 0), urgency]);
            totalUrgency += urgency;
       // }
    }

    let totalX = 0;
    let totalY = 0;

    for (let enemy of visibleEnemies) {
        totalX += enemy[0].x * enemy[1];
        totalY += enemy[0].y * enemy[1];

        Debug.DrawCircle(new Circle(enemy[0], 3));
    }

    let retreatPoint = totalX || totalY ? new Vector(totalX / totalUrgency, totalY / totalUrgency) : 0;

    Debug.DrawCircle(mouse);
    Debug.DrawCircle(new Circle(retreatPoint, 1));
    Debug.DrawLine(wall1);
    Debug.DrawLine(wall2);

    if (retreatPoint) Debug.DrawLine(new Line(mousePos, mousePos.plus(mousePos.minus(retreatPoint).normalised.multiplied(50))), 2);
});

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();
});