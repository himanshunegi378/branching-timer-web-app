import React, { useCallback, useEffect } from "react"
import { useAudioStore } from "../../../providers/audioProvider"
import { timerCardIDsStorage, timerCardStorage } from "../storage"
import { TimeCardsContext } from "../TimerCards.context"
import EventEmitter from "events"

//It will be use to create timercards. It will provide id of all timercards in the system
export function useCreateTimerCard() {
    const { timerCardsStore, dispatch, countdownTimers, runningTimersEvent } =
        React.useContext(TimeCardsContext)
    const { deleteAudio } = useAudioStore()

    const saveTimerCardIds = useCallback(() => {
        timerCardIDsStorage.save(Object.keys(timerCardsStore))
    }, [timerCardsStore])

    //save all the timercards Id when page is closed
    useEffect(() => {
        window.addEventListener("beforeunload", saveTimerCardIds)
        return () => {
            window.removeEventListener("beforeunload", saveTimerCardIds)
        }
    }, [saveTimerCardIds])

    function createTimerCard(timerCardId: string) {
        dispatch({ type: "SETUP_EMPTY_TIMER", payload: { timerCardId } })
        runningTimersEvent[timerCardId] = new EventEmitter()
    }

    function deleteTimerCard(timerCardId: string) {
        dispatch({ type: "REMOVE_TIMERCARD", payload: { timerCardId } })
        timerCardStorage.delete(timerCardId)
        const timers = timerCardsStore[timerCardId].timerGroup.timers
        timers.forEach((timer) => {
            const audioId = timer.options.audioId
            if (audioId) deleteAudio(audioId)
        })
        //add logic to remove timercardcountdown for
        if (countdownTimers[timerCardId]) {
            const timer = countdownTimers[timerCardId]
            timer.off("finished")
            timer.off("tick")
            delete countdownTimers[timerCardId]
        }
    }

    return {
        allTimerCardsId: Object.keys(timerCardsStore),
        createTimerCard,
        deleteTimerCard
    }
}
