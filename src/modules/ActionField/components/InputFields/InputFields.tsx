import { Formik, Form, Field } from 'formik'
import { v4 as uuid } from 'uuid'
import { getDate } from '../../helpers/date'
import { validateEmail, validateFullName, validatePatronymic } from './helpers/validate'

import './styles.scss'
import { useAppSelector } from '../../../../hooks/redux'
import { useActionsUsers } from '../../../../hooks/actions'
import { Button } from 'react-bootstrap'

type InputProps = {
	avatar: string
	setIsSubmitted: (isSbmitted: boolean) => void
	onHide: () => void
}

const InputFields = ({ avatar, setIsSubmitted, onHide }: InputProps) => {
	const unique_id = uuid()
	const { users } = useAppSelector((state) => state.users)
	const { addUser } = useActionsUsers()
	return (
		<>
			<Formik
				initialValues={{
					id: Number(unique_id.match(/\d+/g)?.join('')),
					createDate: getDate().today.toDateString(),
					avatar: '',
					firstName: '',
					lastName: '',
					patronymic: '',
					email: '',
				}}
				validateOnBlur
				onSubmit={(values) => {
					values.avatar = avatar
					addUser(values)
					setIsSubmitted(true)
				}}
			>
				{({ values, errors, touched, dirty }) => (
					<Form
						className='create-formik'
						id='create-user'
					>
						<div className='create-formik__container'>
							<label className={errors.firstName && touched.firstName ? 'create-formik__container__label-uncorrect' : 'create-formik__container__label'}>
								Имя
							</label>
							<Field
								name='firstName'
								validate={validateFullName}
								className={errors.firstName && touched.firstName ? 'create-formik__container__field-uncorrect' : 'create-formik__container__field'}
							/>
							{errors.firstName && touched.firstName && (
								<div className={errors.firstName && touched.firstName ? 'create-formik__container__error' : ''}>{errors.firstName}</div>
							)}
						</div>
						<div className='create-formik__container'>
							<label className={errors.lastName && touched.lastName ? 'create-formik__container__label-uncorrect' : 'create-formik__container__label'}>
								Фамилия
							</label>
							<Field
								name='lastName'
								validate={validateFullName}
								className={errors.lastName && touched.lastName ? 'create-formik__container__field-uncorrect' : 'create-formik__container__field'}
							/>
							{errors.lastName && touched.lastName && (
								<div className={errors.lastName && touched.lastName ? 'create-formik__container__error' : ''}>{errors.lastName}</div>
							)}
						</div>
						<div className='create-formik__container'>
							<label className={errors.patronymic && touched.patronymic ? 'create-formik__container__label-uncorrect' : 'create-formik__container__label'}>
								Отчество
							</label>
							<Field
								name='patronymic'
								validate={validatePatronymic}
								className={errors.patronymic && touched.patronymic ? 'create-formik__container__field-uncorrect' : 'create-formik__container__field'}
							/>
							<div className='create-formik__container__optional'>Не обязательное</div>
							{errors.patronymic && touched.patronymic && (
								<div className={errors.patronymic && touched.patronymic ? 'create-formik__container__error' : ''}>{errors.patronymic}</div>
							)}
						</div>
						<div className='create-formik__container'>
							<label className={errors.email && touched.email ? 'create-formik__container__label-uncorrect' : 'create-formik__container__label'}>
								Электронная почта
							</label>
							<Field
								name='email'
								type='email'
								validate={() => validateEmail(values.email, users)}
								className={errors.email && touched.email ? 'create-formik__container__field-uncorrect' : 'create-formik__container__field'}
							/>
							{errors.email && touched.email && <div className={errors.email && touched.email ? 'create-formik__container__error' : ''}>{errors.email}</div>}
						</div>

						<Button
							className='ms-1 mb-2 mt-5'
							form='create-user'
							type='submit'
							disabled={!dirty || !!errors.email || !!errors.firstName || !!errors.lastName || !!errors.patronymic}
							onClick={() => {
								setIsSubmitted(true)
								onHide()
							}}
						>
							Создать пользователя
						</Button>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default InputFields
