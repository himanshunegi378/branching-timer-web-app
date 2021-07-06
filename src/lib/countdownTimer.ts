import timeWorker from "../timeWorker"
import { Eventjs } from "./event"

const worker = new Worker(timeWorker)

class CountdownTimer extends Eventjs {
    private time: number
    private playing: boolean
    constructor() {
        super("tick", "finished")
        this.time = 0
        this.playing = false //to prevent triggering finished event more than once
    }

    tick = (e: MessageEvent) => {
        //wrapped in settimeout so if there are many eventlistenere on worker
        //they dont block the code
        setTimeout(() => {
            if (this.time < 0) {
                if (this.playing) {
                    this.stop()
                    this.trigger("finished")
                }
            } else {
                this.trigger("tick", this.time)
            }
            this.time--
        }, 0)
    }

    play(time: number) {
        this.time = time
        this.playing = true
        worker.addEventListener("message", this.tick)
    }

    stop() {
        worker.removeEventListener("message", this.tick)
        this.playing = false
        this.time = 0
    }
}

export default CountdownTimer
