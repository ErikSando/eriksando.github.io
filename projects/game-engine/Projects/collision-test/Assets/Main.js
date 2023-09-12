let image = new Image();
image.src = "Assets/textures/block.png";

let obj1 = new GameObject(new Vector(200, 200), new Vector(200, 200), true);
obj1.image = image;
obj1.useGravity = false;

let obj2 = new GameObject(new Vector(380, 380), new Vector(200, 200), true);

Game.LoadScene(new Scene("main", [obj1, obj2]));

Game.Loaded.AddListener(() => {
    Game.CreateCanvas();
    Game.Start();
});

Game.PostUpdate.AddListener((delta) => {
    obj1.orientation += 60 * delta;

    // if (RotatedRectIntersection(obj1, obj2)) console.log("Intersection");
});
