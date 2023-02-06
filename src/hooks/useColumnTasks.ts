import { TaskStatus } from './../modules/KanbanBoard/utils/enums'
import { useTaskCollection } from './useTaskCollection'
import { useCallback } from 'react'
import { Task } from '../modules/KanbanBoard/utils/models'
import { v4 as uuid } from 'uuid'
import { getDate } from '../modules/ActionField/helpers/date'

const MAX_TASK_PER_COLUMN = 100

export function useColumnTasks(column: TaskStatus) {
	const [tasks, setTasks] = useTaskCollection()

	const addEmptyTask = useCallback(() => {
		console.log(`Adding new empty task to ${column} column`)

		setTasks((allTasks) => {
			const columnTasks = allTasks[column]

			if (columnTasks.length > MAX_TASK_PER_COLUMN) {
				console.log('So many tasks!')
				return allTasks
			}

			const newColumnTask: Task = {
				id: Number(uuid().match(/\d+/g)?.join('')),
				createDate: getDate().today.toDateString(),
				status: column,
				// Название задачи
				title: 'Новая задача',
				// Описание задачи
				description: '',

        users: []
			}

			return {
				...allTasks,
				[column]: [newColumnTask, ...columnTasks],
			}
		})
	}, [column, setTasks])

	const updateTask = useCallback(
		(id: Task['id'], updatedTask: Omit<Partial<Task>, 'id'>) => {
			console.log(`Updating task ${id} with ${JSON.stringify(updatedTask)}`)

			setTasks((allTasks) => {
				const columnTasks = allTasks[column]

				return {
					...allTasks,
					[column]: columnTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
				}
			})
		},
		[column, setTasks]
	)

	const moveTask = useCallback(
		(to: TaskStatus, id: Task['id']) => {
			setTasks((allTasks) => {
				const fromColumnTasks = allTasks[column]
				const toColumnTasks = allTasks[to]
				const movingTask = fromColumnTasks.find((task) => task.id === id)

				console.log(`moving task right ${movingTask?.id} from ${column} to ${to} `)

				if (!movingTask) return allTasks

				return {
					...allTasks,
					[column]: fromColumnTasks.filter((task) => task.id !== id),
					[to]: [{ ...movingTask, status: to }, ...toColumnTasks],
				}
			})
		},
		[column, setTasks]
	)

	const deleteTask = useCallback(
		(id: Task['id']) => {
			console.log(`Removing task ${id}`)

			setTasks((allTasks) => {
				const columnTasks = allTasks[column]
				return {
					...allTasks,
					[column]: columnTasks.filter((task) => task.id !== id),
				}
			})
		},
		[column, setTasks]
	)

	return {
		tasks: tasks[column],
		addEmptyTask,
		updateTask,
		deleteTask,
		moveTask,
	}
}
