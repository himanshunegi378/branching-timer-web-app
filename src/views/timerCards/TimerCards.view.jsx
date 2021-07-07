import React, { useEffect } from "react"
import style from "./timerCards.module.scss"
import { v4 } from "uuid"
import { useCreateTimerCard } from "../../contexts/TimerCards"
import TimerCard from "../../component/timerCard/TimerCard"
import { Link } from "react-router-dom"

export function TimerCards(props) {
    const { allTimerCardsId, createTimerCard, deleteTimerCard } =
        useCreateTimerCard()

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
                                        deleteTimerCard(id)
                                    }}
                                />
                            )
                        })}
                        <div className={style.item}>
                            <button
                                test="addTimerCardButton"
                                className="select-none bg-blue-600 text-white px-4 py-2 rounded-full"
                                onClick={() => {
                                    createTimerCard(v4())
                                }}
                            >
                                Add Timer Card
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-gray-100">
                <section
                    id="footer"
                    className="container mx-auto px-2 md:px-4 py-4"
                >
                    <h1 className="text-5xl font-bold text-center mb-4">
                        TimerCards
                    </h1>
                    <div className="mb-4">
                        <h5 className="font-bold text-2xl">
                            What is TimerCards?
                        </h5>
                        <p>
                            Timercard is an app that consists of cards
                            (timercards) and those cards consist of timers.
                            Every card is capable of sequentially playing timers
                            created in it.
                        </p>
                    </div>
                    <div className="mb-4">
                        <h5 className="font-bold text-2xl">
                            What can I do with it?
                        </h5>
                        <p>
                            Well I don't know what can you do with it but I can
                            tell what I do with it. I use it to make a Pomdoro
                            timer (a card with two timers 25 mins and 5 mins), a
                            card for water drinking (30 min timercard) and a
                            card for workout.
                        </p>
                    </div>
                    <div>
                        <p>
                            I would love to hear your{" "}
                            <a
                                className="text-green-600"
                                href="mailto:davidxavier378@gmail.com"
                            >
                                Feedback / Sugesstions
                            </a>{" "}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}
