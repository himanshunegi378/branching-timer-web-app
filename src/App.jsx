import React, { useEffect } from "react"
import style from "./App.module.scss"
import { v4 } from "uuid"
import TimerCard from "./component/timerCard/TimerCard"
import { useCreateTimerCard } from "./contexts/TimerCards"

function App(props) {
    const { allTimerCardsId, createTimerCard, deleteTimerCard } =
        useCreateTimerCard()

    useEffect(() => {
        document.body.classList.remove("page-loading")
        document.body.classList.add("page-loaded")
        document.body.classList.add("bg-gray-50")
    }, [])

    return (
        <div>
            <section className={style.container}>
                <div className={style.header}></div>

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
            <section id="footer" className="bg-gray-100 p-4">
                <h1 className="text-5xl font-bold text-center">TimerCards</h1>
                <p>
                    I would love to hear your{" "}
                    <a
                        className="text-green-600"
                        href="mailto:davidxavier378@gmail.com"
                    >
                        Feedback / Sugesstions
                    </a>{" "}
                </p>
            </section>
        </div>
    )
}

export default App
