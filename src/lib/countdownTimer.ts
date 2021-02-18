import { Eventjs } from "./event"

class CountdownTimer extends Eventjs {
    intervalId: number
    constructor() {
        super('tick', 'finished')
        this.intervalId = -1
    }

    play(time: number) {
        this.stop()

        let start = Date.now(),
            diff
        const timer = () => {
            // get the number of seconds that have elapsed since 
            // startTimer() was called
            diff = time - (((Date.now() - start) / 1000) | 0);

            // does the same job as parseInt truncates the float
            // minutes = (diff / 60) | 0;
            // seconds = (diff % 60) | 0;

            // minutes = minutes < 10 ? "0" + minutes : minutes;
            // seconds = seconds < 10 ? "0" + seconds : seconds;
            this.trigger('tick', diff)
            if (diff <= 0) {
                // add one second so that the count down starts at the full duration
                // example 05:00 not 04:59
                start = Date.now() + 1000;
                this.stop()

                this.trigger('finished')
            }
        };
        // we don't want to wait a full second before the timer starts
        timer();
        this.intervalId = window.setInterval(timer, 1000);


    }

    stop() {
        clearInterval(this.intervalId)
    }

}

export default CountdownTimer