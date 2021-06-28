import produce from "immer"
import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react"
import { Timer } from "../hooks/useTimerStore"
import CountdownTimer from "../lib/countdownTimer"
import showNotification from "../utils/notification"
import { timerCardsReducer } from "./reducer"
import { timerCardIDsStorage, timerCardStorage } from "./storage"
import { Action, TimerCard } from "./TimerCards.types"
import EventEmitter from "events"

const TimeCardsContext = React.createContext<
    [Record<string, TimerCard>, (action: Action) => void]
>([{}, (action) => {}])

export function TimerCardsProvider(props: PropsWithChildren<{}>) {
    const [timerCardStore, dispatch] = React.useReducer(timerCardsReducer, {})

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
        <TimeCardsContext.Provider value={[timerCardStore, dispatch]}>
            {props.children}
        </TimeCardsContext.Provider>
    )
}

//It will be use to create timercards. It will provide id of all timercards in the system
export function useCreateTimerCard() {
    const [allTimerCards, dispatch] = React.useContext(TimeCardsContext)

    const saveTimerCardIds = useCallback(() => {
        timerCardIDsStorage.save(Object.keys(allTimerCards))
    }, [allTimerCards])

    //save all the timercards Id when page is closed
    useEffect(() => {
        window.addEventListener("beforeunload", saveTimerCardIds)
        return () => {
            window.removeEventListener("beforeunload", saveTimerCardIds)
        }
    }, [saveTimerCardIds])

    function createTimerCard(timerCardId: string) {
        dispatch({ type: "SETUP_EMPTY_TIMER", payload: { timerCardId } })
    }

    function deleteTimerCard(timerCardId: string) {
        dispatch({ type: "REMOVE_TIMERCARD", payload: { timerCardId } })
        timerCardStorage.delete(timerCardId)
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
    const evenEmitterRef = useRef(new EventEmitter())

    useEffect(() => {
        if (!evenEmitterRef.current) return
        const eventEmitter = evenEmitterRef.current
        const notify = (timerId: string) => {
            showNotification(
                `${timerCardData?.timerGroup.name} => ${
                    timerCardData?.timerGroup.timers.find(
                        (timer) => timer.id === timerCardData.currentTimer?.id
                    )?.name
                } | completed`
            )
        }
        eventEmitter.on("notify", notify)
        return () => {
            eventEmitter.off("notify", notify)
        }
    }, [
        timerCardData?.currentTimer?.id,
        timerCardData?.timerGroup.name,
        timerCardData?.timerGroup.timers
    ])

    //store timercard data in localstorage when web page is closed
    useEffect(() => {
        const onPageHide = () => {
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
        window.addEventListener("beforeunload", onPageHide)
        return () => {
            window.removeEventListener("beforeunload", onPageHide)
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

    //when the page loads then set running timer data from current timer
    //this is done so remaining time and active timer can be seen on ui in first load
    useEffect(() => {
        if (timerCardData?.currentTimer) {
            const currentTimer = timerCardData.currentTimer
            setRunningTimer({
                currentTimerId: currentTimer.id,
                remainingTime: currentTimer.remainingTime,
                time: currentTimer.totalTime
            })
        }
        return () => {}
    }, [timerCardData?.currentTimer])

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
                        evenEmitterRef.current.emit(
                            "notify",
                            timerCardData.currentTimer?.id
                        )
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
        dispatch,
        timerCardData?.currentTimer,
        timerCardData?.status,
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
