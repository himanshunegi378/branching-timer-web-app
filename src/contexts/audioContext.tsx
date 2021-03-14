import { createContext, useContext } from "react";

export type audioContextType = {
  audioStore: { [id in string]: Blob[] };
  addAudio: (audioBlob: Blob[]) => string;
};

export const AudioStoreContext = createContext<audioContextType>({
  audioStore: {},
  addAudio: (audioBlob) => {
    return "";
  },
});
// export const useTheme = () => useContext(AudioStoreContext);
