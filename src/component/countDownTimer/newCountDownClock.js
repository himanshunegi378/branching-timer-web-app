import { store } from '../../store/store'
import { timerFinished } from '../../slices/timerSlice';
import { Howl } from 'howler';
import alarmSound from './alarm.mp3'

const timersRunning = {}

function playSound(sound, seconds) {
    var soundToPlay = new Howl({
        src: [sound]
    })
    const id = soundToPlay.play()
    setTimeout(() => {
        soundToPlay.stop(id)
    }, (seconds || 1) * 1000)
}


function createCountDownTimerWithCardId(cardId, onTick, onFinished) {
    const startTimer = new Date()
    const Card = store.getState().timer.timerCards[cardId];
    const activetTimerId = Card.activeTimer.id
    const activeTimerIndex = Card.activeTimer.index
    const timer = store.getState().timer.timers[activetTimerId]
    if (!timer) {
        return
    }
    const { mins, secs } = timer
    const seconds = (mins ? mins * 60 : 0) + (secs || 0)
    let countDownTime = seconds
    let remainingTime = seconds

    timersRunning[cardId] = timersRunning[cardId] || {}
    if (timersRunning[cardId].remainingTime) {
        countDownTime = timersRunning[cardId].remainingTime
        remainingTime = timersRunning[cardId].remainingTime
    } else {
        const { mins, secs } = Card.activeTimer
        if (mins || secs) {
            const seconds = (mins ? parseInt(mins) * 60 : 0) + (parseInt(secs) || 0)
            countDownTime = seconds
            remainingTime = seconds
        }
    }
    clearInterval(timersRunning[cardId].handle)

    const reduceRemainingTime =
        () => {
            let delta = Date.now() - startTimer
            remainingTime = countDownTime - (delta / 1000)
            timersRunning[cardId].remainingTime = remainingTime
            console.log(timersRunning[cardId])
            if (remainingTime < 0) {
                playSound(alarmSound, 3)
                store.dispatch(timerFinished({ id: cardId }))
                clearInterval(timerHandle)
                timersRunning[cardId].remainingTime = undefined
                createCountDownTimerWithCardId(cardId, onTick)
            }
            onTick(remainingTime)
        }
    onTick(remainingTime)
    const timerHandle = setInterval(reduceRemainingTime, 1000);

    timersRunning[cardId].handle = timerHandle
    return timersRunning[cardId]
}

function createCountDownTimerWithCardIdWithoutCallBack(cardId, onFinished) {
    const startTimer = new Date()
    const Card = store.getState().timer.timerCards[cardId];
    const activetTimerId = Card.activeTimer.id
    const activeTimerIndex = Card.activeTimer.index
    const timer = store.getState().timer.timers[activetTimerId]
    if (!timer) {
        return
    }
    const { mins, secs } = timer
    const seconds = (mins ? mins * 60 : 0) + (secs || 0)
    let countDownTime = seconds
    let remainingTime = seconds

    timersRunning[cardId] = timersRunning[cardId] || {}
    if (timersRunning[cardId].remainingTime) {
        countDownTime = timersRunning[cardId].remainingTime
        remainingTime = timersRunning[cardId].remainingTime
    } else {
        const { mins, secs } = Card.activeTimer
        if (mins || secs) {
            const seconds = (mins ? mins * 60 : 0) + (secs || 0)
            countDownTime = seconds
            remainingTime = seconds
        }
    }
    clearInterval(timersRunning[cardId].handle)

    const reduceRemainingTime = () => {
        let delta = Date.now() - startTimer
        remainingTime = countDownTime - (delta / 1000)
        timersRunning[cardId].remainingTime = remainingTime
        console.log(timersRunning[cardId])
        if (remainingTime < 0) {
            playSound(alarmSound, 3)
            store.dispatch(timerFinished({ id: cardId }))
            clearInterval(timerHandle)
            timersRunning[cardId].remainingTime = undefined
            createCountDownTimerWithCardIdWithoutCallBack(cardId)
        }
    }
    reduceRemainingTime()
    const timerHandle = setInterval(reduceRemainingTime, 1000);

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


export { createCountDownTimerWithCardId, createCountDownTimerWithCardIdWithoutCallBack, doesCardIdExist }