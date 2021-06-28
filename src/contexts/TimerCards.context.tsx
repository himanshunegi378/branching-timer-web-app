import React, { PropsWithChildren, useEffect, useRef, useState } from "react"
import { useEffectDebug } from "../hooks/useEffectDebug"
import { Timer } from "../hooks/useTimerStore"
import CountdownTimer from "../lib/countdownTimer"
import { timerCardsReducer } from "./reducer"
import { Action, TimerCard } from "./TimerCards.types"

const TimeCardsContext = React.createContext<
    [Record<string, TimerCard>, (action: Action) => void]
>([{}, (action) => {}])

export function TimerCardsProvider(props: PropsWithChildren<{}>) {
    const [timerCardStore, dispatch] = React.useReducer(timerCardsReducer, {})
    return (
        <TimeCardsContext.Provider value={[timerCardStore, dispatch]}>
            {props.children}
        </TimeCardsContext.Provider>
    )
}

//It will be use to create timercards. It will provide id of all timercards in the system
export function useCreateTimerCard() {
    const [allTimerCards, dispatch] = React.useContext(TimeCardsContext)

    function createTimerCard(timerCardId: string) {
        dispatch({ type: "SETUP_EMPTY_TIMER", payload: { timerCardId } })
    }

    function deleteTimerCard(timerCardId: string) {
        dispatch({ type: "REMOVE_TIMERCARD", payload: { timerCardId } })
    }

    return {
        allTimerCardsId: Object.keys(allTimerCards),
        createTimerCard,
        deleteTimerCard
    }
}

export function useTimerCard(timerCardId: string) {
    const [state, dispatch] = React.useContext(TimeCardsContext)

    const [timerCardData, setTimerCardData] = React.useState<
        TimerCard | undefined
    >()
    const [runningTimer, setRunningTimer] = useState({
        currentTimerId: "",
        remainingTime: 0,
        time: 0
    })
    const countdownTimerRef = useRef(new CountdownTimer())

    /**
     *  Timer Realted functions
     */

    function addTimer(timer: Omit<Timer, "id">) {
        dispatch({
            type: "ADD_TIMER",
            payload: { timerCardId, timerData: timer }
        })
    }

    function closeTimer(timerId: string) {
        dispatch({ type: "REMOVE_TIMER", payload: { timerCardId, timerId } })
    }

    function updateTimer(
        timerId: string,
        timerOption: Omit<Partial<Timer>, "id">
    ) {
        dispatch({
            type: "EDIT_TIMER",
            payload: {
                timerCardId,
                timerId,
                updatedTimerOption: timerOption
            }
        })
    }

    /**
     *  Timercard Realted functions
     */
    function changeCardName(newName: string) {
        dispatch({
            type: "RENAME_TIMERCARD",
            payload: {
                timerCardId: timerCardId,
                newName: newName
            }
        })
    }

    function playCard() {
        dispatch({ type: "PLAY", payload: { timerCardId } })
    }

    function pauseCard() {
        dispatch({
            type: "PAUSE",
            payload: { timerCardId, remainingTime: runningTimer.remainingTime }
        })
    }

    function stopCard() {
        dispatch({ type: "STOP", payload: { timerCardId } })
    }

    function toggleLooping() {
        dispatch({
            type: "TOGGLE_LOOP",
            payload: {
                timerCardId
            }
        })
    }

    React.useEffect(() => {
        setTimerCardData(state[timerCardId])
    }, [timerCardId, state, dispatch])

    useEffect(() => {
        const countDownTimer = countdownTimerRef.current
        switch (timerCardData?.status) {
            case "playing": {
                if (timerCardData.currentTimer) {
                    // get the timer from current timer and the reamaining time
                    const { remainingTime, id, totalTime } =
                        timerCardData.currentTimer
                    // start countdown for timer
                    countDownTimer.play(remainingTime)

                    //on each countdown timer tick...
                    countDownTimer.on("tick", (remainingTime: number) => {
                        //change value in running timer ref and running timer state
                        setRunningTimer({
                            currentTimerId: id,
                            remainingTime: remainingTime,
                            time: totalTime
                        })
                    })

                    // on timer finished...
                    countDownTimer.on("finished", () => {
                        //dispatch next_timer event
                        dispatch({
                            type: "TIMER_FINISHED",
                            payload: { timerCardId }
                        })
                        //show notification
                        //play sound
                    })
                    // repeat
                }
                break
            }
            case "stopped": {
                setRunningTimer({
                    currentTimerId: "",
                    remainingTime: 0,
                    time: 0
                })
                break
            }
            default:
                break
        }

        return () => {
            // these statement are by COINCIDENCE handling case in which timercard is paused
            countDownTimer.off("finished")
            countDownTimer.off("tick")
        }
    }, [
        timerCardData?.status,
        timerCardData?.currentTimer,
        dispatch,
        timerCardId
    ])

    return {
        timerCardData,
        runningTimer,
        action: {
            addTimer,
            closeTimer,
            updateTimer,
            changeCardName,
            toggleLooping,
            playCard,
            pauseCard,
            stopCard
        }
    }
}
