import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { getDate } from '../../../ActionField/helpers/date'
import { Task } from '../../utils/models'
import { TaskStatus } from '../../utils/enums'
import Card from '../Card'
import { useColumnTasks } from '../../../../hooks/useColumnTasks'
import CardInfo from '../CardInfo'

interface WorkspaceCardProps {
	header: string
	column: TaskStatus
}

// const mockTasks: Task[] = [
// 	{
// 		id: 1,
// 		// Дата создания задачи
// 		createDate: getDate().today.toDateString(),
// 		// Статус задачи
// 		status: TaskStatus.TODO,
// 		// Название задачи
// 		title: 'Задача 1',
// 		// Описание задачи
// 		description: 'Какое-то описание',
// 		// Дата начала задачи
// 		// dateFrom?: string
// 		// // Дата окончания задачи
// 		// dateTo?: string
// 		// // Список пользователей, которые прикреплены к задаче
// 		// users?: IUser[]
// 	},
// 	{
// 		id: 2,
// 		// Дата создания задачи
// 		createDate: getDate().today.toDateString(),
// 		// Статус задачи
// 		status: TaskStatus.PROGRESS,
// 		// Название задачи
// 		title: 'Задача 2',
// 		// Описание задачи
// 		description: 'Какое-то описание 2',
// 		// Дата начала задачи
// 		// dateFrom?: string
// 		// // Дата окончания задачи
// 		// dateTo?: string
// 		// // Список пользователей, которые прикреплены к задаче
// 		// users?: IUser[]
// 	},
// 	{
// 		id: 3,
// 		// Дата создания задачи
// 		createDate: getDate().today.toDateString(),
// 		// Статус задачи
// 		status: TaskStatus.DONE,
// 		// Название задачи
// 		title: 'Задача 3',
// 		// Описание задачи
// 		description: 'Какое-то описание 3',
// 		// Дата начала задачи
// 		// dateFrom?: string
// 		// // Дата окончания задачи
// 		// dateTo?: string
// 		// // Список пользователей, которые прикреплены к задаче
// 		// users?: IUser[]
// 	},
// ]

const WorkspaceCard = ({ header, column }: WorkspaceCardProps) => {
	const { tasks, addEmptyTask, updateTask, deleteTask, moveTask } = useColumnTasks(column)

	const ColumnsTasks = tasks.map((task, index) => {
		if (task.status === column)
			return (
				<Card
					key={task.id}
					task={task}
					index={index}
					onDelete={deleteTask}
					onUpdate={updateTask}
					onMove={moveTask}
				/>
			)
	})

	return (
		<div className='w-100 h-100 d-flex flex-column align-items-center m-2'>
			<span className='w-100 text-center border rounded-top bg-light mb-1'>{header}</span>
			{ColumnsTasks}
			<Button
				className='w-100'
				onClick={() => {
					addEmptyTask()
				}}
			>
				<FontAwesomeIcon icon={faAdd} />
			</Button>
		</div>
	)
}

export default WorkspaceCard
