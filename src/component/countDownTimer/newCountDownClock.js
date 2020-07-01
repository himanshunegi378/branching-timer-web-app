import { store } from '../../store/store'
import { timerFinished } from '../../slices/timerSlice';
import { Howl } from 'howler';
import alarmSound from '../alarmSound/alarm.mp3'


function createCountDownTimer(seconds, onTick, onFinished) {
    let countDownTime = { time: seconds }
    let remainingTime = { time: seconds }
    const startTimer = new Date()


    const timer = setInterval(() => {
        let delta = Date.now() - startTimer
        remainingTime.time = countDownTime.time - (delta / 1000)
        if (remainingTime.time < 0) {
            store.dispatch()
            // onFinished()
            clearInterval(timer)
        } else {
            onTick(remainingTime.time)
        }
    }, 1000);

    return function destroyTimer() {
        clearInterval(timer)
    }
}

const timersRunning = {}


function createCountDownTimerWithCardId(cardId, onTick, onFinished) {
    const startTimer = new Date()
    const Card = store.getState().timer.timerCards[cardId];
    const activetTimerId = Card.activeTimer.id
    const activeTimerIndex = Card.activeTimer.index
    const timer = store.getState().timer.timers[activetTimerId]
    const { mins, secs } = timer
    const seconds = (mins ? mins * 60 : 0) + (secs || 0)
    let countDownTime = seconds
    let remainingTime = seconds

    timersRunning[cardId] = timersRunning[cardId] || {}
    if (timersRunning[cardId].remainingTime) {
        countDownTime = timersRunning[cardId].remainingTime
        remainingTime = timersRunning[cardId].remainingTime
    }
    clearInterval(timersRunning[cardId].handle)

    const timerHandle = setInterval(() => {
        let delta = Date.now() - startTimer
        remainingTime = countDownTime - (delta / 1000)
        timersRunning[cardId].remainingTime = remainingTime
        console.log(timersRunning[cardId])
        if (remainingTime < 0) {
            var sound = new Howl({
                src: [alarmSound]
            })
            const id = sound.play()
            setTimeout(() => {
                sound.stop(id)
            }, 3000)
            store.dispatch(timerFinished({ id: cardId }))
            clearInterval(timerHandle)
            timersRunning[cardId].remainingTime = undefined
            createCountDownTimerWithCardId(cardId, onTick)
        }
        onTick(remainingTime)
    }, 1000);

    timersRunning[cardId].handle = timerHandle
    return timersRunning[cardId]
}

function createCountDownTimerWithCardIdWithoutCallBack(cardId, onFinished) {
    const startTimer = new Date()
    const Card = store.getState().timer.timerCards[cardId];
    const activetTimerId = Card.activeTimer.id
    const activeTimerIndex = Card.activeTimer.index
    const timer = store.getState().timer.timers[activetTimerId]
    const { mins, secs } = timer
    const seconds = (mins ? mins * 60 : 0) + (secs || 0)
    let countDownTime = seconds
    let remainingTime = seconds

    timersRunning[cardId] = timersRunning[cardId] || {}
    if (timersRunning[cardId].remainingTime) {
        countDownTime = timersRunning[cardId].remainingTime
        remainingTime = timersRunning[cardId].remainingTime
    }
    clearInterval(timersRunning[cardId].handle)

    const timerHandle = setInterval(() => {
        let delta = Date.now() - startTimer
        remainingTime = countDownTime - (delta / 1000)
        timersRunning[cardId].remainingTime = remainingTime
        console.log(timersRunning[cardId])
        if (remainingTime < 0) {
            var sound = new Howl({
                src: [alarmSound]
            })
            const id = sound.play()
            setTimeout(() => {
                sound.stop(id)
            }, 3000)
            store.dispatch(timerFinished({ id: cardId }))
            clearInterval(timerHandle)
            timersRunning[cardId].remainingTime = undefined
            createCountDownTimerWithCardIdWithoutCallBack(cardId)
        }
    }, 1000);

    timersRunning[cardId].handle = timerHandle
    return timersRunning[cardId]
}

function doesCardIdExist(cardId) {
    if (timersRunning.hasOwnProperty(cardId)) {
        return { ...timersRunning[cardId], destroy: () => { delete timersRunning[cardId] } }
    } else {
        return undefined
    }
}


export default createCountDownTimer
export { createCountDownTimer, createCountDownTimerWithCardId, createCountDownTimerWithCardIdWithoutCallBack, doesCardIdExist }