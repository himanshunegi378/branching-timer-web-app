import produce from "immer"
import React, {
    PropsWithChildren,
    ReactChild,
    ReactElement,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react"
import { v4 } from "uuid"
import { AudioStoreContext, audioContextType } from "../contexts/audioContext"
import { localStorage } from "../utils/localStorage"

export default function AudioProvider(props: PropsWithChildren<{}>) {
    const { children } = props
    const [audioStore, setAudioStore] = useState<{ [id in string]: Blob[] }>({})

    async function init() {
        const soundIds = await localStorage.getItem<string[]>("soundIds")
        const promises: any[] = []
        const audioData: { [id in string]: Blob[] } = {}
        soundIds?.forEach((id) => {
            promises.push(
                localStorage.getItem<Blob[]>(`sound_${id}`).then((audio) => {
                    return { id: id, audio }
                })
            )
        })
        await Promise.all(promises).then((audios) => {
            audios.forEach((audio) => (audioData[audio.id] = audio.audio))
        })
        setAudioStore(audioData)
    }
    useEffect(() => {
        init()
    }, [])

    const storeIdsToStorage = useCallback(() => {
        localStorage.setItem("soundIds", Object.keys(audioStore))
    }, [audioStore])

    const saveAudioToStorage = (id: string, audioBlob: Blob[]) => {
        localStorage.setItem(`sound_${id}`, audioBlob)
    }

    const deleteAudioFromStorage = (id: string) => {
        localStorage.removeItem(`sound_${id}`)
    }
    function addAudio(audioBlob: Blob[]) {
        const id = v4()
        saveAudioToStorage(id, audioBlob)
        setAudioStore((prevAudioStore) =>
            produce(prevAudioStore, (draftAudioStore) => {
                draftAudioStore[id] = audioBlob
            })
        )
        return id
    }

    function deleteAudio(id: string) {
        setAudioStore((prevAudioStore) =>
            produce(prevAudioStore, (draftAudioStore) => {
                delete draftAudioStore[id]
            })
        )
        deleteAudioFromStorage(id)
    }

    useEffect(() => {
        storeIdsToStorage()
    }, [storeIdsToStorage])

    return (
        <AudioStoreContext.Provider
            value={{ audioStore: audioStore, addAudio, deleteAudio }}
        >
            {children}
        </AudioStoreContext.Provider>
    )
}

export function useAudioStore() {
    const { audioStore, addAudio, deleteAudio } = useContext(AudioStoreContext)

    const getAudio = useCallback(
        (id: string) => {
            return audioStore[id]
        },
        [audioStore]
    )
    return { addAudio, getAudio, deleteAudio }
}
