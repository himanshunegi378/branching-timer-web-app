import { store } from '../../store/store'
import { timerFinished } from '../../slices/timerSlice';
import alarmSound from './alarm.mp3'
import { SoundPlayer } from "./SoundPlayer";
import { CountDownTimer } from './CountDownTimer';
import { EventEmitter } from "events";
import showNotification from '../../utils/notification';

const timersRunning = {}


function playAlarmSound(alarmSound, seconds = 1) {
    SoundPlayer.play(alarmSound)

    setTimeout(() => {
        SoundPlayer.stop()
    }, (seconds) * 1000)
}

function getActiveTimerFromCard(Card, store) {
    if (Card) {
        const activetTimerId = Card.activeTimer.id
        const timer = store.getState().timer.timers[activetTimerId]
        return timer
    }
    return undefined
}

class BackgroundCountDownManager {
    constructor() {
        this.activeTimers = {}
    }
    playCard(cardId, onTick) {

        if (!this.activeTimers[cardId]) {
            this.activeTimers[cardId] = new TimerCardPlayer(cardId, store)
        }
        const card = this.activeTimers[cardId]
        onTick = onTick ? onTick : (reamaingTimer) => { }
        card.play(onTick)
    }
    pauseCard(cardId) {
        if (this.activeTimers[cardId]) {
            this.activeTimers[cardId].pause()
        }
    }
    stopCard(cardId) {
        if (this.activeTimers[cardId]) {
            this.activeTimers[cardId].stop()
        }
    }


}
const backgroundCountDownManager = new BackgroundCountDownManager()


class TimerCardPlayer {
    constructor(cardId, store) {
        this.cardId = cardId
        this.countDownTimer = new CountDownTimer()
        this.store = store
        this.remainingTime = undefined
        this.event = new EventEmitter()
        this.playing = false
    }

    play(onTick) {
        if (this.countDownTimer.isRunning()) {
            this.countDownTimer.stop()
        }
        this.playing = true
        const Card = store.getState().timer.timerCards[this.cardId];
        const timer = getActiveTimerFromCard(Card, this.store)
        if (!timer) {
            return undefined
        }
        const { mins, secs } = timer
        const seconds = (mins ? mins * 60 : 0) + (secs || 0)
        let countDownTime = seconds

        timersRunning[this.cardId] = timersRunning[this.cardId] || {}
        if (this.remainingTime) {
            countDownTime = this.remainingTime
        } else {
            const { mins, secs } = Card.activeTimer
            if (mins || secs) {
                const seconds = (mins ? parseInt(mins) * 60 : 0) + (parseInt(secs) || 0)
                countDownTime = seconds
            }
        }
        console.log(countDownTime)
        this.countDownTimer.start(countDownTime, (remainingTime) => {
            this.remainingTime = remainingTime
            console.log(this.remainingTime)
            onTick(remainingTime)
        }, () => {
            console.log('timer Finished')
            playAlarmSound(alarmSound,3)
            showNotification(`${timer.title} finished`)
            this.countDownTimer.stop()
            store.dispatch(timerFinished({ id: this.cardId }))
            this.remainingTime = undefined
            this.play(onTick)
        })
    }
    pause() {
        this.countDownTimer.stop()
        this.playing = false
    }
    stop() {
        this.countDownTimer.stop()
        this.playing = false
        this.remainingTime = undefined
    }
    getNextTimer() { }
}

export { backgroundCountDownManager }