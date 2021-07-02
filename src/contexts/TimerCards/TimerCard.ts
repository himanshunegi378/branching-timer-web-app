import EventEmitter from "events"
import { v4 } from "uuid"
import { Timer, TimerCard as TimerCardType } from "./TimerCards.types"
export class TimerCard extends EventEmitter {
    timerCardData: TimerCardType
    timerCardId: string
    constructor(timerCardId: string) {
        super()
        this.timerCardId = timerCardId
        this.timerCardData = {
            id: this.timerCardId,
            timerGroup: { id: v4(), name: "unnamed", timers: [] },
            looping: false,
            status: "stopped",
            currentTimer: undefined
        }
    }

    addTimer(timerData: Omit<Timer, "id" | "options">) {
        const { name, time } = timerData
        this.timerCardData?.timerGroup.timers.push({
            id: v4(),
            name: name,
            time: time,
            options: {}
        })
    }

    removeTimer(IdOfTimerToRemove: string) {
        this.timerCardData.timerGroup.timers =
            this.timerCardData?.timerGroup.timers.filter(
                (timer) => timer.id !== IdOfTimerToRemove
            )
    }
}
