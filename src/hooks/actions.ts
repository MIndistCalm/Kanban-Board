import { usersActions } from '../store/users.slice'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { tasksActions } from '../store/card.slice'

const actionsUsers = {
	...usersActions,
}

const actionsTasks = {
	...tasksActions,
}

export const useActionsUsers = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actionsUsers, dispatch)
}

export const useTasksActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actionsTasks, dispatch)
}
