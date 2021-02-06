import { useRef, useState } from "react";

export default function useTimerStore() {
    const incrementingNumber = useRef(0)
    const [timerStore, setTimerStore] = useState({})

    function addTimer(name, time) {
        const id = incrementingNumber.current
        const newTimer = { id: id, name: name, time: time }
        setTimerStore({ ...timerStore, [id]: newTimer })
        incrementingNumber.current++
        return newTimer
    }
    function getTimer(id) {
        const timer = timerStore[id]
        return timer
    }
    function deleteTimer(id) {
        let newTimerStore = { ...timerStore }
        delete newTimerStore[id]
        setTimerStore(newTimerStore)
    }

    function updateTimer(id, opts) {
        let newTimerStore = { ...timerStore }
        newTimerStore[id].name = opts.name || newTimerStore[id].name
        newTimerStore[id].time = opts.time || newTimerStore[id].time
        setTimerStore(newTimerStore)
    }

    return { addTimer, getTimer, deleteTimer, updateTimer }
}