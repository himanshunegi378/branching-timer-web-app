import { useRef, useState } from "react";
import { timer } from "rxjs";
import useTimerStore from "./useTimerStore";

export default function useTimerCardStore() {
    const incrementingNumber = useRef(0)
    const [timerCardStore, setTimerCardStore] = useState({})

    function createCard(name) {
        const id = incrementingNumber.current
        const newCard = { id: id, name: name, timers: [] }
        setTimerCardStore({ ...timerCardStore, [id]: newCard })
        incrementingNumber.current++
        return newCard
    }
    function getCard(id) {
        const card = timerCardStore[id]
        return card
    }
    function deleteCard(id) {
        const newTimerCardStore = { ...timerCardStore }
        delete newTimerCardStore[id]
        setTimerCardStore(newTimerCardStore)
    }
    function updateCard(id, opts) {
        const newTimerCardStore = { ...timerCardStore }
        newTimerCardStore[id].name = opts.name || newTimerCardStore[id].name
        newTimerCardStore[id].timers = opts.timers || newTimerCardStore[id].timers
        setTimerCardStore(newTimerCardStore)
    }

    return { createCard, getCard, deleteCard, updateCard, timerCardStore }
}