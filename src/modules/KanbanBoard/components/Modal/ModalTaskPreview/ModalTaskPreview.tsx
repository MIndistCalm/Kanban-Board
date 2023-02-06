import { faSave, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPen, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, FloatingLabel, Form, Image, InputGroup, ListGroup, Modal, Row } from 'react-bootstrap'
import { useAppSelector } from '../../../../../hooks/redux'
import { formatDate } from '../../../../ActionField/helpers/date'
import { IUser } from '../../../../ActionField/utils/models'
import { TaskStatus } from '../../../utils/enums'
import { Task } from '../../../utils/models'
import ModalAddUsers from '../ModalAddUsers/ModalAddUsers'

interface ModalTaskPreviwProps {
	show: boolean
	onHide: () => void
	task: Task
	onUpdate: (id: Task['id'], updateTask: Task) => void
	onDelete: (id: Task['id']) => void
	onMove: (id: Task['id'], from: TaskStatus) => void
}

const ModalTaskPreview = ({ show, onHide, task, onUpdate: handleUpdate, onDelete: handleDelete, onMove: handleMoveTask }: ModalTaskPreviwProps) => {
	const { users } = useAppSelector((state) => state.users)
	const [isEdit, setIsEdit] = useState(false)
	const [showModalAddUsers, setShowModalAddUsers] = useState(false)
	const [optionSelected, setSelectedOptions] = useState([])

	console.log(users)

	const toggleModalAddUsers = () => {
		setShowModalAddUsers((prev) => !prev)
	}

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newDecription = e.target.value
		handleUpdate(task.id, { ...task, description: newDecription })
	}

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value
		handleUpdate(task.id, { ...task, title: newTitle })
	}

	const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDateFrom = e.target.value
		handleUpdate(task.id, { ...task, dateFrom: newDateFrom })
	}

	const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDateTo = e.target.value
		handleUpdate(task.id, { ...task, dateTo: newDateTo })
	}
	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStatus = e.target.value
		let status = task.status

		if (newStatus === '0') {
			status = TaskStatus.TODO
		}
		if (newStatus === '1') {
			status = TaskStatus.PROGRESS
		}
		if (newStatus === '2') {
			status = TaskStatus.DONE
		}
		handleMoveTask(status, task.id)
	}
	const handleDeleteClick = () => {
		handleDelete(task.id)
	}

	const choseStatus = (value: TaskStatus) => {
		if (value === 0) {
			return 'TODO'
		}
		if (value === 1) {
			return 'IN PROGRESS'
		}
		if (value === 2) {
			return 'DONE'
		}
	}

	if (isEdit)
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
					<Modal.Title id='contained-modal-title-vcenter'>
						<InputGroup className='d-flex flex-row h-100 justify-content-center align-items-center'>
							<Form.Control
								placeholder={task.title}
								aria-label={task.title}
								defaultValue={task.title}
								onChange={handleTitleChange}
							/>
						</InputGroup>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='d-flex justify-content-between'>
						<div className='d-flex flex-column'>
							<div className='d-flex flex-row mb-2'>
								<label className='me-2'>Дата создания:</label>

								<div>{task.createDate}</div>
							</div>
							<div className='mb-2'>
								<label>Статус</label>
								<Form.Select
									defaultValue={task.status}
									onChange={handleStatusChange}
								>
									<option value={TaskStatus.TODO}>TODO</option>
									<option value={TaskStatus.PROGRESS}>IN PROGRESS</option>
									<option value={TaskStatus.DONE}>DONE</option>
								</Form.Select>
								<label>Сроки:</label>
								<div className='d-flex flex-row align-items-center'>
									<label className='me-2'>Начало:</label>
									<InputGroup className='d-flex flex-row h-100 justify-content-center align-items-center'>
										<Form.Control
											type='date'
											placeholder={task.dateFrom}
											aria-label={task.dateFrom}
											defaultValue={task.dateFrom}
											onChange={handleDateFromChange}
										/>
									</InputGroup>
								</div>
								<div className='d-flex flex-row align-items-center'>
									<label className='me-2'>Конец:</label>
									<InputGroup className='d-flex flex-row h-100 justify-content-center align-items-center'>
										<Form.Control
											type='date'
											placeholder={task.dateTo}
											aria-label={task.dateTo}
											defaultValue={task.dateTo}
											onChange={handleDateToChange}
										/>
									</InputGroup>
								</div>
							</div>
						</div>
						<div>
							<Button
								onClick={() => setIsEdit(false)}
								className='me-3'
							>
								<FontAwesomeIcon icon={faSave} />
							</Button>
							<Button onClick={toggleModalAddUsers}>
								<FontAwesomeIcon icon={faUserGroup} />
							</Button>
							<div>
								<label>Исполнитель:</label>
								{task.users?.map((item) => {
									return (
										<ListGroup.Item key={item.email}>
											<Row className='d-flex justify-content-center align-items-center'>
												<Col>
													<span>{item.email}</span>
												</Col>
											</Row>
										</ListGroup.Item>
									)
								})}
							</div>
						</div>
					</div>
					<FloatingLabel
						controlId='floatingTextarea2'
						label='Описание задачи'
						className='mb-2'
					>
						<Form.Control
							as='textarea'
							onChange={handleDescriptionChange}
							defaultValue={task.description}
							placeholder='Оставьте своё описание...'
							style={{ height: '100px' }}
						/>
					</FloatingLabel>
				</Modal.Body>
				<Modal.Footer>
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
				<ModalAddUsers
					show={showModalAddUsers}
					onHide={toggleModalAddUsers}
					task={task}
					onUpdate={handleUpdate}
					onDelete={handleDelete}
				/>
			</Modal>
		)

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
				<Modal.Title id='contained-modal-title-vcenter'>{task.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='d-flex justify-content-between'>
					<div className='d-flex flex-column'>
						<div className='d-flex flex-row mb-2'>
							<label className='me-2'>Дата создания:</label>
							<div>{task.createDate}</div>
						</div>
						<div className='d-flex flex-row mb-2'>
							<label className='me-2'>Статус:</label>
							<div>{choseStatus(task.status)}</div>
						</div>
						<div className='mb-2'>
							<label>Сроки:</label>
							<div className='d-flex flex-row'>
								<label className='me-2'>Начало:</label>
								<div>{task.dateFrom ?? '-'}</div>
							</div>
							<div className='d-flex flex-row'>
								<label className='me-2'>Конец:</label>
								<div>{task.dateTo ?? '-'}</div>
							</div>
						</div>
					</div>
					<div>
						<Button
							onClick={() => setIsEdit(true)}
							className='me-2'
						>
							<FontAwesomeIcon icon={faPen} />
						</Button>
						<Button
							onClick={toggleModalAddUsers}
							className='me-2'
						>
							<FontAwesomeIcon icon={faUserGroup} />
						</Button>
						<Button
							variant='danger'
							onClick={handleDeleteClick}
						>
							<FontAwesomeIcon icon={faTrashCan} />
						</Button>
						<div className='mt-2'>
							<label>Исполнитель:</label>
							{task.users?.map((item) => {
								return (
									<ListGroup.Item key={item.email}>
										<Row className='d-flex justify-content-center align-items-center'>
											<Col>
												<span>{item.email}</span>
											</Col>
										</Row>
									</ListGroup.Item>
								)
							})}
						</div>
					</div>
				</div>

				<div>
					<label>Описание:</label>
					<div>{task.description}</div>
				</div>
				{/* <FloatingLabel
					controlId='floatingTextarea2'
					label='Описание задачи'
					className='mb-2'
				>
					<Form.Control
						as='textarea'
						onChange={handleDescriptionChange}
						defaultValue={task.description}
						placeholder='Оставьте своё описание...'
						style={{ height: '100px' }}
					/>
				</FloatingLabel> */}
			</Modal.Body>
			<Modal.Footer>
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
			<ModalAddUsers
				show={showModalAddUsers}
				onHide={toggleModalAddUsers}
				task={task}
				onUpdate={handleUpdate}
				onDelete={handleDelete}
			/>
		</Modal>
	)
}

export default ModalTaskPreview
