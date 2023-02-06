import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { avatarCatApi } from '../modules/ActionField/store/avatarCat.api'
import { tasksReducer } from './card.slice'
import { usersReducer } from './users.slice'

const store = configureStore({
	reducer: {
		[avatarCatApi.reducerPath]: avatarCatApi.reducer,
		users: usersReducer,
    tasks: tasksReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(avatarCatApi.middleware),
})

export default store

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>