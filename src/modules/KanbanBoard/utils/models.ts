import { IUser } from "../../ActionField/utils/models"
import { TaskStatus } from "./enums"

export interface Task {
	id: number
	// Дата создания задачи
	createDate: string
	// Статус задачи
	status: TaskStatus
	// Название задачи
	title: string
	// Описание задачи
	description: string
	// Дата начала задачи
	dateFrom?: string
	// Дата окончания задачи
	dateTo?: string
	// Список пользователей, которые прикреплены к задаче
	users?: IUser[]
}
