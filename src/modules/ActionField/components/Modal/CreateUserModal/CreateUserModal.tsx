import { useState, useEffect } from 'react'
import { Image, Modal, Button, Spinner } from 'react-bootstrap'
import { AvatarCatResponse, ModalProps } from '../../../utils/models'
import { useGetAvatarCatIdQuery } from '../../../store/avatarCat.api'
import ButtonSelectAvatar from '../../ButtonSelectAvatar'
import InputFields from '../../InputFields/InputFields'

import './styles.scss'

const CreateUserModal = ({ show, onHide }: ModalProps) => {
	const { isLoading, isError, data } = useGetAvatarCatIdQuery('')
	const [selectedAvatar, setSelectedAvatar] = useState('')
	const [isSubmitted, setIsSubmitted] = useState(false)

	useEffect(() => {
		if (data instanceof Array) setSelectedAvatar(`https://cataas.com/cat/${data[0]._id}`)
	}, [data])

	return (
		<Modal
			show={show}
			size='lg'
			onHide={() => {
				onHide()
				setIsSubmitted(false)
			}}
			aria-labelledby='contained-modal-title-vcenter'
			centered
			className='custom-modal'
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Создание пользователя</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{isLoading && <Spinner animation='border' />}

				<section className='custom-modal__body__section'>
					{data?.map((item: AvatarCatResponse) => {
						return (
							<ButtonSelectAvatar
								key={item._id}
								className={selectedAvatar === `https://cataas.com/cat/${item._id}` ? 'selected' : ''}
								handler={() => setSelectedAvatar(`https://cataas.com/cat/${item._id}`)}
							>
								<Image
									src={`https://cataas.com/cat/${item._id}`}
									fluid
									roundedCircle
									className='custom-modal__body__avatar'
								/>
							</ButtonSelectAvatar>
						)
					})}
				</section>
				<InputFields
					avatar={selectedAvatar}
					onHide={onHide}
					setIsSubmitted={setIsSubmitted}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					type='button'
					onClick={() => {
						onHide()
						setIsSubmitted(false)
					}}
					variant='secondary'
				>
					Закрыть
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateUserModal
