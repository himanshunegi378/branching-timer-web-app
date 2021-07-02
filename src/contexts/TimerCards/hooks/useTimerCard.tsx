import produce from "immer"
import React, { useEffect } from "react"
import { useAudioStore } from "../../../providers/audioProvider"
import { timerCardStorage } from "../storage"
import { TimeCardsContext } from "../TimerCards.context"
import { Timer, TimerCard } from "../TimerCards.types"
import { useRunningTimer } from "./useRunningTimer"

export function useTimerCard(timerCardId: string) {
    const { timerCardsStore, dispatch } = React.useContext(TimeCardsContext)
    const { addAudio, deleteAudio } = useAudioStore()
    const [timerCardData, setTimerCardData] = React.useState<
        TimerCard | undefined
    >()
    const runningTimer = useRunningTimer(timerCardId)

    //store timercard data in localstorage when web page is closed
    useEffect(() => {
        const onPageClose = () => {
            timerCardStorage.save(
                timerCardId,
                produce(timerCardData as TimerCard, (draftTimerCardData) => {
                    draftTimerCardData.status =
                        draftTimerCardData.status === "stopped"
                            ? "stopped"
                            : "paused"
                    if (draftTimerCardData.currentTimer) {
                        draftTimerCardData.currentTimer.remainingTime =
                            runningTimer.remainingTime
                    }
                })
            )
        }
        window.addEventListener("beforeunload", onPageClose)
        return () => {
            window.removeEventListener("beforeunload", onPageClose)
        }
    }, [runningTimer.remainingTime, timerCardData, timerCardId])

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
        const timer = timerCardData?.timerGroup.timers.find(
            (timer) => timer.id === timerId
        )
        if (timer?.options.audioId) {
            deleteAudio(timer.options.audioId)
        }
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

    function attachAudioToTimer(timerId: string, audio: Blob[]) {
        const audioId = addAudio(audio)
        const timer = timerCardData?.timerGroup.timers.find(
            (timer) => timer.id === timerId
        )
        if (timer?.options.audioId) {
            deleteAudio(timer.options.audioId)
        }
        dispatch({
            type: "ATTACH_AUDIO",
            payload: {
                timerCardId,
                timerId,
                audioId
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

    //when the page loads then set running timer data from current timer
    //this is done so remaining time and active timer can be seen on ui in first load
    // useEffect(() => {
    //     if (timerCardData?.currentTimer) {
    //         const currentTimer = timerCardData.currentTimer
    //         setRunningTimer({
    //             currentTimerId: currentTimer.id,
    //             remainingTime: currentTimer.remainingTime,
    //             time: currentTimer.totalTime
    //         })
    //     }
    //     return () => {}
    // }, [timerCardData?.currentTimer])

    React.useEffect(() => {
        setTimerCardData(timerCardsStore[timerCardId])
    }, [timerCardId, timerCardsStore])

    return {
        timerCardData,
        runningTimer,
        action: {
            attachAudioToTimer,
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
