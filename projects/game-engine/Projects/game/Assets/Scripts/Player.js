let rIdle1 = new Image();
let rIdle2 = new Image();
rIdle1.src = 'Assets/Textures/right idle 1.png';
rIdle2.src = 'Assets/Textures/right idle 2.png';

let rRun1 = new Image();
let rRun2 = new Image();
let rRun3 = new Image();
let rRun4 = new Image();
let rRun5 = new Image();
rRun1.src = 'Assets/Textures/right run 1.png';
rRun2.src = 'Assets/Textures/right run 2.png';
rRun3.src = 'Assets/Textures/right run 3.png';
rRun4.src = 'Assets/Textures/right run 4.png';
rRun5.src = 'Assets/Textures/right run 5.png';

const Player = new class extends UpdatesEachFrame {
    grounded = false;
    speed = 400;
    jumpPower = 720;
    direction = 'right';
    vel = Vector.zero;
    
    constructor() {
        super();

        this.go = new GameObject(Vector(300, 300), Vector(48, 112));
        this.anims = {
            left: {
                idle: new _Animation(),
                run: new _Animation(),
                jump: new _Animation(),
                fall: new _Animation()
            },

            right: {
                idle: new _Animation([rIdle1, rIdle2]),
                run: new _Animation([rRun1, rRun2, rRun3, rRun4, rRun5]),
                jump: new _Animation(),
                fall: new _Animation()
            }
        }

        this.anims.right.idle.fps = 2;
        this.anims.right.run.fps = 6;

        this.anim = this.anims[this.direction].idle;
    }

    Update(delta) {
        let hMovement = Input.GetAxisRaw('Horizontal');

        this.vel.x = hMovement * this.speed;

        if (this.vel.x) {
            this.anim = this.anims[this.direction].run;
        }

        if (this.vel.y < Game.Settings.TerminalVel) {
            this.vel.y += Game.Settings.Gravity;
        }

        this.grounded = false;

        if (this.go.position.y + this.vel.y * delta > 500) {
            this.vel.y = (500 - this.go.position.y) / delta;

            this.grounded = true;
        }

        if (!this.anim.playing) this.anim.Play();

        this.go.image = this.anim.GetImage();

        this.go.position.x += this.vel.x * delta;
        this.go.position.y += this.vel.y * delta;
    }
}