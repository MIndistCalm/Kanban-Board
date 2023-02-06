import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../modules/ActionField/utils/models'

const LS_USERS_KEY = 'luk'

interface UsersState {
	users: IUser[]
}

const initialState: UsersState = {
	users: JSON.parse(localStorage.getItem(LS_USERS_KEY) ?? '[]'),
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser(state, action: PayloadAction<IUser>) {
			state.users.push(action.payload)
			localStorage.setItem(LS_USERS_KEY, JSON.stringify(state.users))
		},
		removeUser(state, action: PayloadAction<IUser>) {
			state.users = state.users.filter((user) => user.id !== action.payload.id)
			localStorage.setItem(LS_USERS_KEY , JSON.stringify(state.users))
		},
	},
})

export const usersActions = usersSlice.actions
export const usersReducer = usersSlice.reducer
