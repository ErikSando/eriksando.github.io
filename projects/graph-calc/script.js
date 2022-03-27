function factorial(n) {
    let answer = 1;

    if (n == 0 || n == 1) return answer;

    for (let i = 1; i < n + 1; i++) {
        answer *= i;
    }
        
    return answer; 
}

function sqrt(n) {
    return Math.sqrt(n);
}

function root(n, root) {
    return Math.pow(n, 1 / root);
}

function pow(n, amount) {
    let answer = n;
    
    for (let i = 0; i < amount - 1; i++) {
        answer *= n;
    }

    return answer;
}

window.onload = () => {
    let ruleInput = document.getElementById('rule');
    let gridSizeInput = document.getElementById('grid-size');

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    const BgColour = 'white';
    const GridColour = 'black';
    const LineColour = 'red';
    
    let gridSize = 40;

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

    let rule = '0';

    ruleInput.oninput = () => {
        rule = ruleInput.value;
    }

    gridSizeInput.oninput = () => {
        if (gridSizeInput.value > 100) return;

        gridSize = gridSizeInput.value;
    }

    requestAnimationFrame(draw);

    function draw() {
        ctx.fillStyle = BgColour;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = GridColour;
        ctx.lineWidth = 1;

        for (let i = 0; i < canvas.height; i += canvas.height / gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        for (let i = 0; i < canvas.width; i += canvas.height / gridSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }

        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        let positions = [];

        for (let x = -gridSize; x < gridSize; x++) {
            let yPosition;

            try {
                yPosition = eval(rule);
            } catch (e) {
                console.log(e);
            }

            let position = {
                x: x,
                y: yPosition
            }

            positions.push(position);
        }

        for (let i = 0; i < positions.length; i++) {
            if (i + 1 < positions.length) {
                ctx.strokeStyle = LineColour;
                ctx.lineWidth = 2;

                ctx.beginPath();
                if (positions[i].x == 0) console.log(positions[i], positions[i].x * (canvas.width / gridSize) + canvas.width / 2, -positions[i].y * (canvas.height / gridSize) + canvas.height / 2)
                ctx.moveTo(positions[i].x * (canvas.width / gridSize) + canvas.width / 2, -positions[i].y * (canvas.height / gridSize) + canvas.height / 2);
                ctx.lineTo(positions[i + 1].x * (canvas.width / gridSize) + canvas.width / 2, -positions[i + 1].y * (canvas.height / gridSize) + canvas.height / 2)
                ctx.stroke();
            }
        }

        requestAnimationFrame(draw);
    }
}