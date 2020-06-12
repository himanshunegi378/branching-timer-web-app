import { configureStore } from '@reduxjs/toolkit';
import timerReducer from '../slices/timerSlice';
import notificationReducer from '../slices/notificationSlice';

export default configureStore({
  reducer: {
    timer: timerReducer,
    notification:notificationReducer
  },
});
