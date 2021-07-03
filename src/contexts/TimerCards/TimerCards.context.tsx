import React, { PropsWithChildren, useEffect, useRef, useState } from "react"
import CountdownTimer from "../../lib/countdownTimer"
import showNotification from "../../utils/notification"
import { timerCardsReducer } from "./reducer"
import { timerCardIDsStorage, timerCardStorage } from "./storage"
import { Action, TimerCard as TimerCardType } from "./TimerCards.types"
import EventEmitter from "events"
import useSoundPlayer from "../../hooks/useSoundPlayer"
//@ts-ignore
import defaultSound from "./alarm.mp3"
import { useAudioStore } from "../../providers/audioProvider"
import { usePrevious } from "../../hooks/usePrevious"
import { TimerCard } from "./TimerCard"
import { v4 } from "uuid"
import { localStorage } from "../../utils/localStorage"
export const TimeCardsContext = React.createContext<{
    Timercards: Record<string, TimerCard>
    actions: any
    timerCardsId: string[]
}>({
    Timercards: {},
    actions: {},
    timerCardsId: []
})

export function TimerCardsProvider(props: PropsWithChildren<{}>) {
    const TimerCardsRef = useRef<Record<string, TimerCard>>({})
    const [timerCardsId, setTimerCardsId] = useState<string[]>([])

    useEffect(() => {
        const onPageOpen = async () => {
            const timerCardsId = await timerCardIDsStorage.load()
            if (!timerCardsId) return

            timerCardsId.forEach((id) => {
                if (!id) return
                const timerCard = new TimerCard(id)
                TimerCardsRef.current[id] = timerCard
            })
            setTimerCardsId(timerCardsId)
        }
        onPageOpen()
    }, [])

    useEffect(() => {
        timerCardIDsStorage.save(timerCardsId)

        const onPageClose = () => {
            timerCardsId.forEach((id) => {
                TimerCardsRef.current[id].save()
            })
        }
        window.addEventListener("beforeunload", onPageClose)
        return () => {
            window.removeEventListener("beforeunload", onPageClose)
        }
    }, [timerCardsId])

    const addTimerCard = (timercardId: string) => {
        const newTimerCard = new TimerCard(timercardId)
        TimerCardsRef.current[timercardId] = newTimerCard
        setTimerCardsId((ids) => [...ids, timercardId])
    }

    const deleteTimerCard = (timerCardId: string) => {
        TimerCardsRef.current[timerCardId].cleanup()
        delete TimerCardsRef.current[timerCardId]
        setTimerCardsId((ids) => ids.filter((id) => id !== timerCardId))
    }

    return (
        <TimeCardsContext.Provider
            value={{
                Timercards: TimerCardsRef.current,
                timerCardsId,
                actions: {
                    addTimerCard,
                    deleteTimerCard
                }
            }}
        >
            {props.children}
        </TimeCardsContext.Provider>
    )
}
