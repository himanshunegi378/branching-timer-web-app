const { v1: uuidv1 } = require('uuid')
const Immutable = require('immutable')

const TimerCard = {
  title: '',
  timerList: [],
  loop: false,
  status: 'stopped',
  activeTimer: { id: '', index: -1 }
}

const Timer = {
  id: '',
  title: '',
  mins: 0,
  secs: 0,
  status: ''
}

class Timercard {
  create (store, cardId) {
    try {
      const newTimerCard = new TimerCard()
      newTimerCard.id = uuidv1()
      store.timerCards[cardId] = newTimerCard
    } catch (error) {

    }
  }

  read (params) {

  }

  update (store, cardId, newData) {

  }

  delete (params) {

  }
}

const storeInitialState = { timers: [new Timer()] }

function getTimerCard (store, id) {
  try {
    return store.timerCards[id]
  } catch (error) {
    console.log(error)
  }
}

function getTimer (store, id) {
  try {
    return store.timers[id]
  } catch (error) {
    console.log(error)
  }
}

function createTimerCard () {
  return TimerCard
}

function updateTimerCard (store, cardId, newCardWithChanges) {

}

function changeTimercardStatus (store, cardId, newStatus) {
  try {
    const timerCard = getTimerCard(store, cardId)
    timerCard.status = newStatus
    return updateTimerCard(store, cardId, timerCard)
  } catch (error) {
    console.log(error)
  }
}
