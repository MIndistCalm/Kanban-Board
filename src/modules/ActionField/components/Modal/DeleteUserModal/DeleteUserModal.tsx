import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Form, Image, InputGroup, ListGroup, Modal, Row } from 'react-bootstrap'
import { useActionsUsers } from '../../../../../hooks/actions'
import { useAppSelector } from '../../../../../hooks/redux'
import { formatDate } from '../../../helpers/date'
import { IUser, ModalProps } from '../../../utils/models'

const DeleteUserModal = ({ show, onHide }: ModalProps) => {
	const { users } = useAppSelector((state) => state.users)
	const [arr, setValue] = useState<IUser[]>([])
	const { removeUser } = useActionsUsers()

	const handleDelete = () => {
		arr.forEach((item) => removeUser(item))
	}

	return (
		<Modal
			show={show}
			size='lg'
			onHide={() => {
				onHide()
			}}
			aria-labelledby='contained-modal-title-vcenter'
			centered
			className='custom-modal'
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Удаление пользователей</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ListGroup className='m-1'>
					<ListGroup.Item>
						<Row className='d-flex justify-content-center align-items-center'>
							<Col>Аватар</Col>
							<Col>Фамилия</Col>
							<Col>Имя</Col>
							<Col>Отчество</Col>
							<Col>Почта</Col>
							<Col></Col>
						</Row>
					</ListGroup.Item>
					{users &&
						users?.map((item) => {
							return (
								<ListGroup.Item key={item.email}>
									<Row className='d-flex justify-content-center align-items-center'>
										<Col>
											<Image
												src={item.avatar}
												fluid
												roundedCircle
												className='custom-modal__body__avatar'
											/>
										</Col>
										<Col>
											<span>{item.lastName}</span>
										</Col>
										<Col>
											<span>{item.firstName}</span>
										</Col>
										<Col>
											<span>{item?.patronymic}</span>
										</Col>
										<Col>
											<span>{item.email}</span>
										</Col>
										<Col>
											<InputGroup className='mb-3'>
												<InputGroup.Checkbox
													aria-label='Checkbox for following text input'
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														let index = users.indexOf(item)
														e.target.checked ? setValue([...arr, item]) : setValue([...arr.slice(0, index), ...arr.slice(index + 1)])
													}}
												/>
											</InputGroup>
										</Col>
									</Row>
								</ListGroup.Item>
							)
						})}
				</ListGroup>
			</Modal.Body>
			<Modal.Footer>
				<Button
					type='button'
					onClick={handleDelete}
					variant='primary'
				>
					удалить
				</Button>
				<Button
					type='button'
					onClick={() => {
						onHide()
					}}
					variant='secondary'
				>
					Закрыть
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeleteUserModal
