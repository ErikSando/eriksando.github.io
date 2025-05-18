window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const nativeWidth = 1920;
    const nativeHeight = 1080;
    const aspectRatio = nativeWidth / nativeHeight;

    function Resize() {
        let dominantAxis = (window.innerWidth < window.innerHeight * aspectRatio) ? "x" : "y";

        if (dominantAxis === "x") {
            canvas.width = window.innerWidth;
            canvas.height = window.innerWidth / aspectRatio;

        } else {
            canvas.height = window.innerHeight;
            canvas.width = window.innerHeight * aspectRatio;
        }

        let scale = canvas.width / nativeWidth;
        this.ctx.setTransform(scale, 0, 0, scale, 0, 0);
    }

    window.addEventListener("resize", Resize);
    Resize();

    function Update(timestamp) {
        Draw();

        requestAnimationFrame(Update);
    }

    function Draw() {

    }

    requestAnimationFrame(Update);
});