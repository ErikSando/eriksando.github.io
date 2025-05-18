const Stopwatch = new class {
    constructor() {
        this.time = { h: 0, m: 0, s: 0 }
    }

    Update(delta) {
        this.time.s += delta;

        while (this.time.s >= 60) {
            this.time.m++;
            this.time.s -= 60;
        }

        while (this.time.m >= 60) {
            this.time.h++;
            this.time.m -= 60;
        }
    }

    GetTime() {
        let time = "";

        if (this.time.h) time += this.time.h + "h ";
        if (this.time.m) time += this.time.m + "m ";

        time += Math.floor(this.time.s) + "s";

        return time;
    }

    Reset() {
        this.time = { h: 0, m: 0, s: 0 }
    }
}