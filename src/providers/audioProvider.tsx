import produce from 'immer';
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 } from 'uuid';
import { AudioStoreContext } from '../contexts/audioContext';
import { soundsIdStorage } from './storage/sound-id-storage';
import { soundStorage } from './storage/sound-storage';

export default function AudioProvider(props: PropsWithChildren<{}>) {
  const { children } = props;
  const [audioStore, setAudioStore] = useState<{ [id in string]: Blob[] }>({});

  async function init() {
    //loads aall audio from storage
    const soundIds = await soundsIdStorage.load();
    const promises: any[] = [];
    const audioData: { [id in string]: Blob[] } = {};
    soundIds?.forEach((id) => {
      promises.push(
        soundStorage.load(id).then((audio) => {
          if (!audio) return;
          audioData[id] = audio;
        })
      );
    });
    await Promise.all(promises);
    setAudioStore(audioData);
  }
  useEffect(() => {
    init();
  }, []);

  function addAudio(audioBlob: Blob[]) {
    const id = v4();
    soundStorage.save(id, audioBlob);
    setAudioStore((prevAudioStore) =>
      produce(prevAudioStore, (draftAudioStore) => {
        draftAudioStore[id] = audioBlob;
      })
    );
    return id;
  }

  function deleteAudio(id: string) {
    setAudioStore((prevAudioStore) =>
      produce(prevAudioStore, (draftAudioStore) => {
        delete draftAudioStore[id];
      })
    );
    soundStorage.delete(id);
  }

  useEffect(() => {
    soundsIdStorage.save(Object.keys(audioStore));
  }, [audioStore]);

  return (
    <AudioStoreContext.Provider
      value={{
        audioStore,
        addAudio,
        deleteAudio,
      }}
    >
      {children}
    </AudioStoreContext.Provider>
  );
}

export function useAudioStore() {
  const { audioStore, addAudio, deleteAudio } = useContext(AudioStoreContext);

  const getAudio = useCallback(
    (id: string) => {
      return audioStore[id];
    },
    [audioStore]
  );
  return { addAudio, getAudio, deleteAudio };
}
