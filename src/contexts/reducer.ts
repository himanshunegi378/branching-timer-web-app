import { timer } from "rxjs"
import { v4 } from "uuid"
import { Action, TimerCard } from "./TimerCards.types"

export function timerCardsReducer(
    prevState: Record<string, TimerCard>,
    action: Action
) {
    switch (action.type) {
        case "SETUP_EMPTY_TIMER": {
            const { timerCardId } = action.payload
            const intialTimerCard: TimerCard = {
                timerGroup: { id: v4(), name: "unnamed", timers: [] },
                looping: false,
                status: "stopped",
                currentTimer: undefined
            }
            return { ...prevState, [timerCardId]: intialTimerCard }
        }
        case "ADD_TIMER": {
            const { timerCardId, timerData } = action.payload
            const { name, time } = timerData
            const timerCard = prevState[timerCardId]
            timerCard.timerGroup.timers.push({
                id: v4(),
                name: name,
                time: time
            })
            return { ...prevState }
        }
        case "REMOVE_TIMER": {
            const { timerCardId, timerId } = action.payload
            const timerCard = prevState[timerCardId]
            timerCard.timerGroup.timers = timerCard.timerGroup.timers.filter(
                (timer) => timer.id !== timerId
            )
            return { ...prevState }
        }

        case "EDIT_TIMER": {
            const { timerCardId, timerId, updatedTimerOption } = action.payload
            const timerCard = prevState[timerCardId]
            const timers = timerCard.timerGroup.timers.map((timer) => {
                if (timer.id !== timerId) return timer
                return { ...timer, ...updatedTimerOption }
            })
            timerCard.timerGroup.timers = timers
            return { ...prevState, [timerCardId]: timerCard }
        }

        default:
            return prevState
    }
}
