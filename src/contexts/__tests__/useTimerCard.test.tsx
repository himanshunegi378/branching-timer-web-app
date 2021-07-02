import { renderHook } from "@testing-library/react-hooks"
import * as React from "react"
import { act } from "react-test-renderer"
import { v4 } from "uuid"
import { useTimerCard, TimerCardsProvider } from "../TimerCards/TimerCards.context"
import { Timer, TimerCard } from "../TimerCards/TimerCards.types"

describe("useTimerCard", () => {
    global.URL.createObjectURL = jest.fn()

    afterEach(() => {
        //@ts-ignore
        global.URL.createObjectURL.mockReset()
    })

    test("should provide initial timerCardobject if not timercard exist against timercardId", async () => {
        const wrapper = ({ children }: { children: any }) => (
            <TimerCardsProvider>{children}</TimerCardsProvider>
        )
        const timerCardId = v4()
        const { result, rerender, waitForValueToChange, waitForNextUpdate } =
            renderHook(() => useTimerCard(timerCardId), { wrapper })

        // await waitForValueToChange(() => {
        //     return result.current.timerCardData
        // })
        expect(result.current.timerCardData).toEqual<TimerCard>({
            timerGroup: {
                id: expect.any(String),
                name: expect.any(String),
                timers: []
            },
            looping: expect.any(Boolean),
            status: expect.any(String),
            currentTimer: undefined
        })
    })
    test("should add timer", () => {
        const wrapper = ({ children }: { children: any }) => (
            <TimerCardsProvider>{children}</TimerCardsProvider>
        )
        const timerCardId = v4()
        const { result } = renderHook(() => useTimerCard(timerCardId), {
            wrapper
        })
        expect(result.current.timerCardData?.timerGroup.timers.length).toBe(0)

        act(() => {
            result.current.action.addTimer({ name: "himanshu", time: 50 })
        })
        expect(result.current.timerCardData?.timerGroup.timers.length).toBe(1)
        expect(
            result.current.timerCardData?.timerGroup.timers[0]
        ).toEqual<Timer>({ id: expect.any(String), name: "himanshu", time: 50 })
    })
    test("should remove timer", () => {
        const wrapper = ({ children }: { children: any }) => (
            <TimerCardsProvider>{children}</TimerCardsProvider>
        )
        const timerCardId = v4()
        const { result } = renderHook(() => useTimerCard(timerCardId), {
            wrapper
        })

        act(() => {
            result.current.action.addTimer({ name: "himanshu", time: 50 })
        })
        const timer = result.current.timerCardData?.timerGroup.timers[0]
        act(() => {
            result.current.action.closeTimer(timer?.id as string)
        })
        expect(result.current.timerCardData?.timerGroup.timers.length).toBe(0)
    })
    test("should edit timer", () => {
        const wrapper = ({ children }: { children: any }) => (
            <TimerCardsProvider>{children}</TimerCardsProvider>
        )
        const timerCardId = v4()
        const { result } = renderHook(() => useTimerCard(timerCardId), {
            wrapper
        })

        act(() => {
            result.current.action.addTimer({ name: "himanshu", time: 50 })
        })
        const timer = result.current.timerCardData?.timerGroup.timers[0]
        act(() => {
            result.current.action.updateTimer(timer?.id as string, {
                name: "himanshu",
                time: 20
            })
        })
        expect(
            result.current.timerCardData?.timerGroup.timers[0]
        ).toEqual<Timer>({ id: expect.any(String), name: "himanshu", time: 20 })
    })
    test("should rename timercard", () => {
        const wrapper = ({ children }: { children: any }) => (
            <TimerCardsProvider>{children}</TimerCardsProvider>
        )
        const timerCardId = v4()
        const { result } = renderHook(() => useTimerCard(timerCardId), {
            wrapper
        })

        const newName = "timercard1"
        act(() => {
            result.current.action.changeCardName(newName)
        })
        expect(result.current.timerCardData?.timerGroup.name).toBe(newName)
    })
    test.todo("should close timer card")
    test("should toggle loop", () => {
        const wrapper = ({ children }: { children: any }) => (
            <TimerCardsProvider>{children}</TimerCardsProvider>
        )
        const timerCardId = v4()
        const { result } = renderHook(() => useTimerCard(timerCardId), {
            wrapper
        })
        const loopStatus = result.current.timerCardData?.looping
        act(() => {
            result.current.action.toggleLooping()
        })
        expect(result.current.timerCardData?.looping).toBe(!loopStatus)
    })
    test.todo("should play card")
    test.todo("should not play card if no timers")
    test.todo("should stop timer card")
})
