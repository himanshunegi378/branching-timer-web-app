import React, { useState, useEffect, useContext } from "react"
import style from "./App.module.scss"
import { v1 as uuidv1, v4 } from "uuid"
import TimerCard from "./component/timerCard/TimerCard"
import useAudioRecorder from "./hooks/useAudioRecorder"
import AudioProvider from "./providers/audioProvider"
import { AudioStoreContext } from "./contexts/audioContext"
import { localStorage } from "./utils/localStorage"
import { useCreateTimerCard } from "./contexts/TimerCards.context"

function App(props) {
    const { allTimerCardsId, createTimerCard, deleteTimerCard } =
        useCreateTimerCard()
    // useEffect(() => {
    //   localStorage.getItem("timerCardList").then((savedTimerCardList) => {
    //     if (savedTimerCardList) {
    //       setTimerCardsList(JSON.parse(savedTimerCardList));
    //     }
    //   });
    // }, []);

    // useEffect(() => {
    //   localStorage.setItem("timerCardList", JSON.stringify(timerCardsList));
    // }, [timerCardsList]);

    useEffect(() => {
        document.body.classList.remove("page-loading")
        document.body.classList.add("page-loaded")
        document.body.classList.add("bg-gray-50")
    }, [])
    const { audioStore, addAudio } = useContext(AudioStoreContext)

    const { record, stopRecording, audioBlob } = useAudioRecorder()
    useEffect(() => {
        if (audioBlob) {
            addAudio(audioBlob)
        }
    }, [audioBlob])
    return (
        <div>
            <button
                className="select-none bg-blue-600 text-white px-4 py-2 rounded-full"
                onClick={() => {
                    createTimerCard(v4())
                }}
            >
                Add Timer Card
            </button>

            <div className="overflow-auto">
                <div
                    className={` ${style.hs}`}
                    style={{ alignItems: "flex-start" }}
                >
                    {allTimerCardsId.map((timerCardId) => (
                        <TimerCard
                            className={style.item}
                            key={timerCardId}
                            timerCardId={timerCardId}
                            onDelete={(id) => {
                                deleteTimerCard(id)
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
