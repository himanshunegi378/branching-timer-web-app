import { createSlice } from '@reduxjs/toolkit';
import { remove,removeIn } from "immutable";
const { v1: uuidv1 } = require('uuid');


export const TimerCard = {
    title: '',
    timerList: [],
    loop: false,
    status: 'stopped',
    activeTimer: { id: '', index: -1 }
}

export const Timer = {
    id: '',
    title: '',
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
        timerState: 'paused',//'playing','paused','stopped'
        playSound: false,
        notification: { title: '' }
    },
    reducers: {
        createTimerCard: (state, action) => {
            const newCardId = uuidv1()
            let newCard = { ...TimerCard }
            newCard.title = 'no title'
            state.timerCards[newCardId] = newCard
            state.timerCardsSequence.push(newCardId)
        },
        editCardTitle: (state, action) => {
            const { cardId, newTitle } = action.payload
            state.timerCards[cardId].title = newTitle || 'No title'
        },
        deleteCard: (state, action) => {
            const cardId = action.payload.id
            const { timerList } = state.timerCards[cardId]
            let newState = Object.keys(state.timers).reduce((r, e) => {
                if (timerList.indexOf(e) === -1) r[e] = state.timers[e];
                return r
            }, {})
            state.timerCards[cardId].activeTimer = { id: '', index: -1 }
            state.timerCards[cardId].timerList = []
            state.timers = newState


            let newTimerCard = remove(state.timerCards, cardId)
            state.timerCards = newTimerCard
            state.timerCardsSequence = state.timerCardsSequence.filter(id => id !== cardId)
        },
        createTimer: (state, action) => {
            const timerCardId = action.payload.id
            const newTimerId = uuidv1()

            state.timers[newTimerId] = { id: newTimerId, title: 'no title', mins: 5, secs: 0, status: 'inactive' }
            state.timerCards[timerCardId].timerList.push(newTimerId)
        },
        deleteTimer: (state, action) => {
            const { cardId, timerId } = action.payload
            const indexOfTimer = state.timerCards[cardId].timerList.indexOf(timerId)
            const indexOfCurrentTimer = state.timerCards[cardId].activeTimer.index
            state.timerCards[cardId].timerList = remove(state.timerCards[cardId].timerList, indexOfTimer)
            console.log(indexOfTimer, indexOfCurrentTimer)

            state.timers = remove(state.timers, timerId)
            console.log(cardId, timerId)

            if (indexOfTimer <= indexOfCurrentTimer) {
                if (indexOfTimer === indexOfCurrentTimer) {
                    state.timerCards[cardId].activeTimer = { id: '', index: -1 }
                    state.timerCards[cardId].status = 'stopped'
                } else {
                    state.timerCards[cardId].activeTimer = { id: state.timerCards[cardId].activeTimer.id, index: indexOfCurrentTimer - 1 }
                }
            }
        },
        editTimerTitle:(state,action) => {
          const {timerId,newTitle} = action.payload
          state.timers[timerId].title = newTitle || 'No Title'
        },
        updateTimer: (state, action) => {
            let { id, mins, secs, title, status } = action.payload
            Object.assign(state.timers[id], action.payload)
            state.timers[id] = { id, title, mins, secs, status: status || state.timers[id].status }
        },

        toggleCardLoop: (state, action) => {
            let cardId = action.payload.id
            let TimerCard = state.timerCards[cardId]
            TimerCard.loop = !TimerCard.loop
        },
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
                if (state.activeTimerCard.id === cardId) {
                    console.log('pasuing')
                    state.timerState = 'paused'
                }
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
            const cardId = action.payload.id
            const activeTimer = state.timerCards[cardId].activeTimer
            const lengthOfTimerList = state.timerCards[cardId].timerList.length

            if (activeTimer.index + 1 < lengthOfTimerList) {
                const nextTimerIndex = state.timerCards[cardId].timerList[activeTimer.index + 1]
                state.timerCards[cardId].activeTimer = { id: nextTimerIndex, index: activeTimer.index + 1 }
            } else {
                if (state.timerCards[cardId].loop) {
                    console.log('looping')

                    state.timerCards[cardId].activeTimer = { id: state.timerCards[cardId].timerList[0], index: 0 }
                } else {
                    state.timerCards[cardId].activeTimer = { id: '', index: -1 }
                    state.timerCards[cardId].status = 'paused'

                }

            }
        },
        stopTimer: (state, action) => {
            const activeTimerCardId = action.payload.cardId
            const timerCard = state.timerCards[activeTimerCardId]
            // state.timerCards[activeTimerCardId] = Object.assign({}, timerCard, { activeTimer: { id: '', index: -1 },status:'stopped' })
            state.timerCards[activeTimerCardId].activeTimer = { id: '', index: -1 }
            state.timerCards[activeTimerCardId].status = 'stopped'
        },
        stopSound: (state, action) => {
            state.playSound = false
        },
        //should have card id as payload that needs to be play paused
        togglePlayPause: (state, action) => {
            let { cardId } = action.payload
            const timerCard = state.timerCards[cardId]
            let status = timerCard.status
            if (status === 'playing') {
                state.timerCards[cardId].status = 'paused'
            }
            else {
                if (timerCard.activeTimer.index === -1) {
                    state.timerCards[cardId] = Object.assign({}, timerCard, { activeTimer: { id: timerCard.timerList[0], index: 0 } })
                }
                state.timerCards[cardId].status = 'playing'
            }

        }



    }
})
export const selectTimerCards = state => state.timerCards;

export const { updateTimer, createNextTimer, createChildTimer, createTimer, createTimerCard, toggleCardLoop, updateTimer: saveTimer, playTimer, timerFinished, playCard, stopTimer, stopSound, togglePlayPause, deleteCard, deleteTimer,editCardTitle,editTimerTitle } = timerslice.actions;
export default timerslice.reducer;
