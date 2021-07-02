import { useContext, useEffect, useState } from "react"
import { TimeCardsContext } from "../TimerCards.context"

export function useRunningTimer(timerCardId: string) {
    const { runningTimersEvent } = useContext(TimeCardsContext)
    const [runningTimer, setRunningTimer] = useState({
        currentTimerId: "",
        remainingTime: 0,
        time: 0
    })
    useEffect(() => {
        const updateRunningTimer = (
            for_timerCardId: string,
            runningTimerData: {
                currentTimerId: string
                remainingTime: number
                time: number
            }
        ) => {
            if (for_timerCardId !== timerCardId) return
            setRunningTimer(runningTimerData)
        }
        runningTimersEvent[timerCardId].on("tick", updateRunningTimer)
        return () => {
            runningTimersEvent[timerCardId].off("tick", updateRunningTimer)
        }
    }, [runningTimersEvent, timerCardId])
    return runningTimer
}
