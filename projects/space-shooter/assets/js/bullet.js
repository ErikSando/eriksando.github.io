class Bullet extends UpdatesEachFrame {
    constructor(position, parent, parentTag, speed = 800, spread = 2, colour = "yellow") {
        super();

        this.speed = speed;
        this.parent = parent;

        this.GameObject = new GameObject(position, new Vector(6, 16), false, false);
        this.GameObject.orientation = parent.orientation + Random.Float() * spread * DegreesToRadians;
        this.GameObject.velocity = this.GameObject.direction.forward().multiplied(this.speed);
        this.GameObject.colour = colour;
        this.GameObject.tag = "bullet";
        this.parentTag = parentTag;
        this.GameObject.useGravity = false;

        World.Add(this.GameObject);

        this.removed = false;

        setTimeout(() => {
            if (!this.removed) {
                World.Remove(this.GameObject);
                this.RemoveFromGame();
            }

        }, 1800);
    }

    Update(delta) {
        let raycastInfo = new RaycastInfo([this.GameObject, this.parent], true);
        let hit = Raycast(this.GameObject.center, this.GameObject.center.plus(this.GameObject.velocity.multiplied(delta)), this.GameObject.velocity.magnitude * delta, raycastInfo);

        if (hit && hit.hit.onHit && hit.hit.tag != this.parentTag) {
            this.removed = true;
            hit.hit.onHit.Invoke();
            World.Remove(this.GameObject);
            this.RemoveFromGame();
        }
    }
}