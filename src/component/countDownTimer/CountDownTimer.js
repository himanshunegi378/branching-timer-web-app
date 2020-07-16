import { isNumber, isFunction } from "lodash"

export class CountDownTimer {
    constructor() {
        this.id = undefined
    }

    noop = () => { }

    _countDownTimerCore() {
        const startTimer = Date.now();
        let countDownTime = this.seconds;
        let remainingTime = this.seconds;
        const handle = setInterval(() => {
            let delta = Date.now() - startTimer;
            remainingTime = countDownTime - (delta / 1000);
            this.onTick(remainingTime);
            if (remainingTime <= 0) {
                this.onFinished();
            }
        }, 1000);
        return handle;

    }
    start(seconds, onTick, onFinished) {
        if (this.id !== undefined) {
            throw new Error('Timer is already Running')
        }
        if (!isNumber(seconds)) {
            throw new Error(`expected number for seconds paramter but got ${typeof seconds} `)
        }
        if (!isFunction(onTick)) {
            throw new Error('onTick parameter is not a function')
        }
        if (!isFunction(onFinished)) {
            throw new Error('onFinished parameter is not a function')
        }
        if (onTick === undefined && onFinished === undefined) {
            console.warn('onTick and onFinished function are undefined')
        }

        this.seconds = seconds
        this.onTick = onTick || this.noop
        this.onFinished = onFinished || this.noop
        this.id = this._countDownTimerCore(this.seconds, this.onTick, this.onFinished)
        return this.id
    }

    stop() {
        clearInterval(this.id)
        this.id = undefined
    }

    isRunning() {
        return this.id ? true : false
    }
}
