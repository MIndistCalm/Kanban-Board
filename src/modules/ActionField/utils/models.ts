export interface AvatarDogResponse {
	fileSizeBytes: number
	url: string
}

export interface AvatarCatResponse {
	_id: string
	tags: string[]
	owner: string
	createdAt: string
	updatedAt: string
}

export interface ModalProps {
	show: boolean
	onHide: () => void
}

export interface IButtonProps {
	className?: string
	handler: () => void
	children?: React.ReactNode
}

export interface IUser {
	id: number
	// Дата создания пользователя
	createDate: string
	// Ссылка на аватар
	avatar?: string
	// Фамилия
	firstName: string
	// Имя
	lastName: string
	// Отчество
	patronymic?: string
	// Почта
	email: string
}
