class Bullet extends UpdatesEachFrame {
    constructor(position, parent, speed = 800) {
        super();

        this.speed = speed;
        this.parent = parent;

        this.GameObject = new GameObject(position, new Vector(5, 10), false, false);
        this.GameObject.orientation = parent.orientation;
        this.GameObject.velocity = this.GameObject.direction.forward().multiply(this.speed);
        this.GameObject.tag = "bullet";
        this.GameObject.useGravity = false;

        World.Add(this.GameObject);
    }

    Update(delta) {
        let hit = Raycast(this.GameObject.center(), Vector.Add(this.GameObject.center(), this.GameObject.velocity.multiply(delta)), [this.GameObject, this.parent]);

        if (hit) {
            if (hit.tag == "enemy") {
                World.Remove(hit);
                World.Remove(this.GameObject);
                delete this;
            }
        }
    }
}