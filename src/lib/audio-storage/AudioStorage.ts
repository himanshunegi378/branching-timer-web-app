import { localStorage } from "../../utils/localStorage"
import { MetaStorage, MetaType } from "./MetaStorage"

class AudioStorage {
    private metaStorage: MetaStorage
    constructor() {
        this.metaStorage = new MetaStorage()
    }
    loadAudioIds() {
        return localStorage.getItem<string[]>("audioIds")
    }
    private saveAudioIds(ids: string[]) {
        return localStorage.setItem("audioIds", ids)
    }

    async save(
        id: string,
        audioBlob: Blob[],
        meta: Omit<MetaType, "id" | "createdAt">
    ) {
        const savedAudioIds = (await this.loadAudioIds()) || []
        savedAudioIds.push(id)
        await this.saveAudioIds(savedAudioIds)

        await this.metaStorage.save(id, { ...meta, id, createdAt: Date.now() })
        return localStorage.setItem(`audio_${id}`, audioBlob)
    }

    load(id: string) {
        return localStorage.getItem<Blob[]>(`audio_${id}`)
    }
    async delete(id: string) {
        const savedAudioIds = (await this.loadAudioIds()) || []
        await this.saveAudioIds(
            savedAudioIds.filter((savedId) => savedId !== id)
        )

        await this.metaStorage.delete(id)
        return localStorage.removeItem(`audio_${id}`)
    }

    editMeta(id: string, editedMeta: MetaType) {
        return this.metaStorage.save(id, editedMeta)
    }
    loadMeta(id: string) {
        return this.metaStorage.load(id)
    }
}

export const audioStorage = new AudioStorage()
