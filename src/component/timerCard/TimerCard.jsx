import React, { useEffect, useState } from "react";
import Timer from "../timer/Timer";
import close from "./close.svg";
import style from "./style.module.scss";

import { useEndTime, useTimerCard } from "../../contexts/TimerCards";
import { PlayButton } from "../molecules/PlayButton/PlayButton.component";
import StopButton from "../molecules/StopButton/StopButton.component";
import LoopButton from "../molecules/LoopButton/LoopButton.component";
import { CloseButton } from "../molecules/CloseButton/CloseButton.component";

export default function TimerCard(props) {
  const { onDelete, timerCardId, className } = props;
  const [editTitle, setEditTitle] = useState(() => false);
  const { timerCardData, runningTimer, actions } = useTimerCard(timerCardId);
  const endTimes = useEndTime(timerCardId, 5);

  useEffect(() => {
    endTimes.forEach((endTime, i) => {
      console.log(`${i + 1} ${endTime.toLocaleString()}`);
    });
    return () => {};
  }, [endTimes]);

  if (!timerCardData) return <div></div>;
  return (
    <div className={`bg-white rounded-lg ${className}`}>
      <div className="flex justify-between align-items-center">
        <div className="text-center font-medium cursor-pointer fancy-scrollbar mr-2 w-full">
          <div
            className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full text-left"
            onClick={() => setEditTitle(true)}
          >
            {editTitle ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const title = event.currentTarget.title.value;
                  if (title) {
                    actions.renameTimerCard(title);
                  }
                  setEditTitle(false);
                }}
                onBlur={(event) => {
                  event.preventDefault();
                  const title = event.currentTarget.title.value;
                  if (title) {
                    actions.renameTimerCard(title);
                  }
                  setEditTitle(false);
                }}
              >
                <input
                  autoFocus
                  type="text"
                  name="title"
                  defaultValue={timerCardData.timerGroup.name}
                />
              </form>
            ) : (
              timerCardData.timerGroup.name
            )}
          </div>
        </div>
        <CloseButton onClick={() => onDelete(timerCardId)} />
      </div>
      <div className="flex flex-col min-h-0">
        <div className="text-7xl font-mono tracking-tighter font-medium text-center select-none ">
          {parseInt(runningTimer.remainingTime / 60) <= 9
            ? "0" + parseInt(runningTimer.remainingTime / 60)
            : parseInt(runningTimer.remainingTime / 60)}
          :
          {runningTimer.remainingTime % 60 <= 9
            ? "0" + (runningTimer.remainingTime % 60)
            : runningTimer.remainingTime % 60}
        </div>
        <hr />
        <div className="flex mt-2">
          <div className=" mx-2 h-8 w-auto my-1">
            <PlayButton
              isPlaying={timerCardData?.status === "playing"}
              onChange={(state) => {
                if (state) {
                  actions.playCard();
                } else {
                  actions.pauseCard();
                }
              }}
            />
          </div>
          <StopButton
            isStopped={timerCardData?.status === "stopped"}
            onChange={(isStopped) => {
              if (isStopped) actions.stopCard();
            }}
          />
          <div className="px-0 user-select-none ml-auto">
            <LoopButton
              looping={timerCardData?.looping}
              onChange={() => {
                actions.toggleLoop();
              }}
            />
          </div>
        </div>
        <div className="overflow-auto fancy-scrollbar px-1  ">
          {timerCardData?.timerGroup?.timers.map((timer) => {
            if (!timer) return null;
            return (
              <Timer
                key={timer.id}
                id={timer.id}
                active={runningTimer.id === timer.id}
                onDelete={(timerId) => {
                  actions.removeTimer(timer.id);
                }}
                onNameChange={(newName) => {
                  actions.editTimer(timer.id, {
                    name: newName,
                  });
                }}
                onTimeChange={(newTime) => {
                  actions.editTimer(timer.id, {
                    time: newTime,
                  });
                }}
                name={timer.name}
                time={timer.time}
              />
            );
          })}
        </div>
        <div className="flex justify-center mt-4">
          <button
            test="addButton"
            className={style.add_button}
            onClick={() => {
              actions.addTimer({ name: "unnamed", time: 60 });
            }}
          >
            Add Timer
          </button>
        </div>
      </div>
    </div>
  );
}
