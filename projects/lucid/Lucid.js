// Game engine made by me
// Copyright (c) Lucid Engine 2022

// Create a project with "Create Project.cmd" or by importing this file into a HTML file

console.log('Lucid Engine version 1.0.0');

let canvas;
let ctx;

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
    }
}

let EngineEvents = {
    EngineLoaded: () => {}
}

Object.freeze(Enum);

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
    let circ1PosVector = Vector2(circ1.x, circ1.y);
    let circ2PosVector = Vector2(circ2.x, circ2.y);
    let distanceApartVector = circ1PosVector.subtract(circ2PosVector);

    if (distanceApartVector.magnitude() < circ1.radius + circ2.radius) return true;

    return false;
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

    add(vector) {
        if (!vector instanceof Vector2) return;

        return Vector2(this.x + vector.x, this.y + vector.y);
    }

    subtract(vector) {
        if (!vector instanceof Vector2) return;

        return Vector2(this.x - vector.x, this.y - vector.y);
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

class _Raycast {
    constructor(beginX, beginY, endX, endY) {
        this.beginPos = {
            x: beginX,
            y: beginY
        }

        this.endPos = {
            x: endX,
            y: endY
        }
    }
}

function Raycast(beginX, beginY, endX, endY) {
    return new _Raycast(beginX, beginY, endX, endY);
}

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
    CreateScene(data, tileSize, colour, transparency) {
        let x = 0;
        let y = 0;

        let outputData = [];

        for (let i = 0; i < data.length; i++) {
            x = 0;

            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] == 1) {
                    let tile = new Rectangle(x * tileSize, y * tileSize, tileSize, tileSize, colour, transparency);
                    
                    outputData.push(tile);
                }

                if (data[i][j] == 2) {
                    let tile = new Rectangle(x * tileSize, y * tileSize, tileSize, tileSize, colour, transparency);

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

    running = false;
    guiObjects = [];

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
            if (this.guiObjects[i].visible) this.guiObjects[i].draw();
        }
    }
}

const game = new Game();

class InputHandler {
    #keysDown = {
        w: false,
        a: false,
        s: false,
        d: false,
        up: false,
        down: false,
        left: false,
        right: false,
        space: false,
        shift: false,
        ctrl: false
    }

    #rawAxisKeysDown = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    OnKeyDown = {
        W: () => {},
        A: () => {},
        S: () => {},
        D: () => {},
        UP: () => {},
        DOWN: () => {},
        LEFT: () => {},
        RIGHT: () => {},
        SPACE: () => {},
        SHIFT: () => {},
        CTRL: () => {},
        ESC: () => {},
    }

    OnKeyUp = {
        W: () => {},
        A: () => {},
        S: () => {},
        D: () => {},
        UP: () => {},
        DOWN: () => {},
        LEFT: () => {},
        RIGHT: () => {},
        SPACE: () => {},
        SHIFT: () => {},
        CTRL: () => {}
    }

    OnRawAxisKeyDown = {
        UP: () => {},
        DOWN: () => {},
        LEFT: () => {},
        RIGHT: () => {}
    }

    OnRawAxisKeyUp = {
        UP: () => {},
        DOWN: () => {},
        LEFT: () => {},
        RIGHT: () => {}
    }

    constructor() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'w':
                    this.#keysDown.w = true;
                    this.#rawAxisKeysDown.up = true;

                    try {
                        this.OnKeyDown.W();
                        this.OnRawAxisKeyDown.UP();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'a':
                    this.#keysDown.a = true;
                    this.#rawAxisKeysDown.left = true;

                    try {
                        this.OnKeyDown.A();
                        this.OnRawAxisKeyDown.LEFT();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
                    
                case 's':
                    this.#keysDown.s = true;
                    this.#rawAxisKeysDown.down = true;

                    try {
                        this.OnKeyDown.S();
                        this.OnRawAxisKeyDown.DOWN();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'd':
                    this.#keysDown.d = true;
                    this.#rawAxisKeysDown.right = true;

                    try {
                        this.OnKeyDown.D();
                        this.OnRawAxisKeyDown.RIGHT();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'ArrowUp':
                    this.#keysDown.up = true;
                    this.#rawAxisKeysDown.up = true;
                    break;
    
                case 'ArrowLeft':
                    this.#keysDown.left = true;
                    this.#rawAxisKeysDown.left = true;

                    try {
                        this.OnKeyDown.LEFT();
                        this.OnRawAxisKeyDown.LEFT();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
    
                case 'ArrowRight':
                    this.#keysDown.right = true;
                    this.#rawAxisKeysDown.right = true;

                    this.#keysDown.space = true;
                    this.#rawAxisKeysDown.up = true;

                    try {
                        this.OnKeyDown.RIGHT();
                        this.OnRawAxisKeyDown.RIGHT();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'ArrowDown':
                    ths.#keysDown.down = true;
                    this.#rawAxisKeysDown.down = true;

                    try {
                        this.OnKeyDown.DOWN();
                        this.OnRawAxisKeyDown.DOWN();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case ' ':
                    this.#keysDown.space = true;
                    this.#rawAxisKeysDown.up = true;

                    try {
                        this.OnKeyDown.SPACE();
                        this.OnRawAxisKeyDown.UP();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'Shift':
                    this.#keysDown.shift = true;

                    try {
                        this.OnKeyDown.SHIFT();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
            
                case 'Control':
                    this.#keysDown.ctrl = true;

                    try {
                        this.OnKeyDown.CTRL();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'Escape':    
                    try {
                        this.OnKeyDown.ESC();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
            }
        });

        document.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'w':
                    this.#keysDown.w = false;
                    this.#rawAxisKeysDown.up = false;

                    try {
                        this.OnKeyUp.W();
                        this.OnRawAxisKeyUp.UP();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'a':
                    this.#keysDown.a = false;
                    this.#rawAxisKeysDown.left = false;

                    try {
                        this.OnKeyUp.A();
                        this.OnRawAxisKeyUp.LEFT();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
                    
                case 's':
                    this.#keysDown.s = false;
                    this.#rawAxisKeysDown.down = false;

                    try {
                        this.OnKeyUp.S();
                        this.OnRawAxisKeyUp.DOWN();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'd':
                    this.#keysDown.d = false;
                    this.#rawAxisKeysDown.right = false;

                    try {
                        this.OnKeyUp.D();
                        this.OnRawAxisKeyUp.RIGHT();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'ArrowUp':
                    this.#keysDown.up = false;
                    this.#rawAxisKeysDown.up = false;
                    break;
    
                case 'ArrowLeft':
                    this.#keysDown.left = false;
                    this.#rawAxisKeysDown.left = false;

                    try {
                        this.OnKeyUp.LEFT();
                        this.OnRawAxisKeyUp.LEFT();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
    
                case 'ArrowRight':
                    this.#keysDown.right = false;
                    this.#rawAxisKeysDown.right = false;

                    this.#keysDown.space = false;
                    this.#rawAxisKeysDown.up = false;

                    try {
                        this.OnKeyUp.RIGHT();
                        this.OnRawAxisKeyUp.RIGHT();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'ArrowDown':
                    ths.#keysDown.down = false;
                    this.#rawAxisKeysDown.down = false;

                    try {
                        this.OnKeyUp.DOWN();
                        this.OnRawAxisKeyUp.DOWN();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case ' ':
                    this.#keysDown.space = false;
                    this.#rawAxisKeysDown.up = false;

                    try {
                        this.OnKeyUp.SPACE();
                        this.OnRawAxisKeyUp.UP();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'Shift':
                    this.#keysDown.shift = false;

                    try {
                        this.OnKeyDown.SHIFT();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
            
                case 'Control':
                    this.#keysDown.ctrl = false;

                    try {
                        this.OnKeyDown.CTRL();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;

                case 'Escape':    
                    try {
                        this.OnKeyDown.ESC();
                    } catch (err) {
                        throw new Error(err);
                    }

                break;
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
    }

    keyDown(key) {
        if (this.#keysDown[key]) return 1;

        return 0;
    }

    rawAxisKeysDown(direction) {
        if (this.#rawAxisKeysDown[direction]) return 1;

        return 0;
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
    destroyed = () => {}

    collisionEnabled = true;

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

        this.destroyed();

        delete this;
    }
}

class Rectangle extends GameObject {
    velocity = Vector2.ZERO;
    static = false;
    img = null;
    colour = 'grey';
    transparency = 0;

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
            ctx.globalAlpha = this.transparency;
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.position.x - game.camOffset.x, this.position.y - game.camOffset.y, this.scale.x, this.scale.y);
            
            return;
        }

        ctx.drawImage(this.img, this.position.x, this.position.y, this.scale.x, this.scale.y);
    }
}

class GuiObject {
    visible = true;
    bgTransparency = 0;
    bgColour = 'rgb(200, 200, 200)';
    type;
    outlineSize = 0;
    outlineColour = 'rgb(150, 150, 150)';
    font = 'Arial';
    fontSize = '15px';
    text;
    textColour = 'whitesmoke';
    textAllignX = Enum.TextAllignX.Left;
    textAllignY = Enum.TextAllignY.Centre;
    textPadding = 3;
    textScaled = true;
    textPosition = {
        x: 0,
        y: 0
    }

    constructor(x, y, w, h, type) {
        this.position = Vector2(x, y);
        this.scale = Vector2(w, h);
        this.type = type;
        this.colour = this.bgColour;
        
        game.Gui.add(this);
    }

    draw() {
        ctx.globalAlpha = this.bgTransparency;
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
        this.textPos = {
            x: 0,
            y: fontSize,
        }

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
        ctx.globalAlpha = this.bgTransparency;
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
        ctx.globalAlpha = this.bgTransparency;
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
		ctx.imageSmoothingEnabled = false;
	});

    EngineEvents.EngineLoaded();
});