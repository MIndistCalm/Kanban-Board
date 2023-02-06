import React, { useState } from 'react'
import { Button, Col, Image, InputGroup, ListGroup, Modal, Row } from 'react-bootstrap'
import { useActionsUsers } from '../../../../../hooks/actions'
import { useAppSelector } from '../../../../../hooks/redux'
import { IUser, ModalProps } from '../../../../ActionField/utils/models'
import { TaskStatus } from '../../../utils/enums'
import { Task } from '../../../utils/models'

interface ModalTaskPreviwProps {
	show: boolean
	onHide: () => void
	task: Task
	onUpdate: (id: Task['id'], updateTask: Task) => void
	onDelete: (id: Task['id']) => void
}

const ModalAddUsers = ({ show, onHide, task, onUpdate: handleUpdate, onDelete: handleDelete }: ModalTaskPreviwProps) => {
	const { users } = useAppSelector((state) => state.users)
	console.log(users)

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
				<Modal.Title id='contained-modal-title-vcenter'>Добавить пользователей к задаче</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ListGroup className='m-1'>
					<ListGroup.Item>
						<Row className='d-flex justify-content-center align-items-center'>
							<Col>Аватар</Col>
							<Col>Фамилия</Col>
							<Col>Имя</Col>
							<Col>Почта</Col>
							<Col></Col>
						</Row>
					</ListGroup.Item>
					{users &&
						users.map((item) => {
							task.users && console.log('users', users, task.users)
							if (task.users === undefined || !!!task.users.find((arrItem) => arrItem.id === item.id))
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
												<span>{item.email}</span>
											</Col>
											<Col>
												<InputGroup className='mb-3'>
													<InputGroup.Checkbox
														aria-label='Checkbox for following text input'
														defaultChecked={task.users && !!task.users.find((itemTask) => itemTask.id === item.id)}
														onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
															task.users && console.log(task.users.indexOf(item))
															// task.users !== undefined && handleUpdate(task.id, { ...task, users: [...task.users, arr.find(item=> item.id === )] })
															e.target.checked && task.users !== undefined && handleUpdate(task.id, { ...task, users: [...task.users, item] })
														}}
													/>
												</InputGroup>
											</Col>
										</Row>
									</ListGroup.Item>
								)
							return null
						})}
				</ListGroup>
			</Modal.Body>
			<Modal.Footer>
				{/* <Button
					type='button'
					onClick={handleUsersAdd}
					variant='primary'
				>
					Добавить
				</Button> */}
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

export default ModalAddUsers
