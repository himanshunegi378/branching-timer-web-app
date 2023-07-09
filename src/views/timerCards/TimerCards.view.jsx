import React from "react";
import { v4 } from "uuid";
import { useCreateTimerCard } from "../../contexts/TimerCards";
import TimerCard from "../../component/timerCard/TimerCard";
import { Button } from "../../component/atoms/Button/Button.atom";
import {
  TrelloItem,
  TrelloLayout,
} from "../../component/templates/TrelloLayout";
import { TimerCardTasks } from "../../component/templates/TimerCardTasks";
import { TimerCardData } from "../../HOC/TimerCardData";

export function TimerCards(props) {
  const { allTimerCardsId, createTimerCard, deleteTimerCard } =
    useCreateTimerCard();

  return (
    <div>
      <section className="h-screen p-4">
        <TrelloLayout>
          {allTimerCardsId.map((timerCardId) => {
            return (
              <TrelloItem key={timerCardId}>
                <TimerCardData
                  id={timerCardId}
                  render={(timerCardData) => {
                    if (!timerCardData) return null;
                    return <TimerCardTasks timerCardData={timerCardData} />;
                  }}
                />
                {/* <TimerCard
                  // className={style.item}
                  timerCardId={timerCardId}
                  onDelete={(id) => {
                    deleteTimerCard(id);
                  }}
                /> */}
              </TrelloItem>
            );
          })}
          <TrelloItem>
            <Button
              className="whitespace-nowrap"
              onClick={() => {
                createTimerCard(v4());
              }}
            >
              Add Timer Card
            </Button>
          </TrelloItem>
        </TrelloLayout>
      </section>
      <div className="bg-gray-100">
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-5xl font-bold">TimerCards</h1>
          <h2 class="text-2xl font-bold mb-2 text-gray-500">
            A Versatile Timer App for Efficient Time Management
          </h2>

          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-2">What is TimerCards?</h2>
            <p class="text-gray-700 leading-loose">
              TimerCards is a powerful and user-friendly app designed to enhance
              your productivity and time management skills. With TimerCards, you
              can easily create and customize cards consisting of sequential
              timers to streamline your daily tasks and activities.
            </p>
          </div>

          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-2">What can I do with it?</h2>
            <p class="text-gray-700 leading-loose">
              TimerCards offers a wide range of possibilities. Some examples
              include:
            </p>
            <ul class="list-disc list-inside text-gray-700 leading-loose">
              <li>
                Creating a Pomodoro timer with two timers: 25 minutes of focused
                work followed by a 5-minute break
              </li>
              <li>
                Setting up a water drinking card with a 30-minute timer to
                remind you to stay hydrated
              </li>
              <li>Creating a workout card to track your exercise routines</li>
            </ul>
          </div>

          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-2">
              How can TimerCards help with time management?
            </h2>
            <p class="text-gray-700 leading-loose">
              TimerCards enables you to organize your time effectively and stay
              on track. By utilizing the app's sequential timers, you can
              allocate specific durations to different tasks, ensuring a
              structured approach to your day. Whether you need to focus, take
              breaks, or manage your daily activities, TimerCards has you
              covered.
            </p>
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-2">
              Why should I choose TimerCards?
            </h2>
            <p class="text-gray-700 leading-loose">
              TimerCards stands out with its intuitive interface, customizable
              timer cards, and seamless functionality. The app is designed to
              provide a hassle-free experience, helping you optimize your
              productivity and achieve your goals. Take control of your time
              with TimerCards today!
            </p>
          </div>
        </div>
        {/* <section id="footer" className="container mx-auto px-2 md:px-4 py-4">
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
        </section> */}
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
