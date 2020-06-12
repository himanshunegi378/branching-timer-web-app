import { createSlice } from '@reduxjs/toolkit';
import countdownTimer from "../core/dataStructure/new_timerTree";

const TimerCard = {
    message: '',
    timerList: [],
    loop: false
}

const Timer = {
    id: '',
    message: '',
    mins: 0,
    secs: 0,
    status: '',
}



export const timerslice = createSlice({
    name: 'timer',
    initialState: {
        timers: {},//contains timer deatail of all the timer in every timercard
        timerCards: {},//contains timercard with array of timers in it
        timerCardsSequence: [],//array of ids of timer card to maintain order in which ther are added
        activeTimerCard: { id: '', currentTimerIndex: '' },//id fo the card in which the current timer is running and the index of the timer in the card
        activeTimer: { id: '' },// id of the timer which is currently running
        countDownTimerActive: false, //to check if any timer is running
        timerType: 'current', //'current' means only active timer will be palyer. 'all' means all timer card will be player serially until last
        loopCard: false,
        timerState: 'playing',//'playing','paused','stopped'
        playSound: false,
        notification: {title:''}
    },
    reducers: {
        updateTimer: (state, action) => {
            let updatedTimer = countdownTimer.updateTimer(action.payload.id, action.payload.opts)
            state.timers[updatedTimer.id] = updatedTimer
        },
        createNextTimer: (state, action) => {
            let newTimer = countdownTimer.insertTimerToRight(action.payload.id, action.payload.opts)
            let { id, message } = newTimer
            state.timers[newTimer.id] = { id, message }
        },
        createChildTimer: (state, action) => {
            let newTimer = countdownTimer.insertTimerBelow(action.payload.id, action.payload.opts)
            let { id, message } = newTimer
            state.timers[newTimer.id] = { id, message, mins: 5, secs: 0 }
        },
        createTimer: (state, action) => {
            let timercollectionId = action.payload.id
            let findTimer = countdownTimer.findTimer(timercollectionId)
            let childTimer = findTimer
            while (childTimer.child) {
                childTimer = childTimer.child
            }
            let newChildTimer = countdownTimer.insertTimerBelow(childTimer.id)
            let { id, message } = newChildTimer
            state.timers[id] = { id, message, mins: 5, secs: 0, status: 'inactive' }
            state.timerCards[timercollectionId].timerList.push(id)

        },
        saveTimer: (state, action) => {
            let { id, mins, secs, message, status } = action.payload
            Object.assign(state.timers[id], action.payload)
            state.timers[id] = { id, message, mins, secs, status: status || state.timers[id].status }
        },
        createTimerCard: (state, action) => {
            let nexTimer = countdownTimer.insertTimerToRight(action.payload.id)
            let { id, message } = nexTimer
            let newCard = { ...TimerCard }
            newCard.message = message
            state.timerCards[id] = newCard
            state.timerCardsSequence.push(id)

        },
        toggleCardLoop: (state, action) => {
            let cardId = action.payload.id
            let TimerCard = state.timerCards[cardId]
            TimerCard.loop = !TimerCard.loop
        }
        ,
        //plays the next timer in the active card
        playTimer: (state, action) => {
            try {
                if (state.activeTimerCard.id) {
                }
                else {
                    let timerCardToUseId = state.timerCardsSequence[0]
                    let timerCard = state.timerCards[timerCardToUseId]
                    let timerToPlay = timerCard.timerList[0]
                    state.activeTimer = { id: timerToPlay }
                    state.timers[timerToPlay].status = 'active'
                    state.activeTimerCard = { id: timerCardToUseId, currentTimerIndex: 0 }
                }
            } catch (error) {
                console.log(error)
            }

        },
        playCard: (state, action) => {
            let { cardId, loop } = action.payload
            if (state.activeTimer.id) {
                console.log('A timer is already running')
            } else {
                let timerToPlayId = state.timerCards[cardId].timerList[0]
                state.activeTimerCard = { id: cardId, currentTimerIndex: 0 }
                state.loopCard = loop
                state.timers[timerToPlayId].status = 'active'
                state.activeTimer = { id: timerToPlayId }
                state.timerState = 'playing'
            }
        },
        timerFinished: (state, action) => {
            let activeTimerCardId = state.activeTimerCard.id
            let currentTimerIndex = state.activeTimerCard.currentTimerIndex
            let activeTimerId = state.activeTimer.id
            let activeTimerCard = state.timerCards[activeTimerCardId]
            let timersInCard = activeTimerCard.timerList
            let lengthOfTimersInCard = timersInCard.length

            if (activeTimerId !== action.payload.id) return
            //all timers in card has not been palyed
            state.playSound = true
            state.notification = {title: activeTimerId}
            if (currentTimerIndex < lengthOfTimersInCard - 1) {
                let newtimerToPlayIndex = currentTimerIndex + 1
                let newTimerToPlayId = timersInCard[newtimerToPlayIndex]
                state.activeTimerCard.currentTimerIndex = newtimerToPlayIndex
                state.timers[activeTimerId].status = 'inactive'
                state.timers[newTimerToPlayId].status = 'active'
                state.activeTimer.id = newTimerToPlayId
            } else {
                if (activeTimerCard.loop) {
                    let newtimerToPlayIndex = 0
                    let newTimerToPlayId = timersInCard[newtimerToPlayIndex]
                    state.activeTimerCard.currentTimerIndex = newtimerToPlayIndex
                    state.timers[activeTimerId].status = 'inactive'
                    state.timers[newTimerToPlayId].status = 'active'
                    state.activeTimer.id = newTimerToPlayId
                } else {
                    state.timers[activeTimerId].status = 'inactive'
                    state.activeTimer = ''
                    console.log('All timers in this card has been played')
                }
            }
        },
        stopTimer: (state, action) => {
            let activeTimerCardId = state.activeTimerCard.id
            state.activeTimerCard.currentTimerIndex = 0
            let activeTimerId = state.activeTimer.id
            state.activeTimer.id = ''
            state.timers[activeTimerId].status = 'inactive'

            state.timerState = 'stopped'
        },
        stopSound: (state, action) => {
            state.playSound = false
        }



    }
})
export const selectTimerCards = state => state.timerCards;

export const { updateTimer, createNextTimer, createChildTimer, createTimer, createTimerCard, toggleCardLoop, saveTimer, playTimer, timerFinished, playCard, stopTimer,stopSound } = timerslice.actions;
export default timerslice.reducer;
