export type Timer = {
    id: string
    name: string
    time: number
}

export type TimerGroup = {
    id: string
    name: string
    timers: Timer[]
}

export type TimerCard = {
    timerGroup: TimerGroup
    looping: Boolean
    status: "playing" | "paused" | "stopped"
    currentTimer?: { id: string; remainingTime: number }
}

/**
 * Timercard reducer relate types
 */
export type ActionType =
    | "SETUP_EMPTY_TIMER"
    | "ADD_TIMER"
    | "REMOVE_TIMER"
    | "EDIT_TIMER"
    | "PAUSE"
    | "PLAY"
    | "STOP"
    | "RENAME_TIMERCARD"
    | "REMOVE_TIMERCARD"

export type Action = {
    type: ActionType
    payload: { [key: string]: any }
}