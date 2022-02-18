class Timer {
    constructor() {
        this.millisecs = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.running = false;
        this.wait = 10;
    }

    start() {
        this.running = true;

        this.updateTime();
    }

    stop() {
        this.running = false;
    }

    updateTime() {
        if (!this.running) return;
        
        this.millisecs += 1;

        // If a second has past
        if (this.millisecs == 100) {
            this.millisecs = 0;
            this.seconds += 1;
        }

        // If a minute has passed
        if (this.seconds == 60) {
            this.seconds = 0;
            this.minutes += 1;
        }

        ctx.font = '30px Arial';

        // Call updateTime every 10 milliseconds
        setTimeout('timer.updateTime()', 10);
    }

    getTime() {
        let _millisecs = this.millisecs;
        let _seconds = this.seconds;
        let _minutes = this.minutes;

        // Add a zero if less than ten (i.e. 7 becomes 07)
        if (_millisecs < 10) {
            _millisecs = ('0' + _millisecs).slice(-2);
        }

        if (_seconds < 10) {
            _seconds = ('0' + _seconds).slice(-2);
        }

        if (_minutes < 10) {
            _minutes = ('0' + _minutes).slice(-2);
        }

        return _minutes + ':' + _seconds + ':' + _millisecs;
    }
}