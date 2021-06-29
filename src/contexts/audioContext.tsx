import { createContext, useContext } from "react"

export type audioContextType = {
    audioStore: { [id in string]: Blob[] }
    addAudio: (audioBlob: Blob[]) => string
    deleteAudio: (id: string) => void
}

export const AudioStoreContext = createContext<audioContextType>({
    audioStore: {},
    addAudio: (audioBlob) => {
        return ""
    },
    deleteAudio: (id: string) => {}
})
// export const useTheme = () => useContext(AudioStoreContext);
