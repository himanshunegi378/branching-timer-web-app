import { localStorage } from "../../utils/localStorage"

export class AudioStorage {
    save(id: string, audioBlob: Blob[]) {
        localStorage.setItem(`audio_${id}`, audioBlob)
    }
    load(id: string) {
        return localStorage.getItem<Blob[]>(`audio_${id}`)
    }
    delete(id: string) {
        return localStorage.removeItem(`audio_${id}`)
    }
}
