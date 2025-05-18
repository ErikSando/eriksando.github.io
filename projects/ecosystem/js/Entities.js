// trying to make the simulation more stable by making the world bigger by decreasing speed and increasing energy and clone time

let speedMultiplier = 1/4;
let lifeMultiplier = 5;

const minSpeed = 25;
const maxSpeed = 50;

const maxEnergy = 1200 * lifeMultiplier;

const minCloneTime = 20 * lifeMultiplier;
const maxCloneTime = 100 * lifeMultiplier;

class Entity {
    constructor(position, orientation = 0, image, speed = Random.Integer(minSpeed, maxSpeed), vision = Random.Integer(100, 200), energy = Random.Integer(500, 1000) * lifeMultiplier, cloneTime = Random.Integer(20, 30) * lifeMultiplier) {
        this.position = position;
        this.orientation = orientation;
        this.image = image;
        this.scale = new Vector(28, 24);
        this.speed = speed;
        this.vision = vision;
        this.maxEnergy = energy;
        this.energy = energy;
        //this.energyConsumption = speed / 150 * 60;
        this.energyConsumption = 60;
        this.direction = new Vector(0, 0);
        this.hasTarget = false;
        this.timeSinceClone = 0;
        this.cloneTime = cloneTime;
        this.timeSinceDeath = 0;
    }

    Update(delta) {
        if (this.energy <= 0) return;

        let nextPosition = Vector.Add(this.position, this.direction.normalised().multiply(Number((this.speed * delta).toFixed(2))));

        if (nextPosition.x < 0 || nextPosition.x + this.scale.x > 1280) {
            this.direction.x = 0;
        }

        if (nextPosition.y < 0 || nextPosition.y + this.scale.y > 720) {
            this.direction.y = 0;
        }

        if (this.direction.x > 0 && this.direction.y < 0) { // up and right
            this.orientation = 2 * Math.PI - Math.atan(Math.abs(this.direction.x) / this.direction.y);

        } else if (this.direction.x > 0 && this.direction.y > 0) { // down and right
            this.orientation = Math.PI - Math.atan(this.direction.x / Math.abs(this.direction.y));

        } else if (this.direction.x < 0 && this.direction.y > 0) { // down and left
            this.orientation = Math.PI + Math.atan(Math.abs(this.direction.x) / Math.abs(this.direction.y));

        } else if (this.direction.x < 0 && this.direction.y < 0) { // up and left
            this.orientation = 2 * Math.PI - Math.atan(this.direction.x / this.direction.y);
        
        } else if (this.direction.x == 0) {
            this.orientation = (this.direction.y > 0) ? 180 : 0;

        } else if (this.direction.y == 0) {
            this.orientation = (this.direction.x >= 0) ? 90 : 270;
        }

        this.position.add(this.direction.normalised().multiply(Number((this.speed * delta).toFixed(2))));
        this.hitbox = new Circle(this.position, this.scale.x);
        this.energy -= this.energyConsumption * delta;

        if (!this.hasTarget) this.MoveRandomly(delta);

        this.hasTarget = false;

        //if (this.energy <= 0) this.Remove();
        
        this.position.x = Clamp(this.position.x, 0, 1280 - this.scale.x);
        this.position.y = Clamp(this.position.y, 0, 720 - this.scale.y);
    }

    Draw(ctx) {
        let { x, y } = this.position;
        let w = this.scale.x;
        let h = this.scale.y;
        let angle = this.orientation;

        ctx.save();
        ctx.translate(x + w / 2, y + h / 2);
        ctx.rotate(angle);
        ctx.drawImage(this.image, -w / 2, -h / 2);
        ctx.restore();
    }

    MoveRandomly(delta) {
        let nextPosition = Vector.Add(this.position, this.direction.normalised().multiply(Number((this.speed * delta).toFixed(2))));

        if (nextPosition.x < 0 || nextPosition.x + this.scale.x > 1280) {
            this.direction.x = -this.direction.x;
        }

        if (nextPosition.y < 0 || nextPosition.y + this.scale.y > 720) {
            this.direction.y = -this.direction.y;
        }

        if (this.direction.magnitude() > 0) {
            if (Random.Integer(1, 100) != 1) return;

            this.direction = new Vector(Random.Float() - 0.5, Random.Float() - 0.5);

            return;
        }

        this.direction = new Vector(Random.Float() - 0.5, Random.Float() - 0.5);
    }
}

class Prey extends Entity {
    constructor(position, orientation, speed, vision, energy, cloneTime) {
        super(position, orientation, Images.prey, speed, vision, energy, cloneTime);
    }

    Update(delta) {
        if (this.energy <= 0) {
            this.timeSinceDeath += delta;

            if (this.timeSinceDeath > 10) this.Remove();

            return;
        }

        super.Update(delta);

        this.timeSinceClone += delta;
        if (this.timeSinceClone >= this.cloneTime) {
            this.timeSinceClone = 0;
            this.Clone();
        }

        let closestFood;
        let closestDistance = Infinity;

        if (this.energy <= this.maxEnergy * 4/5) {
            for (let f of food) {
                let fHitbox = new Circle(f.position, f.scale.x);

                if (CircleIntersection(this.hitbox, fHitbox)) {
                    RemoveFood(f);
                    this.energy = Clamp(this.energy + 300, 0, this.maxEnergy);
                }

                let distance = Vector.DistanceFrom(this.position, f.position);

                if (distance < this.vision && distance < closestDistance) {
                    closestDistance = distance;
                    closestFood = f.position;
                }
            }
        }

        if (closestFood) {
            this.direction = Vector.Subtract(closestFood, this.position);
            this.hasTarget = true;
        }

        let predatorsInVision = []

        let totalUrgency = 0;

        let GetUrgency = (d, wall = false) => {
            let m = wall ? -100 : -20;
            let u = Math.pow(Math.E, m * (d / this.vision));

            return wall ? u / 2 : u;
        }

        for (let p of predators) {
            let distance = Vector.DistanceFrom(this.position, p.position);

            if (distance < this.vision) {
                let urgency = GetUrgency(distance);
                predatorsInVision.push([p, urgency]);
                totalUrgency += urgency;
            }
        }

        if (!predatorsInVision.length) return;

        let totalX = 0;
        let totalY = 0;

        // walls are considered as a point to retreat from
        let closestVerticalWallX = this.position.x <= this.vision ? 0 : this.position.x >= 1280 - this.vision ? 1280 : null;
        let closestVerticalWallY = closestVerticalWallX ? this.position.y : null;
        let closestHorizontalWallY = this.position.y <= this.vision ? 0 : this.position.y >= 720 - this.vision ? 720 : null;
        let closestHorizontalWallX = closestHorizontalWallY ? this.position.x : null;

        for (let p of predatorsInVision) {
            totalX += p[0].position.x * p[1];
            totalY += p[0].position.y * p[1];
        }

        if (closestVerticalWallX) {
            let pos = new Vector(closestVerticalWallX, closestVerticalWallY)
            let urgency = GetUrgency(Vector.DistanceFrom(pos, this.position), true);

            totalX += pos.X * urgency;
            totalY += pos.Y * urgency;
            totalUrgency += urgency;
        }

        if (closestHorizontalWallY) {
            let pos = new Vector(closestHorizontalWallX, closestHorizontalWallY)
            let urgency = GetUrgency(Vector.DistanceFrom(pos, this.position), true);

            totalX += pos.X * urgency;
            totalY += pos.Y * urgency;
            totalUrgency += urgency;
        }

        let retreatPoint = new Vector(totalX / totalUrgency, totalY / totalUrgency);

        this.direction = Vector.Subtract(this.position, retreatPoint);
        
        if (this.position.x < this.vision && retreatPoint.x > this.position.x) {
            let multiplier = this.position.y > retreatPoint.y ? 1 : -1;
            this.direction.y += this.direction.magnitude() * multiplier;
        }

        if (this.position.x > 1280 - this.vision && retreatPoint.x < this.position.x) {
            let multiplier = this.position.y > retreatPoint.y ? 1 : -1;
            this.direction.y += this.direction.magnitude() * multiplier;
        }

        if (this.position.y < this.vision && retreatPoint.y > this.position.y) {
            let multiplier = this.position.x > retreatPoint.x ? 1 : -1;
            this.direction.x += this.direction.magnitude() * multiplier;
        }

        if (this.position.y > 1280 - this.vision && retreatPoint.y < this.position.y) {
            let multiplier = this.position.x > retreatPoint.x ? 1 : -1;
            this.direction.x += this.direction.magnitude() * multiplier;
        }
        
        this.hasTarget = true;

        // NOTE: make the prey able to move without heading towards walls
        // NOTE: add an intelligence gene which determines how accurately the prey will evade predators
    }

    Clone() {
        let childPosition = Vector.Add(this.position, new Vector(Clamp(Random.Choice([-24, 24]), 0, 1256), Clamp(Random.Choice([-28, 28]), 0, 692)));
        let childSpeed = this.speed + Random.Integer(-this.speed / 20, this.speed / 20);
        let childVision = this.vision + Random.Integer(-this.vision / 20, this.vision / 20);
        let childEnergy = Clamp(this.maxEnergy + Random.Integer(-this.maxEnergy / 20, this.maxEnergy / 20), 0, maxEnergy);
        let childCloneTime = Clamp(this.cloneTime + Random.Integer(-this.cloneTime / 20, this.cloneTime / 20), minCloneTime, maxCloneTime);

        let child = new Prey(childPosition, 0, childSpeed, childVision, childEnergy, childCloneTime);

        AddPrey(child);
    }

    Remove() {
        RemovePrey(this);
        delete this;
    }
}

class Predator extends Entity {
    constructor(position, orientation, speed, vision, energy = Random.Integer(1000, 1500) * lifeMultiplier, cloneTime = Random.Integer(40, 50) * lifeMultiplier) {
        super(position, orientation, Images.predator, speed, vision, energy, cloneTime);
    }

    Update(delta) {
        // if close to prey, chase prey
        // if no prey in vision, move until prey is found
        if (this.energy <= 0) this.Remove();

        super.Update(delta);

        this.timeSinceClone += delta;
        if (this.timeSinceClone >= this.cloneTime) {
            this.timeSinceClone = 0;
            this.Clone();
        }

        let preyInVision = []

        for (let p of prey) {
            let pHitbox = new Circle(p.position, p.scale.x / 8); // decreasing the radius because the prey get killed from a distance with normal radius

            if (CircleIntersection(this.hitbox, pHitbox) && this.energy < this.maxEnergy * 2/3) {
                RemovePrey(p);
                this.energy = Clamp(this.energy + 800, 0, this.maxEnergy);
            }

            if (Vector.DistanceFrom(this.position, p.position) < this.vision) {
                preyInVision.push(p);
            }
        }

        if (!preyInVision.length || this.energy > this.maxEnergy * 2/3) return;

        let closestPrey;
        let closestDistance = Infinity;

        for (let p of preyInVision) {
            if (p.energy <= 0) {
                closestPrey = p.position;
                
                break;
            }

            let distance = Vector.DistanceFrom(this.position, p.position);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestPrey = p.position;
            }
        }

        this.direction = Vector.Subtract(closestPrey, this.position);
        this.hasTarget = true;

        // NOTE: add an intelligence gene which determines how accurately the predator will approach prey
    }

    Clone() {
        let childPosition = Vector.Add(this.position, new Vector(Clamp(Random.Choice([-24, 24]), 0, 1256), Clamp(Random.Choice([-28, 28]), 0, 692)));
        let childSpeed = this.speed + Random.Integer(-this.speed / 20, this.speed / 20);
        let childVision = this.vision + Random.Integer(-this.vision / 20, this.vision / 20);
        let childEnergy = Clamp(this.maxEnergy + Random.Integer(-this.maxEnergy / 20, this.maxEnergy / 20), 0, maxEnergy * 2);
        let childCloneTime = Clamp(this.cloneTime + Random.Integer(-this.cloneTime / 20, this.cloneTime / 20), minCloneTime * 2, maxCloneTime * 2);

        let child = new Predator(childPosition, 0, childSpeed, childVision, childEnergy, childCloneTime);

        AddPredator(child);
    }

    Remove() {
        RemovePredator(this);
        delete this;
    }
}

class Food {
    constructor(position) {
        this.position = position;
        this.image = Images.food;
        this.scale = new Vector(this.image.width, this.image.height);
    }

    Draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}