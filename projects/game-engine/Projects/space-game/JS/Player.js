class Player extends SceneUpdatesEachFrame {
    speed = 500;
    jumpPower = 600;

    constructor(scene, position) {
        super(scene);

        this.GameObject = new GameObject(position, new Vector(50, 100));
        this.GameObject.colour = "red";

        scene.Add(this.GameObject);
    }

    Update(delta) {
        this.GameObject.velocity.x = Input.GetAxisRaw("Horizontal") * this.speed;

        let grounded = this.GameObject.collision.below;

        if (Input.GetAxisRaw("Vertical") < 0 && grounded) this.GameObject.velocity.y = -this.jumpPower;
    }
}