import React from "react"
import { TimeCardsContext } from "../TimerCards.context"

//It will be use to create timercards. It will provide id of all timercards in the system
export function useCreateTimerCard() {
    const { actions, timerCardsId } = React.useContext(TimeCardsContext)

    function createTimerCard(timerCardId: string) {
        actions.addTimerCard(timerCardId)
    }

    function deleteTimerCard(timerCardId: string) {
        actions.deleteTimerCard(timerCardId)
    }

    return {
        allTimerCardsId: timerCardsId,
        createTimerCard,
        deleteTimerCard
    }
}
