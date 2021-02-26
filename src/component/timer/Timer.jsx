import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import close from "./close.svg";

function Timer(props) {
  const {
    onNameChange,
    onTimeChange,
    onDelete,
    id,
    name,
    time,
    active,
  } = props;

  const [mins, setMins] = useState();
  const [secs, setSecs] = useState();
  const [editTitle, setEditTitle] = useState(() => false);
  const [titleBgColor, setTitleBgColor] = useState("alert-info");

  useEffect(() => {
    if (!time) return;
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);
    setMins(minutes);
    setSecs(seconds);
  }, [time]);

  useEffect(() => {
    if (active) {
      setTitleBgColor("bg-red-100");
    } else {
      setTitleBgColor("bg-blue-100");
    }
  }, [active]);

  return (
    <div
      id={props.id}
      // className="my-1 px-2 pt-2 border rounded-lg border-gray-300"
      className="my-1 rounded-lg"
    >
      <div
        className={`${titleBgColor} rounded-t-lg  border border-b-0 border-gray-300 px-1 `}
      >
        <div className={`flex flex-row justify-between items-center`}>
          <div onClick={() => setEditTitle(true)}>
            {editTitle ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setEditTitle(false);
                  onNameChange(event.currentTarget.title.value);
                }}
                onBlur={(event) => {
                  onNameChange(event.currentTarget.title.value);
                  setEditTitle(false);
                }}
              >
                <input
                  autoFocus
                  autoComplete={"off"}
                  type="text"
                  name="title"
                />
              </form>
            ) : (
              name
            )}
          </div>
          <div>
            <button
              className="select-none"
              onClick={() => {
                onDelete(id);
              }}
            >
              <img className="h-4 w-auto" src={close} />
            </button>
          </div>
        </div>
      </div>

      <div className="border border-t-0 rounded-b-lg border-gray-300">
        {/* <div className={messageBgColor}>{TimerDetail.message}</div> */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const minutes = parseInt(event.currentTarget.mins.value);
            const seconds = parseInt(event.currentTarget.secs.value);
            let time = 0;
            if (minutes) time += minutes * 60;
            if (seconds) time += seconds;
            onTimeChange(time);
          }}
          onBlur={(event) => {
            const minutes = parseInt(event.currentTarget.mins.value);
            const seconds = parseInt(event.currentTarget.secs.value);
            let time = 0;
            console.log(minutes, seconds);
            if (minutes) time += minutes * 60;
            if (seconds) time += seconds;
            console.log(time);
            onTimeChange(time);
          }}
          className="text-center py-2"
        >
          <input
            name="mins"
            style={{ width: "3em" }}
            type="number"
            placeholder="m"
            onChange={(e) => setMins(e.target.value)}
            value={mins}
          />
          <span className="mx-1">:</span>
          <input
            name="secs"
            style={{ width: "3em" }}
            type="number"
            placeholder="s"
            onChange={(e) => setSecs(e.target.value)}
            value={secs}
          />
        </form>
      </div>
    </div>
  );
}

export default Timer;
