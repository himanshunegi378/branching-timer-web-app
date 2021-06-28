import produce, { castDraft, Draft } from "immer"
import { v4 } from "uuid"
import { Action, TimerCard } from "./TimerCards.types"

export const timerCardsReducer = produce(
    (prevState: Draft<Record<string, TimerCard>>, action: Action) => {
        switch (action.type) {
            case "INIT": {
                const { timerCardsData } = action.payload
                for (const key in timerCardsData) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            timerCardsData,
                            key
                        )
                    ) {
                        prevState[key] = timerCardsData[key]
                    }
                }
                break
            }
            case "SETUP_EMPTY_TIMER": {
                const { timerCardId } = action.payload
                const intialTimerCard: TimerCard = {
                    id: timerCardId,
                    timerGroup: { id: v4(), name: "unnamed", timers: [] },
                    looping: false,
                    status: "stopped",
                    currentTimer: undefined
                }
                prevState[timerCardId] = castDraft(intialTimerCard)
                break
            }
            case "REMOVE_TIMERCARD": {
                const { timerCardId } = action.payload
                delete prevState[timerCardId]
                break
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
                break
            }
            case "REMOVE_TIMER": {
                const { timerCardId, timerId } = action.payload
                const timerCard = prevState[timerCardId]
                timerCard.timerGroup.timers =
                    timerCard.timerGroup.timers.filter(
                        (timer) => timer.id !== timerId
                    )
                break
            }

            case "EDIT_TIMER": {
                const { timerCardId, timerId, updatedTimerOption } =
                    action.payload
                const timerCard = prevState[timerCardId]
                const timers = timerCard.timerGroup.timers.map((timer) => {
                    if (timer.id !== timerId) return timer
                    return { ...timer, ...updatedTimerOption }
                })
                timerCard.timerGroup.timers = timers
                break
            }
            case "PLAY": {
                const { timerCardId } = action.payload
                const timerCard = prevState[timerCardId]

                //if current timer is defined it means paused else stopped
                if (timerCard.currentTimer) {
                    //change timer card status to playing
                    timerCard.status = "playing"
                } else {
                    //get the first timer in timercard
                    const firstTimer = timerCard.timerGroup.timers[0]
                    //if no timer present do nothing else set it to current timer
                    if (firstTimer) {
                        timerCard.currentTimer = {
                            id: firstTimer.id,
                            remainingTime: firstTimer.time,
                            totalTime: firstTimer.time
                        }
                        timerCard.status = "playing"
                    }
                }
                break
            }
            case "PAUSE": {
                const { timerCardId, remainingTime } = action.payload
                const timerCard = prevState[timerCardId]

                //incase of user tries to pause a stopped timer. we need to check if a current timer exists
                if (timerCard.currentTimer) {
                    timerCard.currentTimer.remainingTime = remainingTime
                }
                timerCard.status = "paused"
                break
            }
            case "STOP": {
                const { timerCardId } = action.payload
                const timerCard = prevState[timerCardId]
                timerCard.status = "stopped"
                timerCard.currentTimer = undefined
                break
            }

            case "TOGGLE_LOOP": {
                const { timerCardId } = action.payload
                prevState[timerCardId].looping = !prevState[timerCardId].looping
                break
            }
            case "TIMER_FINISHED": {
                const { timerCardId } = action.payload
                const timerCard = prevState[timerCardId]
                const currentTimerId = timerCard.currentTimer?.id
                //find the timer next to the current one
                const currentTimerIndex = timerCard.timerGroup.timers.findIndex(
                    (timer) => timer.id === currentTimerId
                )
                //if current timer is last one
                if (!timerCard.timerGroup.timers[currentTimerIndex + 1]) {
                    //--if loop is on get the first one else stop timer card
                    if (timerCard.looping) {
                        const nextTimer = timerCard.timerGroup.timers[0]
                        timerCard.currentTimer = {
                            id: nextTimer.id,
                            remainingTime: nextTimer.time,
                            totalTime: nextTimer.time
                        }
                    } else {
                        timerCard.status = "stopped"
                        timerCard.currentTimer = undefined
                    }
                } else {
                    const nextTimer =
                        timerCard.timerGroup.timers[currentTimerIndex + 1]
                    timerCard.currentTimer = {
                        id: nextTimer.id,
                        remainingTime: nextTimer.time,
                        totalTime: nextTimer.time
                    }
                }
                break
            }
            case "RENAME_TIMERCARD": {
                const { timerCardId, newName } = action.payload
                prevState[timerCardId].timerGroup.name = newName
                break
            }
        }
    }
)
