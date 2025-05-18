let rIdle1 = new Image();
let rIdle2 = new Image();
rIdle1.src = 'Assets/Textures/right idle 1.png';
rIdle2.src = 'Assets/Textures/right idle 2.png';

let lIdle1 = new Image();
let lIdle2 = new Image();
lIdle1.src = 'Assets/Textures/left idle 1.png';
lIdle2.src = 'Assets/Textures/left idle 2.png';

let rJump = new Image();
rJump.src = 'Assets/Textures/right jump.png';

let lJump = new Image();
lJump.src = 'Assets/Textures/left jump.png';

let rFall1 = new Image();
let rFall2 = new Image();
rFall1.src = 'Assets/Textures/right fall 1.png';
rFall2.src = 'Assets/Textures/right fall 2.png';

let lFall1 = new Image();
let lFall2 = new Image();
lFall1.src = 'Assets/Textures/left fall 1.png';
lFall2.src = 'Assets/Textures/left fall 2.png';

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

let lRun1 = new Image();
let lRun2 = new Image();
let lRun3 = new Image();
let lRun4 = new Image();
let lRun5 = new Image();
lRun1.src = 'Assets/Textures/left run 1.png';
lRun2.src = 'Assets/Textures/left run 2.png';
lRun3.src = 'Assets/Textures/left run 3.png';
lRun4.src = 'Assets/Textures/left run 4.png';
lRun5.src = 'Assets/Textures/left run 5.png';

const Player = new class extends UpdatesEachFrame {
    grounded = false;
    speed = 400;
    jumpPower = 720;
    direction = 'right';
    vel = Vector.zero;
    go = new GameObject(Vector(300, 0), Vector(48, 112));
    
    constructor() {
        super();

        this.anims = {
            left: {
                idle: new _Animation([lIdle1, lIdle2]),
                run: new _Animation([lRun1, lRun2, lRun3, lRun4, lRun5]),
                jump: new _Animation([lJump]),
                fall: new _Animation([lFall1, lFall2])
            },

            right: {
                idle: new _Animation([rIdle1, rIdle2]),
                run: new _Animation([rRun1, rRun2, rRun3, rRun4, rRun5]),
                jump: new _Animation([rJump]),
                fall: new _Animation([rFall1, rFall2])
            }
        }

        this.anims.left.idle.fps = 2;
        this.anims.right.idle.fps = 2;
        this.anims.left.run.fps = 6;
        this.anims.right.run.fps = 6;
        this.anims.left.fall.fps = 2;
        this.anims.right.fall.fps = 2;

        this.anim = this.anims[this.direction].idle;
    }

    Update(delta) {
        let hMovement = Input.GetAxisRaw('Horizontal');
        let vMovement = Input.GetAxisRaw('Vertical');

        if (this.vel.y < Game.Settings.TerminalVel) this.vel.y += Game.Settings.Gravity;

        this.vel.x = hMovement * this.speed;

        if (this.vel.x) {
            if (this.vel.x < 0) this.direction = 'left';
            else if(this.vel.x > 0) this.direction = 'right';

            this.anim = this.anims[this.direction].run;
        
        } else this.anim = this.anims[this.direction].idle;

        if ((vMovement == 1 || Input.GetKey('Space')) && this.grounded) this.vel.y = -this.jumpPower;

        this.grounded = false;

        if (this.go.position.y + this.vel.y * delta > 500) {
            this.vel.y = (500 - this.go.position.y) / delta;

            this.grounded = true;
        }

        if (!this.grounded) {
            if (this.vel.y > 0) this.anim = this.anims[this.direction].fall;
            else this.anim = this.anims[this.direction].jump;
        }

        if (!this.anim.playing) this.anim.Play();

        this.go.image = this.anim.GetImage();

        this.go.position.x += this.vel.x * delta;
        this.go.position.y += this.vel.y * delta;

        //this.go.vel.x = this.vel.x;
        //this.go.vel.y = this.vel.y;
    }
}