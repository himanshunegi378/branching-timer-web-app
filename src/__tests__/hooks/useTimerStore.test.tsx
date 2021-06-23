import { renderHook } from "@testing-library/react-hooks"
import { act } from "react-test-renderer"
import useTimerStore, { Timer } from "../../hooks/useTimerStore"
import { localStorage } from "../../utils/localStorage"

describe("useTimerStore", () => {
    describe("check crud functionality working correctly", () => {
        test("add timer", async () => {
            const { result, rerender } = renderHook(() => useTimerStore())
            let timer: Timer
            act(() => {
                timer = result.current.addTimer("himanshu", 50)
            })
            act(() => {
                expect(result.current.getTimer(timer.id).id).toBe(timer.id)
            })
        })
        test("should add timer once ", () => {
            const { result, rerender } = renderHook(() => useTimerStore())
            let timer: Timer
            act(() => {
                timer = result.current.addTimer("himanshu", 50)
            })
            expect(Object.keys(result.current.timerStore).length).toBe(1)
            act(() => {
                for (let index = 0; index < 10; index++) {
                    result.current.addTimer("himanshu", 50)
                }
            })
            expect(Object.keys(result.current.timerStore).length).toBe(11)
        })

        test("should get timer", () => {
            const { result, rerender } = renderHook(() => useTimerStore())
            let timer: Timer
            act(() => {
                timer = result.current.addTimer("himanshu", 50)
            })
            act(() => {
                const fetchedTimer = result.current.getTimer(timer.id)
                expect(fetchedTimer.id).toBe(timer.id)
                expect(fetchedTimer.name).toBe("himanshu")
                expect(fetchedTimer.time).toBe(50)
            })
        })
        test("should update timer", () => {
            const { result, rerender } = renderHook(() => useTimerStore())
            let timer: Timer
            act(() => {
                timer = result.current.addTimer("himanshu", 50)
            })
            act(() => {
                result.current.updateTimer(timer.id, {
                    name: "laxmi",
                    time: 60
                })
            })
            act(() => {
                const fetchedTimer = result.current.getTimer(timer.id)

                expect(fetchedTimer.id).toBe(timer.id)
                expect(fetchedTimer.name).toBe("laxmi")
                expect(fetchedTimer.time).toBe(60)
            })
        })
        test("should update timer with current value if no new value is passed", () => {
            const { result, rerender } = renderHook(() => useTimerStore())
            let timer: Timer
            act(() => {
                timer = result.current.addTimer("himanshu", 50)
            })
            act(() => {
                result.current.updateTimer(timer.id, {})
            })
            act(() => {
                const fetchedTimer = result.current.getTimer(timer.id)

                expect(fetchedTimer.id).toBe(timer.id)
                expect(fetchedTimer.name).toBe("himanshu")
                expect(fetchedTimer.time).toBe(50)
            })
        })
        test("should delete timer", () => {
            const { result, rerender } = renderHook(() => useTimerStore())
            let timer: Timer
            act(() => {
                timer = result.current.addTimer("himanshu", 50)
            })
            act(() => {
                result.current.deleteTimer(timer.id)
            })
            act(() => {
                const fetchedTimer = result.current.getTimer(timer.id)
                expect(fetchedTimer).toBeUndefined()
            })
        })
    })

    describe("check timerstore is storing data properly in local storage", () => {
        test("should add timer in localstorage", () => {
            const { result, rerender } = renderHook(() => useTimerStore())
            let timer: Timer
            const spy = jest.spyOn(localStorage, "setItem")

            act(() => {
                timer = result.current.addTimer("himanshu", 50)
            })
            act(() => {
                expect(localStorage.setItem).toHaveBeenCalledWith(
                    timer.id,
                    timer
                )
            })
            expect(localStorage.setItem).toBeCalledTimes(1)

            act(() => {
                timer = result.current.addTimer("laxmi", 50)
            })
            act(() => {
                expect(localStorage.setItem).toHaveBeenCalledWith(
                    timer.id,
                    timer
                )
            })
            expect(localStorage.setItem).toBeCalledTimes(2)
            // act(() => {
            //     expect(result.current.getTimer(timer.id).id).toBe(timer.id)
            // })
        })
        test("should update timer in localstorage", () => {
            const { result, rerender } = renderHook(() => useTimerStore())
            let timer: Timer
            const spy = jest.spyOn(localStorage, "setItem")

            act(() => {
                timer = result.current.addTimer("himanshu", 50)
            })

            act(() => {
                result.current.updateTimer(timer.id, {
                    name: "laxmi",
                    time: 60
                })
            })
            act(() => {
                expect(spy.mock.calls[1]).toEqual([
                    timer.id,
                    result.current.timerStore[timer.id]
                ])
            })
            spy.mockRestore()
        })

        test("should delete timer in localstorage", () => {
            const { result, rerender } = renderHook(() => useTimerStore())
            let timer: Timer
            const spy = jest.spyOn(localStorage, "removeItem")

            act(() => {
                timer = result.current.addTimer("himanshu", 50)
            })

            act(() => {
                result.current.deleteTimer(timer.id)
            })
            act(() => {
                expect(spy.mock.calls[0]).toEqual([timer.id])
            })
            spy.mockRestore()
        })
        test("should  load timer data from local storage", async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useTimerStore()
            )
            let timer: Timer
            const spy = jest.spyOn(localStorage, "getItem")

            act(() => {
                timer = result.current.addTimer("himanshu", 50)
            })

            act(() => {
                result.current.init([timer.id])
            })
            await waitForNextUpdate()
            act(() => {
                expect(spy.mock.results[0].value).resolves.toEqual(timer)
            })
            spy.mockRestore()
        })
        test("should  load nothing if no data against timer id", async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                useTimerStore()
            )
            let timer: Timer
            const spy = jest.spyOn(localStorage, "getItem")

            act(() => {
                result.current.init(["anything"])
            })
            expect(await spy.mock.results[0].value).toEqual(null)
            expect(result.current.timerStore).toEqual({})
            spy.mockRestore()
        })
    })
})
