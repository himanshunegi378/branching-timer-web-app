import React, { PropsWithChildren } from "react"
import { v4 } from "uuid"
import { Timer } from "../hooks/useTimerStore"
import { Action, TimerCard } from "./TimerCards.types"

const TimeCardsContext = React.createContext<
    [Record<string, TimerCard>, (action: Action) => void]
>([{}, (action) => {}])

function timerCardsReducer(
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

        default:
            return prevState
    }
}

export function TimerCardsProvider(props: PropsWithChildren<{}>) {
    const [timerCardStore, dispatch] = React.useReducer(timerCardsReducer, {})
    return (
        <TimeCardsContext.Provider value={[timerCardStore, dispatch]}>
            {props.children}
        </TimeCardsContext.Provider>
    )
}

export function useTimerCard(timerCardId: string) {
    const [state, dispatch] = React.useContext(TimeCardsContext)

    const [timerCardData, setTimerCardData] =
        React.useState<TimerCard | undefined>()

    function addTimer(timer: Omit<Timer, "id">) {
        dispatch({
            type: "ADD_TIMER",
            payload: { timerCardId, timerData: timer }
        })
    }

    React.useEffect(() => {
        function setupInitialTimer(timerCardId: string) {
            dispatch({ type: "SETUP_EMPTY_TIMER", payload: { timerCardId } })
        }
        if (!(state && timerCardId)) return
        if (!state[timerCardId]) {
            return setupInitialTimer(timerCardId)
        }
        setTimerCardData(state[timerCardId])
    }, [timerCardId, state, dispatch])

    return { timerCardData, action: { addTimer } }
}
