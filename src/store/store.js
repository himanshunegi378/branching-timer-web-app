import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import timerReducer from '../slices/timerSlice'
import notificationReducer from '../slices/notificationSlice'
import todoReducer from '../slices/todoSlice'
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE, PAUSE, PERSIST,
  PURGE, REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const mainConfig = [
  {
    persistConfig: { key: 'timer', storage: storage },
    reducer: timerReducer,
    rootName: 'timer'
  },
  {
    persistConfig: { key: 'todo', storage: storage },
    reducer: todoReducer,
    rootName: 'todo'
  }
]

function persistStoreCreator (config = mainConfig) {
  const combinedReducer = {}
  config.forEach(element => {
    try {
      const persistConfig = element.persistConfig
      const reducer = element.reducer
      const rootName = element.rootName
      combinedReducer[rootName] = persistReducer(persistConfig, reducer)
    } catch (err) {
      console.log(err)
    }
  })
  const store = configureStore({
    reducer: combinedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  })
  const persistor = persistStore(store)
  return { persistor, store }
}

export { persistStoreCreator }
export default persistStoreCreator
