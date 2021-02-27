import React, { useState } from "react";
import Timer from "../timer/Timer";
import close from "./close.svg";

import { PlayButton } from "./playButton";
import { LoopButton } from "./loopButton";
import StopButton from "./stopButton";

import useTimerCard from "../../hooks/useTimerCards";

export default function TimerCard(props) {
  const { onDelete, timerCardId } = props;
  const { ...timerCard } = useTimerCard(props.timerCardId);
  const [editTitle, setEditTitle] = useState(() => false);

  return (
    <div className="mx-4 my-1 bg-white elevation-2 rounded-lg">
      <div
        className="p-2 border rounded-lg border-gray-300"
        style={{
          width: "25%",
          minWidth: "265px",
          maxWidth: "265px",
        }}
      >
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
                  const action = state
                    ? timerCard.playCard
                    : timerCard.pausecard;
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
                onNameChange={
                  (newName) => timerCard.changeTimerName(timerId, newName)
                }
                onTimeChange={(newTime) =>
                  timerCard.chanageTimerTime(timerId,newTime)
                }
                name={timer.name}
                time={timer.time}
              />
            );
          })}
          <div className="flex justify-center mt-4">
            <button
              className=" bg-blue-600 px-4 py-1 rounded-md text-white select-none transition duration-150 hover:elevation-4 transform hover:scale-110 hover:bg-blue-700"
              onClick={() => {
                timerCard.addTimer("unaname", 300);
              }}
            >
              Add Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
