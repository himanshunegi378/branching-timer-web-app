import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import { v1 as uuidv1 } from "uuid";
import TimerCard from "./component/timerCard/TimerCard";
import useAudioRecorder from "./hooks/useAudioRecorder";
import AudioProvider from "./providers/audioProvider";
import { AudioStoreContext } from "./contexts/audioContext";

function App(props) {
  const [timerCardsList, setTimerCardsList] = useState([]);
  useEffect(() => {
    const savedTimerCardList = localStorage.getItem("timerCardList");
    if (savedTimerCardList) {
      setTimerCardsList(JSON.parse(savedTimerCardList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("timerCardList", JSON.stringify(timerCardsList));
  }, [timerCardsList]);

  useEffect(() => {
    document.body.classList.remove("page-loading");
    document.body.classList.add("page-loaded");
    document.body.classList.add("bg-gray-50");
  }, []);
  const { audioStore, addAudio } = useContext(AudioStoreContext);

  const { record, stopRecording, audioBlob } = useAudioRecorder();
  useEffect(() => {
    if (audioBlob) {
      addAudio(audioBlob);
    }
  }, [audioBlob]);
  return (
    <div>
      <div>
        {audioStore &&
          Object.keys(audioStore).map((audioId) => {
            return (
              <audio
                src={URL.createObjectURL(audioStore[audioId])}
                type="audio/wav"
                controls
              ></audio>
            );
          })}

        <button onClick={record}>Record</button>
        <button
          onClick={stopRecording}
        >
          stop
        </button>
      </div>
      <button
        className="select-none bg-blue-600 text-white px-4 py-2 rounded-full"
        onClick={() => {
          setTimerCardsList((prevTimerCardList) => [
            ...prevTimerCardList,
            uuidv1(),
          ]);
        }}
      >
        Add Timer Card
      </button>

      <div className="overflow-auto">
        <div className="flex" style={{ alignItems: "flex-start" }}>
          {timerCardsList.map((timerCardId) => (
            <TimerCard
              key={timerCardId}
              timerCardId={timerCardId}
              onDelete={(id) => {
                setTimerCardsList((timerCardsList) =>
                  timerCardsList.filter((timerId) => timerId !== id)
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
