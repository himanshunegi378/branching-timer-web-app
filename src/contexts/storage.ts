import { localStorage } from "../utils/localStorage"
import { TimerCard } from "./TimerCards.types"

export const timerCardIDsStorage = {
    save: (timercardIds: string[]) => {
        return localStorage.setItem(`timerCardIds`, timercardIds)
    },
    load: () => {
        return localStorage.getItem<string[]>(`timerCardIds`)
    },
    delete: () => {
        return localStorage.removeItem(`timerCardIds`)
    }
}

export const timerCardStorage = {
    save: (timerCardId: string, timerCardData: TimerCard) => {
        return localStorage.setItem(`timerCard_${timerCardId}`, timerCardData)
    },
    load: (timerCardId: string) => {
        return localStorage.getItem<TimerCard>(`timerCard_${timerCardId}`)
    },
    delete: (timerCardId: string) => {
        return localStorage.removeItem(`timerCard_${timerCardId}`)
    }
}
