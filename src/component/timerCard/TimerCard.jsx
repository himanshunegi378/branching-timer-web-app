import React, { useState } from "react";
import Timer from "../timer/Timer";
import close from "./close.svg";
import style from "./style.module.scss";

import { PlayButton } from "./playButton";
import { LoopButton } from "./loopButton";
import StopButton from "./stopButton";

import useTimerCard from "../../hooks/useTimerCards";
import useAudioRecorder from "../../hooks/useAudioRecorder";

export default function TimerCard(props) {
  const { onDelete, timerCardId, className } = props;
  const { ...timerCard } = useTimerCard(props.timerCardId);
  const [editTitle, setEditTitle] = useState(() => false);
  const { record, stopRecording, audioBlob } = useAudioRecorder();

  return (
    <div className={`bg-white rounded-lg ${className}`}>
      <div className="flex flex-row-reverse">
        <button
          className="select-none outline-none rounded-full transition duration-150 hover:elevation-2 transform hover:scale-110"
          // className="btn btn-danger"
          onClick={() => {
            timerCard.deleteTimerCard();
            onDelete(timerCardId);
          }}
        >
          <img className="h-6 w-auto" src={close} />
        </button>
      </div>
      <div>
        <div className="text-7xl font-mono tracking-tighter font-medium text-center select-none">
          {parseInt(timerCard.runningTimer.remainingTime / 60) <= 9
            ? "0" + parseInt(timerCard.runningTimer.remainingTime / 60)
            : parseInt(timerCard.runningTimer.remainingTime / 60)}
          :
          {timerCard.runningTimer.remainingTime % 60 <= 9
            ? "0" + (timerCard.runningTimer.remainingTime % 60)
            : timerCard.runningTimer.remainingTime % 60}
        </div>
        <hr />
        <div className="flex flex-row justify-between mx-2">
          <div className="text-center font-medium cursor-pointer">
            <div onClick={() => setEditTitle(true)}>
              {editTitle ? (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const title = event.currentTarget.title.value;
                    if (title) {
                      timerCard.changeTimerCardName(title);
                    }
                    setEditTitle(false);
                  }}
                  onBlur={(event) => {
                    event.preventDefault();
                    const title = event.currentTarget.title.value;
                    if (title) {
                      timerCard.changeTimerCardName(title);
                    }
                    setEditTitle(false);
                  }}
                >
                  <input autoFocus type="text" name="title" />
                </form>
              ) : (
                timerCard.timerCardData.name
              )}
            </div>
          </div>
          <div className="px-0 user-select-none">
            <LoopButton
              looping={timerCard.timerCardData.looping}
              onChange={() => timerCard.toggleLooping()}
            />
          </div>
        </div>
        <div className="flex">
          <div className=" mx-2 h-8 w-auto my-1">
            <PlayButton
              isPlaying={timerCard.timerCardData.status === "playing"}
              onChange={(state) => {
                const action = state ? timerCard.playCard : timerCard.pausecard;
                action();
              }}
            />
          </div>
          <StopButton
            isStopped={timerCard.timerCardData.status === "stopped"}
            onChange={(isStopped) => {
              if (isStopped) timerCard.stopCard();
            }}
          />
        </div>
        {timerCard.timerCardData.timers.map((timerId) => {
          const timer = timerCard.timerStore[timerId];
          return (
            <Timer
              key={timer.id}
              id={timer.id}
              active={timerCard.runningTimer?.currentTimerId === timer?.id}
              onDelete={(timerId) => {
                timerCard.removeTimer(timerId);
              }}
              onNameChange={(newName) =>
                timerCard.changeTimerName(timerId, newName)
              }
              onTimeChange={(newTime) =>
                timerCard.chanageTimerTime(timerId, newTime)
              }
              name={timer.name}
              time={timer.time}
              onRecordStart={() => {
                record();
              }}
              onRecordStop={() => {
                const audioBlob = stopRecording();
                timerCard.addSound(timerId, audioBlob);
              }}
            />
          );
        })}
        <div className="flex justify-center mt-4">
          <button
            className={style.add_button}
            onClick={() => {
              timerCard.addTimer("unaname", 300);
            }}
          >
            Add Timer
          </button>
        </div>
      </div>
    </div>
  );
}
