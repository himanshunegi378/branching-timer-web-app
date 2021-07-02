import React, { PropsWithChildren, useEffect, useRef, useState } from "react"
import CountdownTimer from "../../lib/countdownTimer"
import showNotification from "../../utils/notification"
import { timerCardsReducer } from "./reducer"
import { timerCardIDsStorage, timerCardStorage } from "./storage"
import { Action, TimerCard } from "./TimerCards.types"
import EventEmitter from "events"
import useSoundPlayer from "../../hooks/useSoundPlayer"
//@ts-ignore
import defaultSound from "./alarm.mp3"
import { useAudioStore } from "../../providers/audioProvider"
import { usePrevious } from "../../hooks/usePrevious"

export const TimeCardsContext = React.createContext<{
    timerCardsStore: Record<string, TimerCard>
    dispatch: (action: Action) => void

    countdownTimers: Record<string, CountdownTimer>
    runningTimersEvent: Record<string, EventEmitter>
}>({
    timerCardsStore: {},
    dispatch: (action) => {},
    countdownTimers: {},
    runningTimersEvent: {}
})

export function TimerCardsProvider(props: PropsWithChildren<{}>) {
    const { getAudio } = useAudioStore()
    const { play } = useSoundPlayer()
    const [timerCardsStore, dispatch] = React.useReducer(timerCardsReducer, {})
    const prevtimerCardStore =
        usePrevious<Record<string, TimerCard>>(timerCardsStore)
    const runningTimers = useRef<
        Record<
            string,
            { currentTimerId: string; remainingTime: number; time: number }
        >
    >({})
    const [timerCardEvent] = useState(new EventEmitter())
    const timersRef = useRef<Record<string, CountdownTimer>>({})
    const runningTimerEvent = useRef<Record<string, EventEmitter>>({})

    useEffect(() => {
        const onPlay = (timerCardId: string) => {
            const timerCard: TimerCard = timerCardsStore[timerCardId]
            // get the timer from current timer and the reamaining time
            const { remainingTime, id, totalTime } = timerCard.currentTimer!
            // start countdown for timer
            if (!timersRef.current[timerCardId]) {
                timersRef.current[timerCardId] = new CountdownTimer()
            }

            const countDownTimer = timersRef.current[timerCardId]
            countDownTimer.off("finished")
            countDownTimer.off("tick")
            countDownTimer.play(remainingTime)
            //on each countdown timer tick...
            countDownTimer.on("tick", (remainingTime: number) => {
                //change value in running timer ref and running timer state

                runningTimers.current[timerCardId] = {
                    currentTimerId: id,
                    remainingTime: remainingTime,
                    time: totalTime
                }

                runningTimerEvent.current[timerCardId].emit(
                    "tick",
                    timerCardId,
                    {
                        currentTimerId: id,
                        remainingTime: remainingTime,
                        time: totalTime
                    }
                )
            })

            // on timer finished...
            countDownTimer.on("finished", () => {
                const timerCard: TimerCard = timerCardsStore[timerCardId]
                if (!timerCard) return
                const timer = timerCard?.timerGroup.timers.find(
                    (timer) => timer.id === timerCard.currentTimer?.id
                )
                const audioBlob =
                    timer?.options.audioId && getAudio(timer.options.audioId)
                if (audioBlob) {
                    play(URL.createObjectURL(audioBlob))
                } else {
                    play(defaultSound, 2)
                }

                showNotification(
                    `${timerCard?.timerGroup.name} => ${
                        timerCard?.timerGroup.timers.find(
                            (timer) => timer.id === timerCard.currentTimer?.id
                        )?.name
                    } | completed`
                )
                //dispatch next_timer event
                dispatch({
                    type: "TIMER_FINISHED",
                    payload: { timerCardId }
                })
            })
        }

        const onPause = (timerCardId: string) => {
            const countDownTimer = timersRef.current[timerCardId]
            if (countDownTimer) {
                countDownTimer.off("finished")
                countDownTimer.off("tick")
            }
            const runningTimer = runningTimers.current[timerCardId] || {
                currentTimerId: "",
                remainingTime: 0,
                time: 0
            }
            runningTimerEvent.current[timerCardId].emit("tick", timerCardId, {
                currentTimerId: runningTimer.currentTimerId,
                remainingTime: runningTimer.remainingTime,
                time: runningTimer.time
            })
        }

        const onStop = (timerCardId: string) => {
            const countDownTimer = timersRef.current[timerCardId]
            if (countDownTimer) {
                countDownTimer.off("finished")
                countDownTimer.off("tick")
                delete timersRef.current[timerCardId]
            }

            if (runningTimers.current[timerCardId]) {
                delete runningTimers.current[timerCardId]
            }
            runningTimerEvent.current[timerCardId].emit("tick", timerCardId, {
                currentTimerId: "",
                remainingTime: 0,
                time: 0
            })
        }
        timerCardEvent.on("play", onPlay)
        timerCardEvent.on("pause", onPause)
        timerCardEvent.on("stop", onStop)
        return () => {
            timerCardEvent.off("play", onPlay)
            timerCardEvent.off("pause", onPause)
            timerCardEvent.off("stop", onStop)
            console.log("some thing")
        }
    }, [getAudio, play, timerCardEvent, timerCardsStore])

    useEffect(() => {
        for (const timerCardId in timerCardsStore) {
            if (
                Object.prototype.hasOwnProperty.call(
                    timerCardsStore,
                    timerCardId
                )
            ) {
                const { status, currentTimer } = timerCardsStore[timerCardId]

                switch (status) {
                    case "playing": {
                        // emit "Play" only when previous status is not same as current one(meaning status change to "playing" from something else)
                        // or previous currenttimerid is not equal to current timer Id(for case when prev and current status is "playing" but currenttimerid is different because previous timer finished and next timer needs to be played)
                        if (
                            status !==
                                prevtimerCardStore?.[timerCardId]?.status ||
                            currentTimer?.id !==
                                prevtimerCardStore?.[timerCardId].currentTimer
                                    ?.id
                        ) {
                            timerCardEvent.emit("play", timerCardId)
                        }
                        break
                    }
                    case "paused": {
                        if (
                            status !== prevtimerCardStore?.[timerCardId]?.status
                        ) {
                            timerCardEvent.emit("pause", timerCardId)
                        }

                        break
                    }
                    case "stopped": {
                        if (
                            status !== prevtimerCardStore?.[timerCardId]?.status
                        ) {
                            timerCardEvent.emit("stop", timerCardId)
                        }
                        break
                    }
                }
            }
        }
    }, [prevtimerCardStore, timerCardEvent, timerCardsStore])

    async function init() {
        const timercardIds = await timerCardIDsStorage.load()
        const promises: any[] = []
        timercardIds?.forEach((id) => {
            promises.push(timerCardStorage.load(id))
        })
        const timerCardData: Record<string, TimerCard> = {}
        await Promise.all(promises).then((data) => {
            data.forEach((timerCard: TimerCard) => {
                if (!timerCard) return
                timerCardData[timerCard.id] = timerCard
                runningTimerEvent.current[timerCard.id] = new EventEmitter()
            })
        })

        dispatch({
            type: "INIT",
            payload: { timerCardsData: timerCardData }
        })
    }

    useEffect(() => {
        init()
    }, [])
    return (
        <TimeCardsContext.Provider
            value={{
                timerCardsStore,
                dispatch,
                countdownTimers: timersRef.current,
                runningTimersEvent: runningTimerEvent.current
            }}
        >
            {props.children}
        </TimeCardsContext.Provider>
    )
}
