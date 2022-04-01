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

function GetMouseRect(canvas, e) {
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

function Vector2(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

Vector2.prototype = {
    magnitude: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    normalised: function () {
        return new Vector2(this.x / this.magnitude(), this.y / this.magnitude());
    },

    add: function (vector) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    },

    subtract: function (vector) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }
}

Vector2.ZERO = new Vector2(0, 0);
Vector2.UP = new Vector2(0, -1);
Vector2.DOWN = new Vector2(0, 1);
Vector2.LEFT = new Vector2(-1, 0);
Vector2.RIGHT = new Vector2(1, 0);

class Scene {
    constructor(gameObjects) {
        this.gameObjects = gameObjects || [];
    }

    add(gameObject) {
        this.gameObjects.push(gameObject);
    }

    remove(gameObject) {
        this.gameObjects.splice(gameObject);
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
    #guiObjects = [];

    camOffset = {
        x: 0,
        y: 0
    }

    settings = {
        gravity: 1800,
        maxFall: 4500,
        bgColour: 'whitesmoke'
    }

    constructor(scene = new Scene([])) {
        this.scene = scene;
        this.running = false;
    }

    addGuiObject(guiObject) {
        this.#guiObjects.push(guiObject);
    }

    removeGuiObject(guiObject) {
        this.#guiObjects.splice(guiObject);
    }

    getGuiObjects() {
        return this.#guiObjects;
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

        for (let i = 0; i < this.#guiObjects; i++) {
            if (this.#guiObjects[i].visible) this.#guiObjects[i].update();
        }

        this.#draw();

        requestAnimationFrame(this.update);
    }

    #draw = () => {
        ctx.fillStyle = this.settings.bgColour;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < this.scene.gameObjects.length; i++) this.scene.gameObjects[i].draw();

        for (let i = 0; i < this.#guiObjects; i++) {
            if (this.#guiObjects[i].visible) this.#guiObjects[i].draw();
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
        ESC: () => {}
    }

    OnRawAxisKeyDown = {
        UP: () => {},
        DOWN: () => {},
        LEFT: () => {},
        RIGHT: () => {}
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
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case 'a':
                    this.#keysDown.a = true;
                    this.#rawAxisKeysDown.left = true;

                    try {
                        this.OnKeyDown.A();
                        this.OnRawAxisKeyDown.LEFT();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
                    
                case 's':
                    this.#keysDown.s = true;
                    this.#rawAxisKeysDown.down = true;

                    try {
                        this.OnKeyDown.S();
                        this.OnRawAxisKeyDown.DOWN();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case 'd':
                    this.#keysDown.d = true;
                    this.#rawAxisKeysDown.right = true;

                    try {
                        this.OnKeyDown.D();
                        this.OnRawAxisKeyDown.RIGHT();
                    } catch (e) {
                        throw new Error(e);
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
                    } catch (e) {
                        throw new Error(e);
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
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case 'ArrowDown':
                    ths.#keysDown.down = true;
                    this.#rawAxisKeysDown.down = true;

                    try {
                        this.OnKeyDown.DOWN();
                        this.OnRawAxisKeyDown.DOWN();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case ' ':
                    this.#keysDown.space = true;
                    this.#rawAxisKeysDown.up = true;

                    try {
                        this.OnKeyDown.SPACE();
                        this.OnRawAxisKeyDown.UP();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case 'Shift':
                    this.#keysDown.shift = true;

                    try {
                        this.OnKeyDown.SHIFT();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
            
                case 'Control':
                    this.#keysDown.ctrl = true;

                    try {
                        this.OnKeyDown.CTRL();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case 'Escape':    
                    try {
                        this.OnKeyDown.ESC();
                    } catch (e) {
                        throw new Error(e);
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
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case 'a':
                    this.#keysDown.a = false;
                    this.#rawAxisKeysDown.left = false;

                    try {
                        this.OnKeyUp.A();
                        this.OnRawAxisKeyUp.LEFT();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
                    
                case 's':
                    this.#keysDown.s = false;
                    this.#rawAxisKeysDown.down = false;

                    try {
                        this.OnKeyUp.S();
                        this.OnRawAxisKeyUp.DOWN();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case 'd':
                    this.#keysDown.d = false;
                    this.#rawAxisKeysDown.right = false;

                    try {
                        this.OnKeyUp.D();
                        this.OnRawAxisKeyUp.RIGHT();
                    } catch (e) {
                        throw new Error(e);
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
                    } catch (e) {
                        throw new Error(e);
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
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case 'ArrowDown':
                    ths.#keysDown.down = false;
                    this.#rawAxisKeysDown.down = false;

                    try {
                        this.OnKeyUp.DOWN();
                        this.OnRawAxisKeyUp.DOWN();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case ' ':
                    this.#keysDown.space = false;
                    this.#rawAxisKeysDown.up = false;

                    try {
                        this.OnKeyUp.SPACE();
                        this.OnRawAxisKeyUp.UP();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case 'Shift':
                    this.#keysDown.shift = false;

                    try {
                        this.OnKeyDown.SHIFT();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
            
                case 'Control':
                    this.#keysDown.ctrl = false;

                    try {
                        this.OnKeyDown.CTRL();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;

                case 'Escape':    
                    try {
                        this.OnKeyDown.ESC();
                    } catch (e) {
                        throw new Error(e);
                    }

                    break;
            }
        });

        document.addEventListener('mousemove', (e) => {
            let guiObjects = game.getGuiObjects();
            
            for (let i = 0; i < guiObjects.length; i++) {
                if (guiObjects[i].type == Enum.GuiTypes.Button) {
                    guiObjects[i].update(e);
                }       
            }
        });

        document.addEventListener('mousedown', (e) => {
            let mouseRect = GetMouseRect(canvas, e);

            switch(e.button) {
                case '0':
                    guiObjects = game.getGuiObjects();

                    for (let i = 0; i < guiObjects.length; i++) {
                        if (RectIntersection(guiObjects[i], mouseRect)) try {
                            guiObjects[i].OnLeftMouseButtonDown();
                        } catch (e) {
                            throw new Error(e);
                        }
                    }

                    break;
            
                case '2':
                    guiObjects = game.getGuiObjects();

                    for (let i = 0; i < guiObjects.length; i++) {
                        if (guiObjects[i].type == Enum.GuiTypes.Button) {
                            if (RectIntersection(guiObjects[i], mouseRect)) try {
                                guiObjects[i].OnRightMouseButtonDown();
                            } catch (e) {
                                throw new Error(e);
                            }
                        }
                    }

                    break;
            }
        });

        document.addEventListener('mouseup', (e) => {
            let mouseRect = GetMouseRect(canvas, e);
            
            e.preventDefault();

            switch(e.button) {
                case '0':
                    guiObjects = game.getGuiObjects();

                    for (let i = 0; i < guiObjects.length; i++) {
                        if (RectIntersection(guiObjects[i], mouseRect)) try {
                            guiObjects[i].OnLeftMouseButtonUp();
                        } catch (e) {
                            throw new Error(e);
                        }
                    }

                    break;
            
                case '2':
                    guiObjects = game.getGuiObjects();

                    for (let i = 0; i < guiObjects.length; i++) {
                        if (RectIntersection(guiObjects[i], mouseRect)) try {
                            guiObjects[i].OnRightMouseButtonUp();
                        } catch (e) {
                            throw new Error(e);
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
}

const Input = new InputHandler();

class GameObject {
    constructor(x, y, w, h) {
        this.position = {
            x: x,
            y: y
        }

        this.scale = {
            x: w,
            y: h
        }

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
        this.position = {
            x: x,
            y: y
        }

        this.scale = {
            x: w,
            y: h
        }

        this.type = type;
        this.colour = this.bgColour;
        
        game.addGuiObject(this);
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
        let mouseRect = GetMouseRect(canvas, e);

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