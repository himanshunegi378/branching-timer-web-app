import { configureStore } from '@reduxjs/toolkit';
import timerReducer from '../slices/timerSlice';
import notificationReducer from '../slices/notificationSlice';


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedstate = loadState()
if (persistedstate) {
  for (const key in persistedstate.timer.timerCards) {
    if (persistedstate.timer.timerCards.hasOwnProperty(key)) {
      const timerCard = persistedstate.timer.timerCards[key];
      persistedstate.timer.timerCards[key] = { ...timerCard, status: 'stopped', activeTimer: { id: '', index: -1 } }

    }
  }
}

export default configureStore({
  reducer: {
    timer: timerReducer,
    notification: notificationReducer
  },
  preloadedState: persistedstate
});






