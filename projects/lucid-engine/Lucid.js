// Game engine made by me
// Copyright (c) Lucid Engine 2022

// Create a project with "Create Project.cmd" or by importing this file into a HTML file

console.log('Lucid Engine version 1.0.0');

let canvas, ctx;

let Enum = {
    GuiTypes: {
        Static: 1,
        Button: 2
    },

    TextAllignX: {
        Left: 1,
        Centre: 2,
        Right: 3
    },

    TextAllignY: {
        Top: 1,
        Centre: 2,
        Bottom: 3
    },

    TweenStyle: {
        Linear: 1,
        Exponential: 2,
        Logistic: 3
    },

    TweenDirection: {
        In: 1,
        Out: 2
    }
}

Object.freeze(Enum);

let EngineEvents = {
    EngineLoaded: () => {}
}

function GetMousePositionRect(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    
    return {
        position: {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        },

        scale: {
            x: 1,
            y: 1
        }
    }
}

function RectIntersection(rect1, rect2) {
    if (rect1.position.x + rect1.scale.w <= rect2.position.x
    || rect1.position.x >= rect2.position.x + rect2.scale.w
    || rect1.position.y + rect1.scale.h <= rect2.position.y
    || rect1.position.y >= rect2.position.y + rect2.scale.h) return false;
    
    return true;
}

function CircleIntersection(circ1, circ2) {
    let distanceApartVector = circ1.position.minus(circ2.position);

    return distanceApartVector.magnitude() < circ1.r + circ2.r;
}

function LineIntersection(line1, line2) {
    
}

function LineIntersectionPoint(line1, line2) {
    let x1 = line1.beginPosition.x;
    let y1 = line1.beginPosition.y;
    let x2 = line1.endPosition.x;
    let y2 = line1.endPosition.y;

    let x3 = line2.beginPosition.x;
    let y3 = line2.beginPosition.y;
    let x4 = line2.endPosition.x;
    let y4 = line2.endPosition.y;

    let a1 = y2 - y1;
    let b1 = x1 - x2;
    let c1 = a1 * x1 + b1 * y1;
    let a2 = y4 - y3;
    let b2 = x3 - x4;
    let c2 = a2 * x3 + b2 * y3;
    let denominator = a1 * b2 - a2 * b1;

    return Vector2((b2 * c1 - b1 * c2) / denominator, (a1 * c2 - a2 * c1) / denominator);
}

function CircleAndRectIntersection(circ, rect) {
    let distanceX = Math.abs(circ.position.x - (rect.position.x + rect.scale.x / 2));
    let distanceY = Math.abs(circ.position.y - (rect.position.y + rect.scale.y / 2));

    return Math.pow(distanceX - rect.scale.x / 2, 2) + Math.pow(distanceY - rect.scale.y / 2, 2) < Math.pow(circ.r, 2);
}

function LineAndRectIntersection(line, rect) {
    
}

function RandomInteger(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function Random() {
    return Math.random();
}

function Clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;

    return value;
}

function TextWidth(text, fontSize) {
    if (!typeof text == 'string' || !typeof fontSize == 'number') return 0;

    let previousFont = ctx.font || undefined;
    ctx.font = fontSize + 'px Arial';
    result = ctx.measureText(text).width;
    ctx.font = previousFont;

    return result;
}

class _Vector2 {
    x = 0;
    y = 0;

    constructor(x = 0, y = 0) {
        if (!typeof x == 'number' || !typeof y == 'number') return console.error('X and Y arguments for a Vector2 must be of type "Number"');
        
        this.x = x;
        this.y = y;
    }
    
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalised() {
        return Vector2(this.x / this.magnitude(), this.y / this.magnitude());
    }

    plus(vector) {
        if (!vector instanceof _Vector2) return;

        return Vector2(this.x + vector.x, this.y + vector.y);
    }

    minus(vector) {
        if (!vector instanceof _Vector2) return;

        return Vector2(this.x - vector.x, this.y - vector.y);
    }

    mutliply(vector) {
        if (!vector instanceof _Vector2) return;

        return Vector2(this.x * vector.x, this.y * vector.y);
    }

    divide(vector) {
        if (!vector instanceof _Vector2) return;

        return Vector2(this.x / vector.x, this.y / vector.y);
    }

    plusNum(n) {
        if (!typeof n == 'number') return;

        return Vector2(this.x + n, this.y + n);
    }

    minusNum(n) {
        if (!typeof n == 'number') return;

        return Vector2(this.x - n, this.y - n);
    }

    multiplyNum(n) {
        if (!typeof n == 'number') return;

        return Vector2(this.x * n, this.y * n);
    }

    divideNum(n) {
        if (!typeof n == 'number') return;

        return Vector2(this.x / n, this.y / n);
    }

    absolute() {
        return Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    negated() {
        return Vector2(-this.x, -this.y);
    }
}

function Vector2(x, y) {
    return new _Vector2(x, y);
}

Vector2.ZERO = Vector2(0, 0);
Vector2.UP = Vector2(0, -1);
Vector2.DOWN = Vector2(0, 1);
Vector2.LEFT = Vector2(-1, 0);
Vector2.RIGHT = Vector2(1, 0);

class Scene {
    gameObjects = [];

    constructor(gameObjects = []) {
        this.gameObjects = gameObjects;
    }

    add(gameObject) {
        if (!gameObject instanceof GameObject) return;

        this.gameObjects.push(gameObject);
    }

    remove(gameObject) {
        let idx = this.gameObjects.indexOf(gameObject);
        
        if (this.gameObjects[idx]) this.gameObjects.splice(idx, 1);
    }
}

class SimpleSceneCreator {
    CreateScene(data, tileSize, colour, opacity) {
        let x = 0;
        let y = 0;

        let outputData = [];

        for (let i = 0; i < data.length; i++) {
            x = 0;

            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] == 1) {
                    let tile = new Rectangle(x * tileSize, y * tileSize, tileSize, tileSize, colour, opacity);
                    
                    outputData.push(tile);
                }

                if (data[i][j] == 2) {
                    let tile = new Rectangle(x * tileSize, y * tileSize, tileSize, tileSize, colour, opacity);

                    tile.static = true;
                    outputData.push(tile);
                }

                x++;
            }

            y++;
        }

        return new Scene(outputData);
    }
}

class Game {
    #lastUpdate;

    camOffset = {
        x: 0,
        y: 0
    }

    settings = {
        gravity: 1800,
        maxFall: 4500,
        bgColour: 'whitesmoke'
    }

    displayRect = {
        position: Vector2.ZERO,
        scale: Vector2(window.innerWidth, window.innerHeight)
    }

    running = false;
    guiObjects = [];
    customUpdates = [];

    constructor(scene = new Scene([])) {
        this.scene = scene;

        this.Gui = {
            add: (guiObject) => {
                if (!guiObject instanceof GuiObject) return;

                this.guiObjects.push(guiObject);
            },
            
            remove: (guiObject) => {
                let idx = this.guiObjects.indexOf(guiObject);

                if (this.guiObjects[idx]) this.guiObjects.splice(idx, 1);
            }
        }
    }

    resume() {
        this.running = true;
        this.#lastUpdate = Date.now();

        requestAnimationFrame(this.update);    
    }

    pause() {
        this.running = false;

        cancelAnimationFrame(this.update);
    }

    start() {
        this.resume();
    }

    stop() {
        this.pause();
    }

    update = (time) => {
        let dt = (time - this.#lastUpdate) / 1000;
        this.#lastUpdate = time;

        if (!dt || dt < 0 || dt > 5) {
            requestAnimationFrame(this.update);

            return;
        }

        for (let i = 0; i < this.scene.gameObjects.length; i++) {
            if (this.scene.gameObjects[i].static) continue;

            this.scene.gameObjects[i].update(dt);
        }

        for (let i = 0; i < this.customUpdates.length; i++) {
            try {
                this.customUpdates[i](dt);
            } finally {
                continue;
            }
        }

        for (let i = 0; i < this.guiObjects; i++) {
            if (this.guiObjects[i].visible) this.guiObjects[i].update();
        }

        this.#draw();

        requestAnimationFrame(this.update);
    }

    #draw = () => {
        ctx.fillStyle = this.settings.bgColour;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < this.scene.gameObjects.length; i++) this.scene.gameObjects[i].draw();

        for (let i = 0; i < this.guiObjects; i++) {
            if (this.guiObjects[i].visible && RectIntersection()) this.guiObjects[i].draw();
        }
    }
}

const game = new Game();

class _Raycast {
    constructor(beginX, beginY, endX, endY) {
        this.beginPosition = Vector2(beginX, beginY);
        this.endPosition = Vector2(endX, endY);

        let result = [];

        for (let i = 0; i < game.scene.gameObjects.length; i++) {
            if (LineAndRectIntersection(this, game.scene.gameObjects[i])) {
                result.push(game.scene.gameObjects[i]);
            }
        }

        return result;
    }
}

function Raycast(beginX, beginY, endX, endY) {
    return new _Raycast(beginX, beginY, endX, endY);
}

class _Segment {
    constructor(beginX, beginY, endX, endY) {
        this.beginPosition = Vector2(beginX, beginY);
        this.endPosition = Vector2(endX, endY);
    }
}

function Segment(beginX, beginY, endX, endY) {
    return new _Segment(beginX, beginY, endX, endY);
}

let vector = Vector2(3, 3)

let tweenInfo = [
    vector,
    Enum.TweenStyle.Linear,
    Enum.TweenDirection.In,
    1,
    Vector2(8, 6)
];

class Tween {
    constructor(info) {
        this.info = info;
        this.fps = 60;
    }

    Play() {
        let startPos = this.info[0];
        let style = this.info[1];
        let direction = this.info[2];
        let time = this.info[3];
        let endPos = this.info[4];
        let fps = this.fps * time;
        let moves = 0;

        let movementMap = [];

        let distance = startPos.minus(endPos).absolute().magnitude()

        if (direction == Enum.TweenDirection.In) {
            if (style == Enum.TweenStyle.Linear) {

            } else if (style == Enum.TweenStyle.Linear) {
                for (let i = 0; i < fps; i++) {
                    startPos = startPos.plus(distance.divide(fps))
                }
            } else if (style == Enum.TweenStyle.Exponential) {
                
            }
        }
        

        for (let i = 0; i < this.fps; i++) {
            startPos = startPos.plus(movementMap[i]);

            console.log(startPos);
        }

        startPos = endPos;
        
        console.log(startPos);
    }
}

let testLinearTween = new Tween(tweenInfo);

testLinearTween.Play();

class InputHandler {
    #keysDown = {
        W: false,
        A: false,
        S: false,
        D: false,
        Up: false,
        Down: false,
        Left: false,
        Right: false,
        Space: false,
        Shift: false,
        Ctrl: false
    }

    #rawAxisDirections = {
        Horizontal: 0,
        Vertical: 0
    }

    OnKeyDown = {
        W: () => {},
        A: () => {},
        S: () => {},
        D: () => {},
        Up: () => {},
        Down: () => {},
        Left: () => {},
        Right: () => {},
        Space: () => {},
        Shift: () => {},
        Control: () => {},
        Escape: () => {}
    }

    OnKeyUp = {
        W: () => {},
        A: () => {},
        S: () => {},
        D: () => {},
        Up: () => {},
        Down: () => {},
        Left: () => {},
        Right: () => {},
        Space: () => {},
        Shift: () => {},
        Control: () => {},
        Escape: () => {}
    }

    OnRawMovementKeyDown = {
        Up: () => {},
        Down: () => {},
        Left: () => {},
        Right: () => {}
    }

    OnRawMovementKeyUp = {
        Up: () => {},
        Down: () => {},
        Left: () => {},
        Right: () => {}
    }

    constructor() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'w':
                    this.#keysDown.W = true;
                    this.#rawAxisDirections.Vertical -= 1;

                    try {
                        this.OnKeyDown.W();
                        this.OnRawMovementKeyDown.Up();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'a':
                    this.#keysDown.A = true;
                    this.#rawAxisDirections.Horizontal -= 1;

                    try {
                        this.OnKeyDown.A();
                        this.OnRawMovementKeyDown.Left();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
                    
                case 's':
                    this.#keysDown.S = true;
                    this.#rawAxisDirections.Vertical += 1;

                    try {
                        this.OnKeyDown.S();
                        this.OnRawMovementKeyDown.Down();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'd':
                    this.#keysDown.D = true;
                    this.#rawAxisDirections.Horizontal += 1;

                    try {
                        this.OnKeyDown.D();
                        this.OnRawMovementKeyDown.Right();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'ArrowUp':
                    this.#keysDown.Up = true;
                    this.#rawAxisDirections.Vertical -= 1;

                    try {
                        this.OnKeyDown.Up();
                        this.OnRawMovementKeyDown.Up();
                    } catch (err) {
                        throw new Error(err);
                    }

                    break;
    
                case 'ArrowLeft':
                    this.#keysDown.Left = true;
                    this.#rawAxisDirections.Horizontal -= 1;

                    try {
                        this.OnKeyDown.Left();
                        this.OnRawMovementKeyDown.Left();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
    
                case 'ArrowRight':
                    this.#keysDown.Right = true;
                    this.#rawAxisDirections.Horizontal += 1;

                    try {
                        this.OnKeyDown.Right();
                        this.OnRawMovementKeyDown.Right();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'ArrowDown':
                    this.#keysDown.Down = true;
                    this.#rawAxisDirections.Vertical += 1;

                    try {
                        this.OnKeyDown.Down();
                        this.OnRawMovementKeyDown.Down();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case ' ':
                    this.#keysDown.Space = true;

                    try {
                        this.OnKeyDown.Space();
                        this.OnRawMovementKeyDown.Up();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'Shift':
                    this.#keysDown.Shift = true;

                    try {
                        this.OnKeyDown.Shift();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
            
                case 'Control':
                    this.#keysDown.Ctrl = true;

                    try {
                        this.OnKeyDown.Control();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'Escape':    
                    try {
                        this.OnKeyDown.Escape();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
            }

            for (const [key] of Object.entries(this.#rawAxisDirections)) {
                this.#rawAxisDirections[key] = Clamp(this.#rawAxisDirections[key], -1, 1);
            }
        });

        document.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'w':
                    this.#keysDown.W = false;
                    this.#rawAxisDirections.Vertical += 1;

                    try {
                        this.OnKeyUp.W();
                        this.OnRawMovementKeyUp.Up();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'a':
                    this.#keysDown.A = false;
                    this.#rawAxisDirections.Horizontal += 1;

                    try {
                        this.OnKeyUp.A();
                        this.OnRawMovementKeyUp.Left();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
                    
                case 's':
                    this.#keysDown.S = false;
                    this.#rawAxisDirections.Vertical -= 1;

                    try {
                        this.OnKeyUp.S();
                        this.OnRawMovementKeyUp.Down();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'd':
                    this.#keysDown.D = false;
                    this.#rawAxisDirections.Horizontal -= 1;

                    try {
                        this.OnKeyUp.D();
                        this.OnRawMovementKeyUp.Right();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'ArrowUp':
                    this.#keysDown.Up = false;
                    this.#rawAxisDirections.Vertical += 1;
                    break;
    
                case 'ArrowLeft':
                    this.#keysDown.Left = false;
                    this.#rawAxisDirections.Horizontal += 1;

                    try {
                        this.OnKeyUp.Left();
                        this.OnRawMovementKeyUp.Left();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
    
                case 'ArrowRight':
                    this.#keysDown.Right = false;
                    this.#rawAxisDirections.Horizontal -= 1;

                    try {
                        this.OnKeyUp.Right();
                        this.OnRawMovementKeyUp.Right();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'ArrowDown':
                    this.#keysDown.Down = false;
                    this.#rawAxisDirections.Vertical -= 1;

                    try {
                        this.OnKeyUp.Down();
                        this.OnRawMovementKeyUp.Down();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case ' ':
                    this.#keysDown.Space = false;

                    try {
                        this.OnKeyUp.Space();
                        this.OnRawMovementKeyUp.Up();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'Shift':
                    this.#keysDown.Shift = false;

                    try {
                        this.OnKeyUp.Shift();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
            
                case 'Control':
                    this.#keysDown.Control = false;

                    try {
                        this.OnKeyUp.Control();
                    } catch (err) {
                        throw new Error(err);
                    }
                
                break;

                case 'Escape':
                    this.#keysDown.Escape = false;

                    try {
                        this.OnKeyUp.Escape();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
            }

            for (const [key] of Object.entries(this.#rawAxisDirections)) {
                this.#rawAxisDirections[key] = Clamp(this.#rawAxisDirections[key], -1, 1);
            }
        });

        document.addEventListener('mousemove', (e) => {
            for (let i = 0; i < game.guiObjects.length; i++) {
                if (game.guiObjects[i].type == Enum.GuiTypes.Button) {
                    game.guiObjects[i].update(e);
                }       
            }
        });

        document.addEventListener('mousedown', (e) => {
            let mouseRect = GetMousePositionRect(canvas, e);

            switch(e.button) {
                case '0':
                    for (let i = 0; i < game.guiObjects.length; i++) {
                        if (RectIntersection(game.guiObjects[i], mouseRect)) try {
                            game.guiObjects[i].OnLeftMouseButtonDown();
                        } catch (err) {
                            throw new Error(err);
                        }
                    }

                break;
            
                case '2':
                    for (let i = 0; i < game.guiObjects.length; i++) {
                        if (game.guiObjects[i].type == Enum.GuiTypes.Button) {
                            if (RectIntersection(game.guiObjects[i], mouseRect)) try {
                                game.guiObjects[i].OnRightMouseButtonDown();
                            } catch (err) {
                                throw new Error(err);
                            }
                        }
                    }

                break;
            }
        });

        document.addEventListener('mouseup', (e) => {
            let mouseRect = GetMousePositionRect(canvas, e);
            
            e.preventDefault();

            switch(e.button) {
                case '0':
                    for (let i = 0; i < game.guiObjects.length; i++) {
                        if (RectIntersection(game.guiObjects[i], mouseRect)) try {
                            game.guiObjects[i].OnLeftMouseButtonUp();
                        } catch (err) {
                            throw new Error(err);
                        }
                    }

                break;
            
                case '2':
                    for (let i = 0; i < game.guiObjects.length; i++) {
                        if (RectIntersection(game.guiObjects[i], mouseRect)) try {
                            game.guiObjects[i].OnRightMouseButtonUp();
                        } catch (err) {
                            throw new Error(err);
                        }
                    }

                break;
            }
        });

        window.addEventListener('blur', () => {
            for (const [key] of Object.entries(this.#keysDown)) {
                this.#keysDown[key] = false;
            }

            for (const [key] of Object.entries(this.#rawAxisDirections)) {
                this.#keysDown[key] = 0;
            }
        });
    }

    KeyDown(key) {
        if (this.#keysDown[key]) return 1;

        return 0;
    }

    RawMovementKeysDown(direction) {
        switch(direction) {
            case 'Up': 
                if (this.#keysDown.W || this.#keysDown.Up || this.#keysDown.Space) return true;

            return false;

            case 'Down': 
                if (this.#keysDown.S || this.#keysDown.Down) return true;

            return false;

            case 'Left':
                if (this.#keysDown.A || this.#keysDown.Left) return true;

            return false;

            case 'Right':
                if (this.#keysDown.D || this.#keysDown.Right) return true;

            return false;

            default:
                console.error('Unacceptable direction: "' + direction + '"');

            return false;
        }
    }

    GetAxisRaw(direction) {
        return this.#rawAxisDirections[direction];
    }

    AddKeyEvent(key, down, up) {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case key:
                    try {
                        down();
                    } catch (err) {
                        throw new Error(err);
                    }
                
                break;       
            }
        });

        document.addEventListener('keyup', (e) => {
            switch(e.key) {
                case key:
                    try {
                        up();
                    } catch (err) {
                        throw new Error(err);
                    }
                
                break;         
            }
        });
    }
}

const Input = new InputHandler();

class GameObject {
    collisionEnabled = true;
    colour = 'grey';
    opacity = 1;
    static = false;

    destroyed = () => {}

    constructor(x, y, w, h) {
        this.position = Vector2(x, y);
        this.scale = Vector2(w, h);

        game.scene.add(this);
    }

    top() {
        return this.position.y;
    }

    bottom() {
        return this.position.y + this.scale.y;
    }

    left() {
        return this.position.x;
    }

    right() {
        return this.position.x + this.scale.x;
    }

    destroy() {
        game.scene.remove(this);

        try {
            this.destroyed();
        } catch(e) {
            console.error(e);
        } finally {
            delete this;
        }
    }
}

class Rectangle extends GameObject {
    velocity = Vector2.ZERO;
    img = null;

    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    update(dt) {
        if (this.velocity.y < game.settings.maxFall) this.velocity.y += game.settings.gravity;
        else if (this.velocity.y > game.settings.maxFall + game.settings.gravity) this.velocity.y -= game.settings.gravity;

        for (let i = 0; i < game.scene.gameObjects.length; i++) {
            if (RectIntersection(this, game.scene.gameObjects[i])) {
                if (game.scene.gameObjects[i].y < this.position.y) this.velocity.y = game.scene.gameObjects[i].bottom() - this.top();
                else this.velocity.y = game.scene.gameObjects[i].top() - this.bottom();
            }
        }

        this.position.x += this.velocity.x / dt;
        this.position.y += this.velocity.y / dt;
    }

    draw() {
        if (!this.img) {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.position.x - game.camOffset.x, this.position.y - game.camOffset.y, this.scale.x, this.scale.y);
            
            return;
        }

        ctx.drawImage(this.img, this.position.x, this.position.y, this.scale.x, this.scale.y);
    }
}

class Circle extends GameObject {
    velocity = Vector2.ZERO;

    constructor(x, y, r) {
        super(x, y);
        this.r = r;
    }

    top() {
        return this.y - this.r;
    }

    bottom() {
        return this.y + this.r;
    }

    left() {
        return this.x - this.r;
    }

    right() {
        return this.x + this.r;
    }

    update() {
        if (this.velocity.y < game.settings.maxFall) this.velocity.y += game.settings.gravity;
        else if (this.velocity.y > game.settings.maxFall + game.settings.gravity) this.velocity.y -= game.settings.gravity;

        for (let i = 0; i < game.scene.gameObjects.length; i++) {
            if (CircleAndRectIntersection(this, game.scene.gameObjects[i])) {
                if (game.scene.gameObjects[i].top() < this.top()) this.velocity.y = game.scene.gameObjects[i].bottom() - this.top();
                else this.velocity.y = game.scene.gameObjects[i].top() - this.bottom();
            }
        }

        this.position.x += this.velocity.x / dt;
        this.position.y += this.velocity.y / dt;
    }

    draw() {

    }
}

class GuiObject {
    visible = true;
    bgOpacity = 1;
    bgColour = 'rgb(200, 200, 200)';
    outlineSize = 0;
    outlineColour = 'rgb(150, 150, 150)';
    font = 'Arial';
    fontSize = '15px';
    text = '';
    textColour = 'whitesmoke';
    textAllignX = Enum.TextAllignX.Left;
    textAllignY = Enum.TextAllignY.Centre;
    textPadding = 3;
    textScaled = true;
    textPosition = Vector2.ZERO;

    constructor(x, y, w, h, type) {
        this.position = Vector2(x, y);
        this.scale = Vector2(w, h);
        this.type = type;
        this.colour = this.bgColour;
        
        game.Gui.add(this);
    }

    draw() {
        ctx.globalAlpha = this.bgOpacity;
        ctx.fillStyle = this.outlineColour;
        ctx.fillRect(this.position.x - this.outlineSize, ths.position.y - this.outlineSize, this.scale.x + this.outlineSize * 2, this.scale.y + this.outlineSize * 2);
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.position.x, this.position.y, this.scale.x, this.scale.y);

        if (this.hasText) {
            if (textScaled) this.fontSize = Math.min(this.scale.x - this.textPadding / 2, this.scale.y - this.textPadding / 2);
            
            if (this.textAllignX == Enum.TextAllignX.Centre) {
                this.textPosition.x = this.scale.x / 2 - ctx.measureText(this.text).width / 2;
            } else if (this.textAllignX == Enum.TextAllignX.Right) {
                this.textPosition.x = this.scale.x - ctx.measureText(this.text) - this.textPadding;
            } else {
                this.textPosition.x = this.textPadding;
            }

            if (this.textCentredY == Enum.TextAllignY.Top) {
                this.textPosition.y = this.textPadding;
            } else if (this.textAllignY == Enum.TextAllignY.Bottom) {
                this.textPosition.y = this.scale.y - this.fontSize - this.textPadding;
            } else {
                this.textPosition.y = this.scale.y / 2 - this.fontSize / 2;
            }

            ctx.font = this.fontSize + 'px ' + this.font;
            ctx.fillText(this.text, this.position.x + this.textPosition.x, this.position.y + this.textPosition.y + (this.fontSize + (this.scale.y - this.fontSize) / 2));
        }
    }

    destroy() {
        game.Gui.remove(this);

        delete this;
    }
}

class Frame extends GuiObject {
    constructor(x, y, w, h) {
        super(x, y, w, h, Enum.GuiTypes.Static);
        
        this.hasText = false;
    }
}

class TextButton extends GuiObject {
    OnLeftMouseButtonDown = () => {}
    OnLeftMouseButtonUp = () => {}

    OnRightMouseButtonDown = () => {}
    OnRightMouseButtonUp = () => {}

    constructor(text, x, y, w, h, font, fontSize) {
        super(x, y, w, h, Enum.GuiTypes.Button);

        this.text = text;
        this.textPos = Vector(0, fontSize);
        this.hasText = true;
        this.font = font;
        this.fontSize = fontSize;

        this.mouseOverColour = this.bgColour;
        this.onClickColour = this.bgColour;
    }

    update(e) {
        let mouseRect = GetMousePositionRect(canvas, e);

        if (RectIntersection(this, mouseRect)) {
            this.colour = this.mouseOverColour;
        } else this.colour = this.bgColour;
    }
}

class ImageButton extends GuiObject {
    OnLeftMouseButtonDown = () => {}
    OnLeftMouseButtonUp = () => {}

    OnRightMouseButtonDown = () => {}
    OnRightMouseButtonUp = () => {}

    constructor(img, x, y, w, h) {
        super(x, y, w, h, Enum.GuiTypes.Button);

        this.img = img;
        this.hasText = false;
    }

    draw() {
        ctx.globalAlpha = this.bgOpacity;
        ctx.fillStyle = this.outlineColour;
        ctx.fillRect(this.position.x - this.outlineSize, this.position.y - this.outlineSize, this.scale.x + this.outlineSize * 2, this.scale.y + this.outlineSize * 2);
        ctx.drawImage(this.img, this.position.x, this.position.y, this.scale.x, this.scale.y);
    }
}

class TextLabel extends GuiObject {
    constructor(text, x, y, w, h, font, fontSize) {
        super(x, y, w, h, Enum.GuiTypes.Static);

        this.text = text;
        this.hasText = true;
        this.font = font;
        this.fontSize = fontSize;
    }
}

class ImageLabel extends GuiObject {
    constructor(img, x, y, w, h) {
        super(x, y, w, h, Enum.GuiTypes.Static);

        this.img = img;
        this.hasText = false;
    }

    draw() {
        ctx.globalAlpha = this.bgOpacity;
        ctx.fillStyle = this.outlineColour;
        ctx.fillRect(this.position.x - this.outlineSize, this.position.y - this.outlineSize, this.scale.x + this.outlineSize * 2, this.scale.y + this.outlineSize * 2);
        ctx.drawImage(this.img, this.position.x, this.position.y, this.scale.x, this.scale.y);
    }
}

document.oncontextmenu = (e) => {
    e.preventDefault();
}

window.addEventListener('load', () => {
    canvas = document.querySelector('canvas');
    
    if (!canvas) {
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
    }

    ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    window.addEventListener('resize', () => {
        game.displayRect = {
            position: Vector2.ZERO,
            scale: Vector2(window.innerWidth, window.innerHeight)
        }

		ctx.imageSmoothingEnabled = false;
	});

    EngineEvents.EngineLoaded();
});
