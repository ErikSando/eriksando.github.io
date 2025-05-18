class _Animation {
    #frames = [];
    #frame = 0;
    #image;
    playing = false;
    paused = false;
    fps = 12;

    constructor(frames = []) {
        this.#frames = frames;

        if (this.#frames.length) this.#image = this.#frames[0];
    }

    Play() {
        if (!this.#frames.length || this.playing) return;

        if (!this.paused) {
            this.#frame = 0;
            this.#image = this.#frames[this.#frame];
        }

        this.paused = false;
        this.playing = true;

        const nextFrame = () => {
            if (this.paused) return;
            if (!this.playing) {
                this.#frame = 0;
                this.#image = this.#frames[this.#frame];

                return;
            }

            if (this.#frame >= this.#frames.length - 1) {
                this.playing = false;
                this.paused = false;
                
                return;
            }

            this.#frame++;
            this.#image = this.#frames[this.#frame];

            setTimeout(nextFrame, 1000 / this.fps);
        }

        setTimeout(nextFrame, 1000 / this.fps);
    }

    Pause() {
        this.paused = true;
    }

    Stop() {
        this.playing = false;
    }

    SetFrame(n) {
        if (typeof n != 'number' || Math.floor(n) != n) return console.error('Can only set the frame to an integer.');
        if (n >= this.#frames.length) return console.error('Number is too high, cannot set frame.');

        this.#frame = n;
    }

    GetImage() {
        return this.#image;
    }
}

const Settings = Object.freeze({
    Gravity: 100,
    TerminalVel: 2000
});

window.addEventListener('load', () => {
    let canvas = document.querySelector('canvas');
    
    if (!canvas) {
        canvas = document.createElement('canvas');

        document.body.appendChild(canvas);
    }

    let ctx = canvas.getContext('2d');

    function Resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    Resize();

    window.addEventListener('resize', Resize);

    const NativeWidth = 1920;
    const NativeHeight = 1080;
    const TileSize = 120;

    const Camera = {
        x: 0,
        y: 0
    }

    let lastupdate;

    function Update(timestamp) {
        const delta = (timestamp - lastupdate) / 1000;
        lastupdate = timestamp;

        console.log(delta);

        if (!delta || isNaN(delta) || delta < 0 || delta > 1) {
            Draw();

            requestAnimationFrame(Update);
        }

        Draw();

        requestAnimationFrame(Update);
    }

    function Draw() {
        ctx.resetTransform();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        ctx.setTransform(
            window.innerWidth / NativeWidth,
            0,
            0,
            window.innerHeight / NativeHeight,
            -Camera.x,
            -Camera.y
        );

        // Draw game objects

        ctx.resetTransform();
        // Draw UI
    }

    lastupdate = performance.now();
    requestAnimationFrame(Update);
});