// Load images
let leftIdle = new Image();
let leftRun0 = new Image();
let leftRun1 = new Image();
let leftInAir = new Image();
let rightIdle = new Image();
let rightRun0 = new Image();
let rightRun1 = new Image();
let rightInAir = new Image();
leftIdle.src = 'assets/sprites/leftIdle.png';
leftRun0.src = 'assets/sprites/leftRun0.png';
leftRun1.src = 'assets/sprites/leftRun1.png';
leftInAir.src = 'assets/sprites/leftInAir.png';
rightIdle.src = 'assets/sprites/rightIdle.png';
rightRun0.src = 'assets/sprites/rightRun0.png';
rightRun1.src = 'assets/sprites/rightRun1.png';
rightInAir.src = 'assets/sprites/rightInAir.png';

// Load sounds
let jumpSound = new Audio();
let deathSound = new Audio();
let coinSound = new Audio();
jumpSound.src = 'assets/sounds/jump.wav';
deathSound.src = 'assets/sounds/death.wav';
coinSound.src = 'assets/sounds/coin.wav';

// Sprites opbject
let sprites = {
    'left': {
        'idle': leftIdle,
        'inAir': leftInAir,
        'run': [
            leftRun0,
            leftRun1
        ]
    },
    'right': {
        'idle': rightIdle,
        'inAir': rightInAir,
        'run': [
            rightRun0,
            rightRun1
        ]
    }
}

let gravity = 0;
let step = 0;
let run = 0;

class Player {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.dx = 0;
        this.dy = 0;
        this.direction = 'right';
        this.img = sprites[this.direction].idle;
        this.run = 0;
        this.alive = true;
        this.grounded = false;
        this.xrect = {
            x: this.x + this.dx,
            y: this.y,
            w: this.w,
            h: this.h
        }
        this.yrect = {
            x: this.x,
            y: this.y + this.dy,
            w: this.w,
            h: this.h
        }
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.h
    }

    left() {
        return this.x;
    }

    right() {
        return this.x + this.w;
    }

    jump() {
        if (!this.alive || !this.grounded) return;

        jumpSound.play();
        gravity = -16;
    }

    kill() {
        this.alive = false;

        gravity = 0;
        this.dy = 0;
        this.dx = 0;

        deathSound.play();
    }

    respawn(resetCoins) {
        if (resetCoins) totalCoins -= coins;

        coins = 0;
        world = new World(levelData[level - 1], level);

        cameraOffset = [-player.x + tileSize, -300];
        this.direction = 'right';

        gravity = 0;
        this.dy = 0;
        this.dx = 0;
        
        this.alive = true;
    }
    
    draw() {
        // Display respawn button
        if (!this.alive) {
            ctx.fillStyle = 'white';
            ctx.fillRect(canvas.width / 2 - 70, canvas.height / 2 - 26, 140, 52);
            ctx.fillStyle = 'black';
            ctx.fillRect(canvas.width / 2 - 68, canvas.height / 2 - 24, 136, 48);
            ctx.fillStyle = 'white';
            ctx.fillText('You died!', canvas.width / 2 - 63, canvas.height / 2 - 48);
            ctx.fillText('Respawn', canvas.width / 2 - 63, canvas.height / 2 + 9);

            return;
        }

        // Draw player
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    tick() {
        if (!this.alive) return;

        step += 1;
        if (step > 10) run = 1; else run = 0;
        if (step > 20) step = 0;

        // Reset delta X and Y
        this.dx = 0;
        this.dy = 0;

        // Key handler
        if (leftKey) {
            this.dx -= 7;
            this.direction = 'left';
            this.img = sprites[this.direction].run[run];
        }

        if (rightKey) {
            this.dx += 7;
            this.direction = 'right';
            this.img = sprites[this.direction].run[run];
        }

        if (upKey && this.alive && this.grounded) {
            jumpSound.play();
            gravity = -16;
        }

        if (!leftKey && !rightKey) {
            this.img = sprites[this.direction].idle;
            step = 0;
        }

        // Increase force of gravity
        if (gravity < 15) {
            gravity += 1;
        }

        this.dy += gravity;

        // Update collision rectangles
        this.xrect = {
            x: this.x + this.dx,
            y: this.y,
            w: this.w,
            h: this.h
        }

        this.yrect = {
            x: this.x,
            y: this.y + this.dy,
            w: this.w,
            h: this.h
        }

        this.grounded = false;

        for (let i = 0; i < world.tiles.length; i++) {
            // Rectangle for the block
            let tileRect = {
                x: world.tiles[i][0].x - cameraOffset[0],
                y: world.tiles[i][0].y - cameraOffset[1],
                w: world.tiles[i][0].w,
                h: world.tiles[i][0].h,
                id: world.tiles[i][1],
                top: function() {
                    return world.tiles[i][0].top()
                },
                bottom: function() {
                    return world.tiles[i][0].bottom()
                }
            }

            if (rectIntersection(this.xrect, tileRect)) {
                // Give the player the coin
                if (tileRect.id == 'coin') {
                    coinSound.play();
                    coins++;
                    totalCoins++;

                    world.tiles.splice(i, 1);

                    return;
                }

                // Proceed to next level
                if (tileRect.id == 'portal') {
                    if (level == levelData.length) {
                        leftKey, rightKey, upKey = false;

                        return victory();
                    } else {
                        level += 1;
                    }
                }

                // Kill the player
                if (tileRect.id == 'lava' || tileRect.id == 'enemy') {
                    return player.kill();
                }
                
                // Stop player's X movement
                this.dx = 0;
            }

            if (rectIntersection(this.yrect, tileRect)) {
                // Give the player the coin
                if (tileRect.id == 'coin') {
                    coinSound.play();
                    coins++;
                    totalCoins++;

                    world.tiles.splice(i, 1);

                    return;
                }

                // Kill the player
                if (tileRect.id == 'lava' || tileRect.id == 'enemy') {
                    return player.kill();
                }

                // If the player is on top of block
                if (gravity >= 0) {
                    this.grounded = true;
                    gravity = 0;
                    this.dy = tileRect.top() - this.bottom();
                // If player hit head on bottom of block
                } else {
                    gravity = 0;
                    this.dy = tileRect.bottom() - this.top();
                }
            }
        }

        // if (!this.grounded) {
        //     this.img = sprites[this.direction]['inAir'];
        // }

        // Update camera offset
        cameraOffset[0] += this.dx;
        cameraOffset[1] += this.dy;
        
        // Kill the player if they are in the void
        if (cameraOffset[1] >= 800) {
            this.kill();
        }
    }
}