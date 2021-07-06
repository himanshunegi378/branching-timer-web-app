import React, { useState } from "react"
import Timer from "../timer/Timer"
import close from "./close.svg"
import style from "./style.module.scss"

import { PlayButton } from "./playButton"
import { LoopButton } from "./loopButton"
import StopButton from "./stopButton"

import useAudioRecorder from "../../hooks/useAudioRecorder"
import { useTimerCard } from "../../contexts/TimerCards"

export default function TimerCard(props) {
    const { onDelete, timerCardId, className } = props
    const [editTitle, setEditTitle] = useState(() => false)
    const { record, stopRecording } = useAudioRecorder()
    const { timerCardData, runningTimer, actions } = useTimerCard(timerCardId)

    if (!timerCardData) return <div></div>
    return (
        <div className={`bg-white rounded-lg ${className}`}>
            <div className="flex flex-row-reverse">
                <button
                    test="closeButton"
                    className="select-none outline-none rounded-full transition duration-150 hover:elevation-2 transform hover:scale-110"
                    onClick={() => {
                        onDelete(timerCardId)
                    }}
                >
                    <img className="h-6 w-auto" src={close} alt="" />
                </button>
            </div>
            <div className='flex flex-col min-h-0'>
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
                                            actions.renameTimerCard(title)
                                        }
                                        setEditTitle(false)
                                    }}
                                    onBlur={(event) => {
                                        event.preventDefault()
                                        const title =
                                            event.currentTarget.title.value
                                        if (title) {
                                            actions.renameTimerCard(title)
                                        }
                                        setEditTitle(false)
                                    }}
                                >
                                    <input
                                        autoFocus
                                        type="text"
                                        name="title"
                                        defaultValue={
                                            timerCardData.timerGroup.name
                                        }
                                    />
                                </form>
                            ) : (
                                timerCardData.timerGroup.name
                            )}
                        </div>
                    </div>
                    <div className="px-0 user-select-none">
                        <LoopButton
                            looping={timerCardData?.looping}
                            onChange={() => {
                                actions.toggleLoop()
                            }}
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className=" mx-2 h-8 w-auto my-1">
                        <PlayButton
                            isPlaying={timerCardData?.status === "playing"}
                            onChange={(state) => {
                                if (state) {
                                    actions.playCard()
                                } else {
                                    actions.pauseCard()
                                }
                            }}
                        />
                    </div>
                    <StopButton
                        isStopped={timerCardData?.status === "stopped"}
                        onChange={(isStopped) => {
                            if (isStopped) actions.stopCard()
                        }}
                    />
                </div>
                <div className='overflow-auto fancy-scrollbar px-1  '>
                    {timerCardData?.timerGroup?.timers.map((timer) => {
                        if (!timer) return null
                        return (
                            <Timer
                                key={timer.id}
                                id={timer.id}
                                active={runningTimer.id === timer.id}
                                onDelete={(timerId) => {
                                    actions.removeTimer(timer.id)
                                }}
                                onNameChange={(newName) => {
                                    actions.editTimer(timer.id, {
                                        name: newName
                                    })
                                }}
                                onTimeChange={(newTime) => {
                                    actions.editTimer(timer.id, {
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
                                    actions.addAudioToTimer(timer.id, audioBlob)
                                }}
                            />
                        )
                    })}
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        test="addButton"
                        className={style.add_button}
                        onClick={() => {
                            actions.addTimer({ name: "unnamed", time: 60 })
                        }}
                    >
                        Add Timer
                    </button>
                </div>
            </div>
        </div>
    )
}
