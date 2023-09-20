const Camera = {
    position: {
        x: 0,
        y: 0
    }
}

window.addEventListener("onload", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let lastUpdate;

    const NativeWidth = 1920;
    const NativeHeight = 1080;
    const AspectRatio = NativeWidth / NativeHeight;

    function Resize() {
        let dominantAxis = window.innerWidth <= window.innerWidth * AspectRatio ? "x" : "y";

        switch (dominantAxis) {
            case "x":
                canvas.width = window.innerWidth;
                canvas.height = window.innerWidth / AspectRatio;
            break;

            case "y":
                canvas.height = window.innerHeight;
                canvas.width = window.innerHeight * AspectRatio;
            break;
        }
    }

    window.addEventListener("resize", Resize);
    Resize();

    function Update(timestamp) {
        const delta = (timestamp - lastUpdate) / 1000;
        lastUpdate = timestamp;

        if (!delta || isNaN(delta) || delta < 0 || delta > 0.1) {
            Draw();
            requestAnimationFrame(Update);
        }
    }

    function Draw() {
        let scale = canvas.width / NativeWidth;

        ctx.setTransform(scale, 0, 0, scale, -Camera.position.x, Camera.position.y);
    }

    function Start(timestamp) {
        lastUpdate = timestamp;

        requestAnimationFrame(Update);
    }

    requestAnimationFrame(Start);
});