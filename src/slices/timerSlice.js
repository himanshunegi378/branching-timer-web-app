import { createSlice } from '@reduxjs/toolkit'
import { remove, removeIn } from 'immutable'
import { timer } from 'rxjs'
const { v1: uuidv1 } = require('uuid')

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
  status: ''
}

export const timerslice = createSlice({
  name: 'timer',
  initialState: {
    timers: {}, // contains timer deatail of all the timer in every timercard
    timerCards: {}, // contains timercard with array of timers in it
    timerCardsSequence: [], // array of ids of timer card to maintain order in which ther are added
  },
  reducers: {
    createTimerCard: (state, action) => {
      const newCardId = uuidv1()
      const newCard = { ...TimerCard }
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
      const newState = Object.keys(state.timers).reduce((r, e) => {
        if (timerList.indexOf(e) === -1) r[e] = state.timers[e]
        return r
      }, {})
      state.timerCards[cardId].activeTimer = { id: '', index: -1 }
      state.timerCards[cardId].timerList = []
      state.timers = newState

      const newTimerCard = remove(state.timerCards, cardId)
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
    editTimerTitle: (state, action) => {
      const { timerId, newTitle } = action.payload
      state.timers[timerId].title = newTitle || 'No Title'
    },
    updateTimer: (state, action) => {
      const { id, mins, secs, title, status } = action.payload
      Object.assign(state.timers[id], action.payload)
      state.timers[id] = { id, title, mins, secs, status: status || state.timers[id].status }
    },
    pauseCard: (state, action) => {
      const { cardId } = action.payload
      if (cardId) {
        state.timerCards[cardId].status = 'paused'
      }
    },
    playCard: (state, action) => {
      const { cardId } = action.payload
      const timerCard = state.timerCards[cardId]
      if (cardId) {
        if (timerCard.activeTimer.index === -1) {
          state.timerCards[cardId] = Object.assign({}, timerCard, { activeTimer: { id: timerCard.timerList[0], index: 0 } })
        }
        state.timerCards[cardId].status = 'playing'
      }
    },
    toggleCardLoop: (state, action) => {
      const cardId = action.payload.id
      const TimerCard = state.timerCards[cardId]
      TimerCard.loop = !TimerCard.loop
    },
    // plays the next timer in the active card
    playTimer: (state, action) => {
      try {
        if (state.activeTimerCard.id) {
        } else {
          const timerCardToUseId = state.timerCardsSequence[0]
          const timerCard = state.timerCards[timerCardToUseId]
          const timerToPlay = timerCard.timerList[0]
          state.activeTimer = { id: timerToPlay }
          state.timers[timerToPlay].status = 'active'
          state.activeTimerCard = { id: timerCardToUseId, currentTimerIndex: 0 }
        }
      } catch (error) {
        console.log(error)
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
    // should have card id as payload that needs to be play paused
    togglePlayPause: (state, action) => {
      const { cardId } = action.payload
      const timerCard = state.timerCards[cardId]
      console.log(action.payload)
      const status = timerCard.status
      if (status === 'playing') {
        state.timerCards[cardId].status = 'paused'
      } else {
        if (timerCard.activeTimer.index === -1) {
          state.timerCards[cardId] = Object.assign({}, timerCard, { activeTimer: { id: timerCard.timerList[0], index: 0 } })
        }
        state.timerCards[cardId].status = 'playing'
      }
    },
    onCardUnmounting: (state, action) => {
      const { cardId, mins, secs } = action.payload
      state.timerCards[cardId].lastPlayed = { time: new Date().getTime(), mins: mins, secs: secs }
    },
    onMounting: (state, action) => {
      const { cardId } = action.payload
      state.timerCards[cardId].lastPlayed = undefined
    }

  }
})
export const selectTimerCards = state => state.timerCards

export const { updateTimer, createNextTimer, createChildTimer, createTimer, createTimerCard, toggleCardLoop, updateTimer: saveTimer, playTimer, timerFinished, playCard, stopTimer, stopSound, togglePlayPause, deleteCard, deleteTimer, editCardTitle, editTimerTitle, onCardUnmounting, onMounting, pauseCard } = timerslice.actions
export default timerslice.reducer
