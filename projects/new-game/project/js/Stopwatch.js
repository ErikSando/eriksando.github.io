class Stopwatch {
    constructor() {
        this.time = {
            m: 0,
            s: 0,
            ms: 0
        }
    }

    Update(delta) { // delta = time since last update in seconds
        let ms = delta * 100; // not including the last digit
        let s = 0;
        let m = 0

        while (this.time.ms + ms > 99) {
            ms -= 100;
            s++;
        }

        while (this.time.s + s > 59) {
            s -= 60;
            m++;
        }

        this.time.ms += ms;
        this.time.s += s;
        this.time.m += m;
    }

    GetTime() {
        let ms = Math.round(this.time.ms);
        let s = Math.round(this.time.s);
        let m = Math.round(this.time.m);

        if (ms < 10) ms = "0" + ms;
        if (s < 10) s = "0" + s;
        if (m < 10) m = "0" + m;

        return m + ":" + s + "." + ms;
    }
}