import { create } from "lodash";
import useTimerCardStore from "./useTimerCardStore";
import useTimerStore from "./useTimerStore";

export default function useTimerCard() {
    const { addTimer, updateTimer, getTimer, deleteTimer } = useTimerStore()
    const { createCard, updateCard, deleteCard: _deleteCard, getCard } = useTimerCardStore()


    function addTimerToCard(cardId, name, time) {
        const timerCard = getCard(cardId)
        const newTimer = addTimer(name, time)
        updateCard(cardId, { timers: [...timerCard.timers, newTimer.id] })
    }
    function deleteTimerFromCard(cardId, timerId) {
        const timerCard = getCard(cardId)
        const newTimerList = timerCard.timers.filter((id) => id !== timerId)
        if (newTimerList.length !== timerCard.timers.length) deleteTimer(timerId)
        updateCard(cardId, { timers: newTimerList })
    }

    function deleteCard(cardId) {
        const timerCard = getCard(cardId)
        _deleteCard(cardId)
        const timerList = timerCard.timers
        timerList.forEach(timerId => {
            deleteTimer(timerId)
        });
    }

    return { createCard, addTimerToCard, deleteTimerFromCard,getCard, deleteCard, updateTimer, getTimer }
}