const ground = new GameObject(new Vector(100, 880), new Vector(1720, 100), true);

const obj1 = new GameObject(new Vector(500, 780), new Vector(100, 100), false, true, true, true);
const obj2 = new GameObject(new Vector(650, 780), new Vector(100, 100), false, true, true, true);
const obj3 = new GameObject(new Vector(575, 680), new Vector(100, 100), false, true, true, true);

const scene = new Scene([ground, obj1, obj2, obj3]);

Game.scene = scene;

Game.Settings.BackgroundColour = "rgb(110, 120, 130)";

let explosionRadius = 1000;

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();
});

function Explosion(position, power, radius) {
    let gameObjects = GameObjectsTouchingCircle(new Circle(position, radius));

    let gObjsToMove = [];

    for (let gObj of gameObjects) {
        if (!gObj.anchored) {
            let direction = gObj.center.minus(position);
            let distance = Vector.DistanceBetween(position, gObj.center);

            let force = power * (radius / (distance + 0.00001));
            let explosionForce = direction.normalised.multiplied(force);

            gObj.velocity.add(explosionForce);
        }
    }
}

Input.Mouse1Down.AddListener((mousePos) => {
    Explosion(mousePos, 100, explosionRadius);
});