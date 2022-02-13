import React from "react";
import style from "./timerCards.module.scss";
import { v4 } from "uuid";
import { useCreateTimerCard } from "../../contexts/TimerCards";
import TimerCard from "../../component/timerCard/TimerCard";

export function TimerCards(props) {
  const { allTimerCardsId, createTimerCard, deleteTimerCard } =
    useCreateTimerCard();

  return (
    <div>
      <section className={style.container}>
        <div className={style.body}>
          <div
            className={` ${style.hs} fancy-scrollbar`}
            style={{ alignItems: "flex-start" }}
          >
            {allTimerCardsId.map((timerCardId) => {
              return (
                <TimerCard
                  className={style.item}
                  key={timerCardId}
                  timerCardId={timerCardId}
                  onDelete={(id) => {
                    deleteTimerCard(id);
                  }}
                />
              );
            })}
            <div className={style.item}>
              <button
                test="addTimerCardButton"
                className="select-none bg-blue-600 text-white px-4 py-2 rounded-full"
                onClick={() => {
                  createTimerCard(v4());
                }}
              >
                Add Timer Card
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-gray-100">
        <section id="footer" className="container mx-auto px-2 md:px-4 py-4">
          <h1 className="text-5xl font-bold text-center mb-4">TimerCards</h1>
          <div className="mb-4">
            <h5 className="font-bold text-2xl">What is TimerCards?</h5>
            <p>
              Timercard is an app that consists of cards (timercards) and those
              cards consist of timers. Every card is capable of sequentially
              playing timers created in it.
            </p>
          </div>
          <div className="mb-4">
            <h5 className="font-bold text-2xl">What can I do with it?</h5>
            <p>
              Well I don't know what can you do with it but I can tell what I do
              with it. I use it to make a Pomdoro timer (a card with two timers
              25 mins and 5 mins), a card for water drinking (30 min timercard)
              and a card for workout.
            </p>
          </div>
          <div>
            <p>
              I would love to hear your{" "}
              <a
                className="text-green-600"
                href="mailto:himanshunegi378@gmail.com"
              >
                Feedback / Sugesstions
              </a>
            </p>
          </div>
        </section>
        <section className="mb-4">
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href="https://github.com/himanshunegi378/branching-timer-web-app"
              target="_noreferrer"
              className="bg-gray-700 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="w-5"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
