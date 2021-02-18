import { useEffect, useState } from "react";
import { v1 as uuidv1 } from 'uuid';

type TimerGroupStore = {
    id: string, name: string, timers: string[]
}
type Timer = { id: string, name: string, time: number }
type TimerStore = {
    [id: string]: Timer
}

export default function useTimerGroup(id: string, name='unname') {
    const [timerGroupStore, setTimerGroupStore] = useState<TimerGroupStore>({ id: id, name: name, timers: [] })
    const [timerStore, setTimerStore] = useState<TimerStore>({})

    //get localstorage data if any
    useEffect(() => {
        if (!id) return
        const savedTimerGroupStoreData = localStorage.getItem(id)
        if (!savedTimerGroupStoreData) return
        const parsedDataTimerGroupData: TimerGroupStore = JSON.parse(savedTimerGroupStoreData)
        setTimerGroupStore(parsedDataTimerGroupData)
        const timersList = parsedDataTimerGroupData.timers
        const newTimerStore: TimerStore = {}
        timersList.forEach((timerId: string) => {
            const savedTimer = localStorage.getItem(timerId) as string
            newTimerStore[timerId] = JSON.parse(savedTimer)
        });
        setTimerStore(newTimerStore)
    }, [id])

    function addTimer(name: string, time: number): Timer {
        const id = uuidv1()
        const newTimer = { id: id, name: name, time: time }
        localStorage.setItem(id, JSON.stringify(newTimer))
        setTimerStore({ ...timerStore, [id]: newTimer })
        return newTimer
    }
    function getTimer(id: string): Timer {
        const timer = timerStore[id]
        return timer
    }
    function deleteTimer(id: string) {
        const newTimerStore = { ...timerStore }
        delete newTimerStore[id]
        localStorage.removeItem(id)
        setTimerStore(newTimerStore)
    }

    function updateTimer(id: string, opts: any) {
        const newTimerStore = { ...timerStore }
        newTimerStore[id].name = opts.name || newTimerStore[id].name
        newTimerStore[id].time = opts.time || newTimerStore[id].time
        localStorage.setItem(id, JSON.stringify(newTimerStore[id]))
        setTimerStore(newTimerStore)
    }


    function addTimerInGroup(name: string, time: number) {
        const newTimer = addTimer(name, time)
        const newTimerGroups: TimerGroupStore = { ...timerGroupStore }
        newTimerGroups.timers.push(newTimer.id)
        localStorage.setItem(id, JSON.stringify(newTimerGroups))
        setTimerGroupStore(newTimerGroups)
        return newTimerGroups
    }

    function deleteTimerFromGroup(timerId: string) {
        const newTimerGroupsStore = { ...timerGroupStore }
        const newTimerList = newTimerGroupsStore.timers.filter((_timerId) => _timerId !== timerId)
        if (newTimerList.length !== newTimerGroupsStore.timers.length) deleteTimer(timerId)
        newTimerGroupsStore.timers = newTimerList
        localStorage.setItem(newTimerGroupsStore.id, JSON.stringify(newTimerGroupsStore))
        setTimerGroupStore(newTimerGroupsStore)
        return newTimerGroupsStore

    }

    function deleteTimerGroup() {
        const timersList = timerGroupStore.timers
        timersList.forEach((timerId: string) => {
            localStorage.removeItem(timerId)
        });
        localStorage.removeItem(id)
    }

    function changeGroupName(newName: string) {
        if (!newName) return
        setTimerGroupStore({ ...timerGroupStore, name: newName })
        localStorage.setItem(timerGroupStore.id, JSON.stringify({ ...timerGroupStore, name: newName }))

    }

    return { addTimerInGroup, deleteTimerFromGroup, updateTimer, getTimer, deleteTimerGroup, changeGroupName, timerGroupStore, timerStore }
}