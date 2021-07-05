import { localStorage } from "../../utils/localStorage"

class SoundsIdStorage {
    save(ids: string[]) {
        localStorage.setItem("soundIds", ids)
    }
    load() {
        return localStorage.getItem<string[]>(`soundIds`)
    }
    delete() {
        localStorage.removeItem(`soundIds`)
    }
}

export const soundsIdStorage = new SoundsIdStorage()
