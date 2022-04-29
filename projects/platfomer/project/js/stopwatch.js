class Stopwatch {
    #running = false;
    
    constructor() {
        this.millisecs = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.running = false;
        this.wait = 10;
        this.lastUpdate = Date.now();
        this.updateTime(Date.now());
    }

    start() {
        this.#running = true;
    }

    stop() {
        this.#running = false;
    }

    updateTime = (time) => {
        const dt = (time - this.lastUpdate);
        this.lastUpdate = time;
        
        if (!this.#running || !dt || dt < 0 || dt > 1000) return requestAnimationFrame(this.updateTime);

        this.millisecs += dt;

        // If a second has past
        if (this.millisecs >= 1000) {
            this.millisecs -= 1000;
            this.seconds++;
        }

        // If a minute has passed
        if (this.seconds >= 60) {
            this.seconds -= 60;
            this.minutes++;
        }

        requestAnimationFrame(this.updateTime);
    }

    getTime() {
        let _millisecs = Math.floor(this.millisecs);
        let _seconds = this.seconds;
        let _minutes = this.minutes;

        if (_millisecs < 10) {
            _millisecs = '00' + _millisecs;
        } else if (_millisecs < 100) {
            _millisecs = '0' + _millisecs;
        }

        if (_seconds < 10) {
            _seconds = '0' + _seconds;
        }

        if (_minutes < 10) {
            _minutes = '0' + _minutes;
        }

        return _minutes + ':' + _seconds + ':' + _millisecs;
    }
}