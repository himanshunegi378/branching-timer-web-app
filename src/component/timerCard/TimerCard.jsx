import React, { useState } from "react"
import Timer from "../timer/Timer"
import close from "./close.svg"
import style from "./style.module.scss"

import { PlayButton } from "./playButton"
import { LoopButton } from "./loopButton"
import StopButton from "./stopButton"

// import useTimerCard from "../../hooks/useTimerCards"
import useAudioRecorder from "../../hooks/useAudioRecorder"
import { useTimerCard } from "../../contexts/TimerCards.context"
import { v4 } from "uuid"

export default function TimerCard(props) {
    const { onDelete, timerCardId, className } = props
    // const { ...timerCard } = useTimerCard(props.timerCardId);
    const [editTitle, setEditTitle] = useState(() => false)
    const { record, stopRecording, audioBlob } = useAudioRecorder()
    const { timerCardData, runningTimer, action } = useTimerCard(timerCardId)
    return (
        <div className={`bg-white rounded-lg ${className}`}>
            <div className="flex flex-row-reverse">
                <button
                    className="select-none outline-none rounded-full transition duration-150 hover:elevation-2 transform hover:scale-110"
                    // className="btn btn-danger"
                    onClick={() => {
                        // timerCard.deleteTimerCard();
                        onDelete(timerCardId)
                    }}
                >
                    <img className="h-6 w-auto" src={close} />
                </button>
            </div>
            <div>
                <div className="text-7xl font-mono tracking-tighter font-medium text-center select-none">
                    {parseInt(runningTimer.remainingTime / 60) <= 9
                        ? "0" + parseInt(runningTimer.remainingTime / 60)
                        : parseInt(runningTimer.remainingTime / 60)}
                    :
                    {runningTimer.remainingTime % 60 <= 9
                        ? "0" + (runningTimer.remainingTime % 60)
                        : runningTimer.remainingTime % 60}
                </div>
                <hr />
                <div className="flex flex-row justify-between mx-2">
                    <div className="text-center font-medium cursor-pointer">
                        <div onClick={() => setEditTitle(true)}>
                            {editTitle ? (
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault()
                                        const title =
                                            event.currentTarget.title.value
                                        if (title) {
                                            // timerCard.changeTimerCardName(title);
                                        }
                                        setEditTitle(false)
                                    }}
                                    onBlur={(event) => {
                                        event.preventDefault()
                                        const title =
                                            event.currentTarget.title.value
                                        if (title) {
                                            // timerCard.changeTimerCardName(title);
                                        }
                                        setEditTitle(false)
                                    }}
                                >
                                    <input autoFocus type="text" name="title" />
                                </form>
                            ) : (
                                "dummy name"
                                // timerCard.timerCardData.name
                            )}
                        </div>
                    </div>
                    <div className="px-0 user-select-none">
                        <LoopButton
                            looping={timerCardData?.looping}
                            onChange={() => action.toggleLooping()}
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className=" mx-2 h-8 w-auto my-1">
                        <PlayButton
                            isPlaying={timerCardData?.status === "playing"}
                            onChange={(state) => {
                                const foo = state
                                    ? action.playCard
                                    : action.pauseCard
                                foo()
                            }}
                        />
                    </div>
                    <StopButton
                        isStopped={timerCardData?.status === "stopped"}
                        onChange={(isStopped) => {
                            if (isStopped) action.stopCard()
                        }}
                    />
                </div>
                {timerCardData?.timerGroup?.timers.map((timer) => {
                    if (!timer) return null
                    return (
                        <Timer
                            key={timer.id}
                            id={timer.id}
                            active={runningTimer.currentTimerId === timer.id}
                            onDelete={(timerId) => {
                                action.closeTimer(timer.id)
                            }}
                            onNameChange={(newName) => {
                                action.updateTimer(timer.id, {
                                    name: newName
                                })
                            }}
                            onTimeChange={(newTime) => {
                                action.updateTimer(timer.id, {
                                    time: newTime
                                })
                            }}
                            name={timer.name}
                            time={timer.time}
                            onRecordStart={() => {
                                record()
                            }}
                            onRecordStop={() => {
                                const audioBlob = stopRecording()
                                // timerCard.addSound(timer.id, audioBlob)
                            }}
                        />
                    )
                })}
                <div className="flex justify-center mt-4">
                    <button
                        className={style.add_button}
                        onClick={() => {
                            action.addTimer({ name: "unnamed", time: 5 })
                        }}
                    >
                        Add Timer
                    </button>
                </div>
            </div>
        </div>
    )
}
