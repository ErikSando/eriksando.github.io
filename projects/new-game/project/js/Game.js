const TextAlignX = Object.freeze({
    Left: 1,
    Center: 2,
    Right: 3
})

const TextAlignY = Object.freeze({
    Top: 1,
    Center: 2,
    Bottom: 3
})

function Clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;

    return value;
}

function RectIntersection(r1, r2) {
    if(r1.position.x + r1.scale.x <= r2.position.x
    || r1.position.x >= r2.position.x + r2.scale.x
    || r1.position.y + r1.scale.y <= r2.position.y
    || r1.position.y >= r2.position.y + r2.scale.y) return false;

    return true;
}

function Vector(x, y) {
    return {
        x: x,
        y: y,

        magnitude() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },

        normalised() {
            return Vector(this.x / this.magnitude(), this.y / this.magnitude());
        },

        negated() {
            return Vector(-this.x, -this.y);
        },

        equals(vector) {
            return this.x == vector.x && this.y == vector.y;
        },

        add(arg) {
            return Vector(this.x + (arg.x || arg), this.y + (arg.y || arg));
        },

        subtract(arg) {
            return Vector(this.x - (arg.x || arg), this.y - (arg.y || arg));
        },

        multiply(arg) {
            return Vector(this.x * (arg.x || arg), this.y * (arg.y || arg));
        },

        divide(arg) {
            return Vector(this.x / (arg.x || arg), this.y / (arg.y || arg));
        },

        distanceFrom(v) {
            return Math.sqrt(Math.pow((v.x - this.x), 2) + Math.pow((v.y - this.y), 2))
        }
    }
}

Vector.zero = Vector(0, 0);
Vector.one = Vector(1, 1);
Vector.up = Vector(0, -1);
Vector.right = Vector(1, 0);
Vector.down = Vector(0, 1);
Vector.left = Vector(-1, 0);

const Random = {
    Integer(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    Float() {
        return Math.random();
    },

    Choice(choices) {
        return choices[Math.floor(Math.random() * choices.length)];
    }
}

class _Event {
    #listeners = [];
    //#justfired = false;

    AddListener(listener) {
        if (typeof listener != "function") return console.error("Event listener must be a function.");

        this.#listeners.push(listener);
    }

    RemoveListener(listener) {
        let index = this.#listeners.indexOf(listener);

        if (this.#listeners[index]) this.#listeners.splice(index, 1);
    }

    // Wait() {
    //     return new Promise(resolve => {
    //         let interval = setInterval(() => {
    //             if (this.#justfired) {
    //                 this.#justfired = false;
    //                 clearInterval(interval);
    //                 resolve();
    //             }
    //         });
    //     });
    // }

    Fire(...args) {
        for (let listener of this.#listeners) listener(...args);

        //this.#justfired = true;

        // want to make this smarter but dont know how :")
        // setTimeout(() => {
        //     this.#justfired = false;
        // }, 10);
    }
}

class _Animation {
    #frames = [];
    #frame = 0;
    #image;
    fps = 6;

    #lastTick;

    #totalDelta = 0;

    constructor(frames = []) {
        this.#frames = frames;
    }

    Update(delta) {
        this.#totalDelta += delta;
    
        if (this.#totalDelta > 1 / this.fps) {   
            if (this.#frame >= this.#frames.length - 1) this.#frame = 0;
            else this.#frame++;

            this.#totalDelta -= 1 / this.fps;
        }
    }

    Reset() {
        this.#frame = 0;
    }

    GetImage() {
        return this.#frames[this.#frame];
    }
}

const Game = new class {
    #lastUpdate;
    #lastDisplay;
    #fpses = [];
    #canvas;
    #ctx;
    #World;
    #Player;

    UIObjects = [];

    tileSize = Clamp(64, window.innerWidth / 40, window.innerWidth / 20);

    CanvasChanged = new _Event();

    UIAdded = new _Event();
    UIRemoved = new _Event();

    constructor() {
        this.Camera = {
            position: Vector(0, 0),
            zoom: Vector(2, 2),
            zoomFocus: Vector(window.innerWidth / 2, window.innerHeight / 2)
        }

        this.UI = {
            Add: (UIObj) => {
                if (!UIObj instanceof UIObject) return console.error("Can only add UI Objects.");

                this.UIObjects.push(UIObj);
                this.UIAdded.Fire();
            },

            Remove: (UIObj) => {
                if (!this.UIObjects.includes(UIObj)) return console.error("Can not find UI object, did not remove.");

                this.UIObjects.splice(this.UIObjects.indexOf(UIObj), 1);
                this.UIRemoved.Fire();
            }
        }
    }

    Init() {
        this.SetCanvas(document.querySelector("canvas"));
        
        this.FPS_Counter = new TextLabel(Vector(10,10), Vector(200, 0), "... FPS");
        this.FPS_Counter.outlineThickness = 0;
        this.FPS_Counter.bgOpacity = 0;
        this.FPS_Counter.textAlignX = TextAlignX.Left;
 
        let respawnImage = new Image();
        respawnImage.src = "assets/textures/UI/respawn.png";

        this.RespawnButton = new ImageButton(Vector(window.innerWidth / 2 - 141, window.innerHeight / 2 - 45), Vector(282, 90), respawnImage);
        this.RespawnButton.outlineThickness = 0;
        this.RespawnButton.visible = false;
        this.RespawnButton.enabled = false;
        
        console.log(this.UIObjects);

        this.World = new World();

        let player_x = this.tileSize * 2;
        let player_y = window.innerHeight - this.tileSize * 3;

        this.Player = new Player(Vector(player_x, player_y));
    }

    #ResizeCanvas = () => {
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;

        this.#ctx.imageSmoothingEnabled = false;
    }

    CreateCanvas() {
        this.#canvas = document.createElement("canvas");
        this.#ctx = this.#canvas.getContext("2d");

        this.CanvasChanged.Fire();

        document.body.appendChild(this.#canvas);

        window.addEventListener("resize", this.#ResizeCanvas);
        this.#ResizeCanvas();
    }

    SetCanvas(canvas) {
        try {
            this.#canvas = canvas;
            this.#ctx = this.#canvas.getContext("2d");

            this.CanvasChanged.Fire();

            window.addEventListener("resize", this.#ResizeCanvas);
            this.#ResizeCanvas();

        } catch (e) {
            console.error("Could not set canvas.");
        }
    }

    GetCanvas() {
        return this.#canvas;
    }

    Start = () => {
        requestAnimationFrame(this.#Start);
    }

    #Start = (timestamp) => {
        this.#lastUpdate = timestamp;
        this.#lastDisplay = timestamp;

        requestAnimationFrame(this.#Update);
    }

    #Update = (timestamp) => {
        const delta = (timestamp - this.#lastUpdate) / 1000;
        this.#lastUpdate = timestamp;

        // this.tileSize = Clamp(64, window.innerWidth / 40, window.innerWidth / 20);

        if (!delta || isNaN(delta) || delta < 0 || delta > 1) {
            this.#Draw();
            
            requestAnimationFrame(this.#Update);

            return;
        }

        this.#fpses.push(1 / delta);
        
        if (timestamp - this.#lastDisplay > 200) {
            let totalFPS = 0;

            for (let fps of this.#fpses) totalFPS += fps;

            let FPS = totalFPS / this.#fpses.length;

            this.FPS_Counter.text = Math.round(FPS) + " FPS";

            this.#fpses = [];
            this.#lastDisplay = timestamp;
        }

        this.Player.Update(delta);

        Game.Camera.position.x = Math.round(Game.Camera.position.x);
        Game.Camera.position.y = Math.round(Game.Camera.position.y);

        this.#Draw(delta);

        requestAnimationFrame(this.#Update);
    }

    #Draw = (delta) => {
        this.#ctx.fillStyle = "black";
        this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

        //this.#ctx.resetTransform();
        //this.#ctx.setTransform(this.Camera.zoom.x, 0, 0, this.Camera.zoom.y, 0, 0);

        this.World.Draw(this.#ctx, delta);

        this.Player.Draw(this.#ctx);

        for (let UIObj of this.UIObjects) {
            UIObj.Draw(this.#ctx);
        }
    }
}

window.addEventListener("load", () => {
    Game.Init();
    requestAnimationFrame(Game.Start);
});