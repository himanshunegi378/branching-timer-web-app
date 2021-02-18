import { useRef, useState } from "react";
import { v1 as uuidv1 } from 'uuid';

type Timer = { id: string, name: string, time: number }
type TimerStore = {
    [id: string]: Timer
}

export default function useTimerStore() {
    const [timerStore, setTimerStore] = useState<TimerStore>({})

    function addTimer(name: string, time: number):Timer {
        const id = uuidv1()
        const newTimer = { id: id, name: name, time: time }
        setTimerStore({ ...timerStore, [id]: newTimer })
        return newTimer
    }
    function getTimer(id: string):Timer {
        const timer = timerStore[id]
        return timer
    }
    function deleteTimer(id:string) {
        const newTimerStore = { ...timerStore }
        delete newTimerStore[id]
        setTimerStore(newTimerStore)
    }

    function updateTimer(id:string, opts:any) {
        const newTimerStore = { ...timerStore }
        newTimerStore[id].name = opts.name || newTimerStore[id].name
        newTimerStore[id].time = opts.time || newTimerStore[id].time
        setTimerStore(newTimerStore)
    }

    return { addTimer, getTimer, deleteTimer, updateTimer,timerStore }
}