import timeWorker from "../timeWorker";
import { Eventjs } from "./event";

const worker = new Worker(timeWorker);

class CountdownTimer extends Eventjs {
  intervalId: number;
  time: number;
  constructor() {
    super("tick", "finished");
    this.intervalId = -1;
    this.time = 0;
  }

  tick = (e: MessageEvent) => {
    this.trigger("tick", this.time);
    if (this.time <= 0) {
      this.trigger("finished");
      this.stop();
    }
    this.time--;
  };

  play(time: number) {
    this.time = time;
    worker.addEventListener("message", this.tick);
  }

  stop() {
    worker.removeEventListener("message", this.tick);
    this.time = 0;
  }
}

export default CountdownTimer;
