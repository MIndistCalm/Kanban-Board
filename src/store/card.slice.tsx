import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../modules/KanbanBoard/utils/models'

const LS_TASKS_KEY = 'ltk'

interface TaskState {
	tasks: Task[]
}

const initialState: TaskState = {
	tasks: JSON.parse(localStorage.getItem(LS_TASKS_KEY) ?? '[]'),
}

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addUser(state, action: PayloadAction<Task>) {
			state.tasks.push(action.payload)
			localStorage.setItem(LS_TASKS_KEY, JSON.stringify(state.tasks))
		},
		removeUser(state, action: PayloadAction<Task>) {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload.id)
			localStorage.setItem(LS_TASKS_KEY , JSON.stringify(state.tasks))
		},
	},
})

export const tasksActions = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
