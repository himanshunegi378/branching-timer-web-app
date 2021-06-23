import React, { PropsWithChildren } from "react"
import { useEffectDebug } from "../hooks/useEffectDebug"
import { Timer } from "../hooks/useTimerStore"
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

export function useTimerCard(timerCardId: string) {
    const [state, dispatch] = React.useContext(TimeCardsContext)

    const [timerCardData, setTimerCardData] = React.useState<
        TimerCard | undefined
    >()

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

    React.useEffect(() => {
        function setupInitialTimer(timerCardId: string) {
            dispatch({ type: "SETUP_EMPTY_TIMER", payload: { timerCardId } })
        }
        // directyly not set initial timercard data so there would be one source of data i.e. state from context
        if (!state[timerCardId]) {
            setupInitialTimer(timerCardId)
            return
        }
        setTimerCardData(state[timerCardId])
    }, [timerCardId, state, dispatch])

    return { timerCardData, action: { addTimer, closeTimer, updateTimer } }
}
