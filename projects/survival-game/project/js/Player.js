class Player extends Entity {
    speed = 350;
    jumpPower = 550;
    blockSelected = false;
    airSelected = true;
    selectedBlock;
    selectionRect;
    selectionRect;
    direction = "right";
    velX = 0;
    velY = 0;
    grounded = false;
    _animation = "idle";

    Inventory = [ new Array(5), new Array(5), new Array(5), new Array(5) ];
    Hotbar = [];

    InventoryUI = [
        new ImageLabel((NativeWidth - 380) / 2, (NativeHeight - 360) / 2, 380, 360, Images.UI.inventory),
    ];

    inventoryOpen = false;

    #hitboxOffsetX = 0;

    constructor(x, y, w, h) {
        super(x, y, w, h);

        let images = Images.player;
        //this.#hitboxOffsetX = 2 * (this.w / Images.player.left.idle[0].width);
        
        this.animations = {
            left: {
                idle: new _Animation(images.left.idle, 1),
                run: new _Animation(images.left.run),
                jump: new _Animation(images.left.jump),
                fall: new _Animation(images.left.fall, 1)
            },

            right: {
                idle: new _Animation(images.right.idle, 1),
                run: new _Animation(images.right.run),
                jump: new _Animation(images.right.jump),
                fall: new _Animation(images.right.fall, 1)
            }
        }

        this.animation = this.animations.right.idle;

        Input.Mouse1Down.AddListener(() => {
            if (this.blockSelected && !this.airSelected) {
                World.RemoveBlock(this.selectedBlock);
            }
        });

        Input.Mouse2Down.AddListener(() => {
            let mousePos = Input.GetMousePosition();

            mousePos.x = Math.floor((mousePos.x + CameraPosition.x) / blockSize);
            mousePos.y = Math.floor((mousePos.y + CameraPosition.y) / blockSize);

            if (this.blockSelected && this.airSelected && !RectIntersection(this, this.selectionRect) && mousePos.x >= 0 && mousePos.x < worldLength && mousePos.y > 0) {
                World.AddBlock(mousePos, "dirt");
            }
        });

        Input.KeyDown.AddListener((key) => {
            if (key == "E") this.inventoryOpen = !this.inventoryOpen;
        });
    }

    Update(delta) {
        this.velX = Input.GetAxisRaw("Horizontal") * this.speed;

        this.velY += Gravity * delta;
        if (this.velY > TerminalVelocity) this.velY = TerminalVelocity;

        if (Input.GetAxisRaw("Vertical") > 0 && this.grounded) this.velY = -this.jumpPower;

        let hitbox = Rect(
            this.x + this.#hitboxOffsetX,
            this.y,
            this.w - this.#hitboxOffsetX * 2,
            this.h
        );

        let nextFrameX = Rect(hitbox.x + this.velX * delta, hitbox.y, hitbox.w, hitbox.h);
        let nextFrameY = Rect(hitbox.x, hitbox.y + this.velY * delta, hitbox.w, hitbox.h);

        this.grounded = false;

        for (let block of World.blocks) {
            if (!block.collidable) continue;

            if (RectIntersection(block, nextFrameX)) {
                if (this.velX >= 0) {
                    this.velX = (block.left() - hitbox.right()) / delta;

                } else {
                    this.velX = (block.right() - hitbox.left()) / delta;
                    nextFrameX.x = this.x + this.velX * delta;
                }
            }

            if (RectIntersection(block, nextFrameY)) {
                if (this.velY >= 0) {
                    this.velY = (block.top() - this.bottom()) / delta;
                    this.grounded = true;
                    
                } else {
                    this.velY = (block.bottom() - this.top()) / delta;
                    nextFrameY.y = this.y + this.velY * delta;
                }
            }
        }

        this._animation = "idle";

        if (this.velX > 0) this.direction = "right";
        else if (this.velX < 0) this.direction = "left";

        if (this.velX != 0 && this.grounded) this._animation = "run";

        if (this.velY > 0) this._animation = "fall";
        else if (this.velY < 0) this._animation = "jump";

        let mousePos = Input.GetMousePosition();

        mousePos.x = Math.floor((mousePos.x + CameraPosition.x) / blockSize);
        mousePos.y = Math.floor((mousePos.y + CameraPosition.y) / blockSize);

        this.blockSelected = false;
        this.selectedBlock = undefined;
        this.airSelected = true;

        this.selectionRect = Rect(mousePos.x * blockSize, mousePos.y * blockSize , blockSize, blockSize);

        try {
            this.selectedBlock = World.blockAtPosition[mousePos.y][mousePos.x];
        
        } catch (e) {}

        if (this.selectedBlock) {
            this.blockSelected = true;
            this.airSelected = false;
        }

        if (!this.selectedBlock) {
            try {
                if (
                World.blockAtPosition[mousePos.y + 1][mousePos.x] ||
                World.blockAtPosition[mousePos.y - 1][mousePos.x] ||
                World.blockAtPosition[mousePos.y][mousePos.x + 1] ||
                World.blockAtPosition[mousePos.y][mousePos.x - 1]
                ) {
                    this.selectionRect = Rect(mousePos.x * blockSize, mousePos.y * blockSize, blockSize, blockSize);
                    this.blockSelected = true;
                }

            } catch(e) {}
        }

        if (this.blockSelected) {
            if (DistanceBetween(this.center(), this.selectionRect.center()) > blockSize * 5) {
                this.blockSelected = false;
            }
            
            // checking if a block is in the way of the block the mouse is selecting
            if (this.x > this.selectionRect.x) {
                if (
                World.Raycast({ x: this.x, y: this.y }, { x: this.selectionRect.x, y: this.selectionRect.y }, [this.selectedBlock]) &&
                World.Raycast({ x: this.x, y: this.y }, { x: this.selectionRect.right(), y: this.selectionRect.y }, [this.selectedBlock]) &&
                World.Raycast({ x: this.x, y: this.y }, { x: this.selectionRect.x, y: this.selectionRect.bottom() }, [this.selectedBlock]) &&
                World.Raycast({ x: this.x, y: this.y }, { x: this.selectionRect.right(), y: this.selectionRect.bottom() }, [this.selectedBlock])
                ) {
                    this.blockSelected = false;
                }

            } else if (this.x < this.selectionRect.x) {
                if (
                World.Raycast({ x: this.right(), y: this.y }, { x: this.selectionRect.x, y: this.selectionRect.y }, [this.selectedBlock]) &&
                World.Raycast({ x: this.right(), y: this.y }, { x: this.selectionRect.right(), y: this.selectionRect.y }, [this.selectedBlock]) &&
                World.Raycast({ x: this.right(), y: this.y }, { x: this.selectionRect.x, y: this.selectionRect.bottom() }, [this.selectedBlock]) &&
                World.Raycast({ x: this.right(), y: this.y }, { x: this.selectionRect.right(), y: this.selectionRect.bottom() }, [this.selectedBlock]) &&
                World.Raycast({ x: this.right(), y: this.y }, this.selectionRect.center(), [this.selectedBlock])
                ) {
                    this.blockSelected = false;
                }

            } else {
                if (World.Raycast({ x: this.center().x, y: this.y }, { x: this.selectionRect.center().x, y: this.selectionRect.center().y }, [this.selectedBlock])) {
                    this.blockSelected = false;
                }
            }
        }

        let newAnimation = this.animations[this.direction][this._animation];
        if (this.animation != newAnimation) this.animation = newAnimation;

        this.animation.Update(delta);
        this.image = this.animation.GetImage();

        this.x += this.velX * delta;
        this.y += this.velY * delta;
    }

    Draw(ctx) {
        super.Draw(ctx);

        if (this.blockSelected) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.strokeRect(this.selectionRect.x + 1, this.selectionRect.y + 1, blockSize - 2, blockSize - 2);
        }

        if (this.inventoryOpen) {
            for (let uiObject of this.InventoryUI) {
                uiObject.Draw(ctx);
            }
        }        
    }
}