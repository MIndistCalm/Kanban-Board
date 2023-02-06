import { Task } from './../modules/KanbanBoard/utils/models'
import { TaskStatus } from '../modules/KanbanBoard/utils/enums'
import { v4 as uuid } from 'uuid'
import { getDate } from '../modules/ActionField/helpers/date'
import { useLocalStorage } from 'usehooks-ts'

export const useTaskCollection = () => {
	return useLocalStorage<{ [key in TaskStatus]: Task[] }>('tasks', {
		0: [
			{
				id: Number(uuid().match(/\d+/g)?.join('')),
				createDate: getDate().today.toLocaleDateString(),
				status: TaskStatus.TODO,
				// Название задачи
				title: 'Задача 1',
				// Описание задачи
				description: 'Какое-то описание 1',
				dateFrom: getDate().today.toLocaleDateString(),
				// Дата окончания задачи
				dateTo: getDate().today.toLocaleDateString(),
				users: [
					{
						id: Number(uuid().match(/\d+/g)?.join('')),
						// Дата создания пользователя,
						createDate: getDate().today.toLocaleDateString(),
						// Ссылка на аватар
						avatar: 'https://cataas.com/cat/2bPYDRuvU70sbgja',
						// Фамилия
						firstName: 'Вячеслав',
						// Имя
						lastName: 'Сухинин',
						// Отчество
						patronymic: 'Викторович',
						// Почта
						email: 'test@mail.ru',
					},
				],
			},
		],
		1: [
			{
				id: Number(uuid().match(/\d+/g)?.join('')),
				createDate: getDate().today.toLocaleDateString(),
				status: TaskStatus.PROGRESS,
				// Название задачи
				title: 'Задача 2',
				// Описание задачи
				description: 'Какое-то описание 2',
				users: [],
			},
		],
		2: [
			{
				id: Number(uuid().match(/\d+/g)?.join('')),
				createDate: getDate().today.toLocaleDateString(),
				status: TaskStatus.DONE,
				// Название задачи
				title: 'Задача 3',
				// Описание задачи
				description: 'Какое-то описание 3',
				users: [],
			},
		],
	})
}
