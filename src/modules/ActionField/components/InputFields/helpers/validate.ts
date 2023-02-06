import { IUser } from '../../../utils/models'

export const validateFullName = (value: string) => {
	if (!value) {
		return 'Необходимо заполнить'
	} else if (!/^[a-zA-Zа-яА-ЯЁё]+$/.test(value)) return 'Поле должно содержать только буквы'
}

export const validatePatronymic = (value: string) => {
	if (value) {
		if (!/^[a-zA-Zа-яА-ЯЁё]+$/.test(value)) return 'Поле должно содержать только буквы'
	}
}

export const validateEmail = (value: string, users: IUser[]) => {
	if (!value) {
		return 'Необходимо заполнить'
	}

	if (
		!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			value
		)
	)
		return 'Некорректная электронная почта'

	if (!!users.find((item) => item.email === value)) {
		console.log(value, users)
		return 'Данная почта уже существует'
	}
}
