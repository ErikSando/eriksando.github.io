window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const output_canvas = document.getElementById("output-canvas");
    const output_ctx = output_canvas.getContext("2d");

    canvas.addEventListener("contextmenu", e => e.preventDefault());

    const gridCheckbox = document.getElementById("show-grid");
    const gridColourPicker = document.getElementById("grid-colour");

    const importButton = document.getElementById("import");
    const fileInput = document.getElementById("file-input");

    importButton.addEventListener("click", () => fileInput.click());

    const classifyButton = document.getElementById("classify");
    const labelElement = document.getElementById("label");
    const classElement = document.getElementById("class");
    const lossElement = document.getElementById("loss");

    const errorText = document.getElementById("error");
    errorCounter = 0;

    function hideError() {
        errorCounter--;
        if (errorCounter) return;
        errorText.textContent = "";
    }

    function error(text) {
        errorCounter += 1
        errorText.textContent = text;
        setTimeout(hideError, 5000);
    }

    let mlp;
    let mlp_output = [];
    // mlp_output = [
    //     0.2, 0.05, 0.05, 1, 0,
    //     0.5, 0.1, 0.9, 0.1, 0.4
    // ];

    ({ mlp, err } = importModel(defaultSource));
    if (err) error(err);

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const filename = file.name;

        const reader = new FileReader();

        let err;

        reader.addEventListener("load", (e) => {
            ({ mlp, err } = importModel(e.target.result));

            if (err) error(err);
        });

        reader.readAsText(file, "UTF-8");
    });

    const nativeW = 1000;
    const nativeH = 1000;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);

        ctx.setTransform(canvas.width / nativeW, 0, 0, canvas.height / nativeH, 0, 0);
        ctx.imageSmoothingEnabled = false;

        const output_rect = output_canvas.getBoundingClientRect();
        const output_dpr = window.devicePixelRatio || 1;

        output_canvas.width = Math.round(output_rect.width * output_dpr);
        output_canvas.height = Math.round(output_rect.height * output_dpr);

        output_ctx.setTransform(output_canvas.width / nativeW, 0, 0, output_canvas.height / nativeH, 0, 0);
        output_ctx.imageSmoothingEnabled = false;
    }

    window.addEventListener("resize", resize);
    resize();

    const grid = new Grid(28, 28, gridCheckbox, gridColourPicker);
    const input = new InputHandler(canvas);

    document.getElementById("clear").addEventListener("click", grid.clear);

    let mouse1Down = false;
    let mouse2Down = false;

    input.mouse1Down.addHandler(() => {
        mouse1Down = true;
        pos = input.getMousePosition();
        grid.drawAt(pos.x, pos.y);
    });

    input.mouse2Down.addHandler(() => {
        mouse2Down = true;
        pos = input.getMousePosition();
        grid.eraseAt(pos.x, pos.y);
    });

    input.mouse1Up.addHandler(() => {
        mouse1Down = false;
    });

    input.mouse2Up.addHandler(() => {
        mouse2Down = false;
    });

    input.mouseMove.addHandler(() => {
        pos = input.getMousePosition();
        if (mouse1Down) grid.drawAt(pos.x, pos.y);
        if (mouse2Down) grid.drawAt(pos.x, pos.y, true);
    });

    classifyButton.addEventListener("click", () => {
        if (!mlp) {
            error("No model has been loaded");
            return;
        }

        mlp_output = mlp.forwardPass(grid.getData());

        let c = mlp.getClassification();
        let loss = mlp.getLoss(labelElement.value);

        classElement.textContent = c;
        lossElement.textContent = loss;
    });

    function update(timestamp) {
        input.update();

        draw();

        requestAnimationFrame(update);
    }

    function draw() {
        ctx.globalAlpha = 1;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, nativeW, nativeH);

        grid.draw(ctx);

        output_ctx.fillStyle = "black";
        output_ctx.strokeStyle = "white";
        output_ctx.lineWidth = 2;
        output_ctx.fillRect(0, 0, nativeW, nativeH);

        output_ctx.beginPath();

        output_ctx.moveTo(100, 100);
        output_ctx.lineTo(100, 900);

        output_ctx.stroke();

        let font_size = 40;

        output_ctx.font = font_size + "px Arial";
        output_ctx.fillStyle = "white";
        output_ctx.textBaseline = "center";

        if (!mlp_output.length) return;

        let n = mlp_output.length;
        let bar_spacing = 800 / n;

        for (let i = 0; i < n; i++) {
            output_ctx.fillText(`${i}`, 40, 100 + font_size / 2 + bar_spacing / 2 + i * 800 / n, 80);
        }

        let hasLabel = false;
        let label = -1;

        if (labelElement.value > 0 && labelElement.value < n) {
            hasLabel = true;
            label = labelElement.value;
        }

        output_ctx.fillStyle = "rgb(0, 100, 255)";

        for (let i = 0; i < n; i++) {
            if (hasLabel && label == i) {
                output_ctx.fillStyle = "rgb(50, 255, 50)";
            }
            else if (hasLabel) {
                output_ctx.fillStyle = "rgb(200, 20, 20)";
            }

            output_ctx.fillRect(100, 100 + bar_spacing / 2 - bar_spacing / 4 + i * bar_spacing, mlp_output[i] * 800, bar_spacing / 2);
        }
    }

    const intervalCheckbox = document.getElementById("interval-checkbox");
    const intervalTime = document.getElementById("interval-time");

    let lastTime = performance.now();

    function intervalPass() {
        let intervalValue = Math.max(10, Number(intervalTime.value)) || Infinity;

        let now = performance.now();
        if (now - lastTime > intervalValue) {
            lastTime += intervalValue;

            if (intervalCheckbox.checked && mlp) {
                mlp_output = mlp.forwardPass(grid.getData());

                let c = mlp.getClassification();
                let loss = mlp.getLoss(labelElement.value);

                classElement.textContent = c;
                lossElement.textContent = loss;
            }
        }

        let timer = Math.min(intervalValue, 500);
        setTimeout(intervalPass, timer);
    }

    let timer = Math.min(intervalTime.value, 500);
    setTimeout(intervalPass, timer);

    requestAnimationFrame(update);
});