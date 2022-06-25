import { localStorage } from "../../utils/localStorage"
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
