// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
import { actionLog } from './middleware/actionLog'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import themeReducer from './theme/themeReducer'
import { userSlice } from './user/slice'

/** 减少模板代码方案
 * 1.Flux,多数据仓库，多store
 * 2.Redux配合Rxjs
 * 3.mobx替换redux
 * 4.redux-toolkit **
 */

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user'] // 白名单，不设置默认使用所有reducer
}

const rootReducer = combineReducers({
	theme: themeReducer,
	user: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
	devTools: true
})

const persistor = persistStore(store)

// 类型注入，ReturnType泛型中获取
export type RootState = ReturnType<typeof store.getState>

export default { store, persistor }
