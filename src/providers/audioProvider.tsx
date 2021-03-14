import React, {
  PropsWithChildren,
  ReactChild,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from "react";
import { v4 } from "uuid";
import { AudioStoreContext, audioContextType } from "../contexts/audioContext";

function AudioProvider(props: PropsWithChildren<{}>) {
  const { children } = props;
  const [audioStore, setAudioStore] = useState  <{ [id in string]: Blob[] }>({});

  function addAudio(audioBlob: Blob[]) {
    const id = v4();
    setAudioStore({ ...audioStore, [id]: audioBlob });
    return id;
  }

  return (
    <AudioStoreContext.Provider
      value={{ audioStore: audioStore, addAudio }}
    >
      {children}
    </AudioStoreContext.Provider>
  );
}

export default AudioProvider;
