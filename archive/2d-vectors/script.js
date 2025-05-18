class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    UP() {
        return new Vector2(0, -1);
    }

    DOWN() {
        return new Vector2(0, 1);
    }

    LEFT() {
        return new Vector2(-1, 0);
    }

    RIGHT() {
         return new Vector2(1, 0);        
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalised() {
        return new Vector2(this.x / this.magnitude(), this.y / this.magnitude());
    }
}

window.onload = () => {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    let bgColour = 'rgb(255, 255, 255)';
    let lineColour = 'rgb(0, 0, 0)';

    let gridSize = 20;

    let vector = new Vector2(1, 1);

    let darkModeEnabled = false;
    let toggleThemeButton = document.getElementById('toggle-theme');

    let darkTheme = window.localStorage.getItem('darkModeEnabled');

    if (darkTheme == 'true') {
        document.body.classList.add('dark-mode');
        darkModeEnabled = true;
        ToggleColours();
    }

    function UpdateCanvasSize() {
        if (window.innerWidth > 2160 + 160 && window.innerHeight > 2160 + 160) {
            canvas.width = 2160;
            canvas.height = 2160;
        } else if (window.innerWidth > 1440 + 160 && window.innerHeight > 1440 + 160) {
            canvas.width = 1440;
            canvas.height = 1440;
        } else if (window.innerWidth > 1080 + 160 && window.innerHeight > 1080 + 160) {
            canvas.width = 1080;
            canvas.height = 1080;
        } else if (window.innerWidth > 720 + 160 && window.innerHeight > 720 + 160) {
            canvas.width = 720;
            canvas.height = 720;
        } else if (window.innerWidth > 480 + 160 && window.innerHeight > 480 + 160) {
            canvas.width = 480;
            canvas.height = 480;
        }
    }

    UpdateCanvasSize();

    window.onresize = () => {
        UpdateCanvasSize();
    }

    document.getElementById('x').oninput = () => {
        vector.x = Number(document.getElementById('x').value);
    }

    document.getElementById('y').oninput = () => {
        vector.y = Number(document.getElementById('y').value);
    }

    document.getElementById('normalise').onclick = () => {
        vector = vector.normalised();

        document.getElementById('x').value = String(vector.x);
        document.getElementById('y').value = String(vector.y);
    }

    toggleThemeButton.onclick = () => {
        document.body.classList.toggle('dark-mode');
        darkModeEnabled = !darkModeEnabled;
        ToggleColours();
    }

    function ToggleColours() {
        window.localStorage.setItem('darkModeEnabled', String(darkModeEnabled));

        if (darkModeEnabled) {
            bgColour = 'rgb(20, 20, 20)';
            lineColour = 'rgb(255, 255, 255)';
            canvas.style.border = '1px solid white';
            toggleThemeButton.value = 'Color Theme: Dark';
        } else {
            bgColour = 'rgb(255, 255, 255)';
            lineColour = 'rgb(0, 0, 0)';
            canvas.style.border = '1px solid black';
            toggleThemeButton.value = 'Color Theme: Light';
        }
    }

    function draw() {
        ctx.fillStyle = bgColour;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = lineColour;

        for (let i = 1; i < canvas.height / gridSize; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * canvas.height / gridSize);
            ctx.lineTo(canvas.width, i * canvas.height / gridSize);
            ctx.stroke();
        }

        for (let i = 1; i < canvas.width / gridSize; i++) {
            ctx.beginPath();
            ctx.moveTo(i * canvas.width / gridSize, 0);
            ctx.lineTo(i * canvas.width / gridSize, canvas.height);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 - 1);
        ctx.lineTo(canvas.width, canvas.height / 2 - 1);
        ctx.moveTo(0, canvas.height / 2 + 1);
        ctx.lineTo(canvas.width, canvas.height / 2 + 1);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 1, 0);
        ctx.lineTo(canvas.width / 2 - 1, canvas.height);
        ctx.moveTo(canvas.width / 2 + 1, 0);
        ctx.lineTo(canvas.width / 2 + 1, canvas.height);
        ctx.stroke();

        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + (vector.x * canvas.width / gridSize), canvas.height / 2 + (-vector.y * canvas.height / gridSize));
        ctx.stroke();

        requestAnimationFrame(draw);
    }

    draw();
}