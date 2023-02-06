import { faArrowAltCircleLeft, faArrowAltCircleRight, faSave, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, FloatingLabel, Form, InputGroup, Nav, NavDropdown } from 'react-bootstrap'
import { TaskStatus } from '../../utils/enums'
import { Task } from '../../utils/models'
import ModalTaskPreview from '../Modal/ModalTaskPreview/ModalTaskPreview'

type CardProps = {
	index: number
	task: Task
	onUpdate: (id: Task['id'], updateTask: Task) => void
	onDelete: (id: Task['id']) => void
	onMove: (id: Task['id'], from: TaskStatus) => void
}

const Card = ({ index, task, onUpdate: handleUpdate, onDelete: handleDelete, onMove: handleMoveTask }: CardProps) => {
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [showModal, setShowModal] = useState(false)
	const [dropDown, setDropDown] = useState(false)

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newDecription = e.target.value
		handleUpdate(task.id, { ...task, description: newDecription })
	}

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value
		handleUpdate(task.id, { ...task, title: newTitle })
	}

	const handleMoveLeftTaskChange = () => {
		const newColumn = task.status === TaskStatus.DONE ? TaskStatus.PROGRESS : task.status === TaskStatus.PROGRESS ? TaskStatus.TODO : TaskStatus.TODO
		task.status !== TaskStatus.TODO && handleMoveTask(newColumn, task.id)
	}

	const handleMoveRightTaskChange = () => {
		const newColumn = task.status === TaskStatus.TODO ? TaskStatus.PROGRESS : task.status === TaskStatus.PROGRESS ? TaskStatus.DONE : TaskStatus.DONE
		task.status !== TaskStatus.DONE && handleMoveTask(newColumn, task.id)
	}

	const handleDeleteClick = () => {
		handleDelete(task.id)
	}

	const toggleModalTaskPreview = () => {
		setShowModal((prev) => !prev)
	}

	if (isEdit)
		return (
			<div className='w-100 d-flex flex-column mb-1 border p-1 bg-light'>
				<div className='d-flex justify-content-between align-items-center'>
					{/* <span className='ps-1'>{task.title}</span> */}
					<InputGroup className='mb-3 d-flex flex-row h-100 justify-content-center align-items-center'>
						<Form.Control
							placeholder={task.title}
							aria-label={task.title}
							defaultValue={task.title}
							onChange={handleTitleChange}
						/>
					</InputGroup>
					<div className='d-flex flex-row h-100 justify-content-center align-items-center'>
						<Button
							className='m-1'
							variant='light'
							onClick={() => setIsEdit(false)}
						>
							<FontAwesomeIcon icon={faSave} />
						</Button>
						<Button
							className='m-1'
							variant='light'
							onClick={handleMoveLeftTaskChange}
						>
							<FontAwesomeIcon icon={faArrowAltCircleLeft} />
						</Button>
						<Button
							className='m-1'
							variant='light'
							onClick={handleMoveRightTaskChange}
						>
							<FontAwesomeIcon icon={faArrowAltCircleRight} />
						</Button>
						<Button
							className='m-1'
							variant='light'
							onClick={handleDeleteClick}
						>
							<FontAwesomeIcon icon={faTrashCan} />
						</Button>
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
			</div>
		)
	return (
		<>
			<button
				className='w-100 d-flex flex-column mb-1 border p-1 bg-light'
				onClick={toggleModalTaskPreview}
				onMouseOver={() => setDropDown(true)}
				onMouseOut={() => setDropDown(false)}
			>
				<div className='d-flex w-100 justify-content-between align-items-center'>
					<span className='ps-1'>{task.title}</span>
					<div className={dropDown ? 'd-flex flex-column justify-content-center mt-5 position-absolute' : 'd-none'}>
						<Button
							className='m-1'
							variant='primary'
							onClick={handleMoveLeftTaskChange}
						>
							Переместить назад по прогрессу
						</Button>
						<Button
							className='m-1'
							variant='primary'
							onClick={handleMoveRightTaskChange}
						>
							Переместить вперёд по прогрессу
						</Button>
						<Button
							className='m-1'
							variant='danger'
							onClick={handleDeleteClick}
						>
							Удалить
						</Button>
					</div>
				</div>
				<label className='opacity-50'>Исполнитель:</label>
				{task.users && task.users.map((item) => <div key={item.email}>{item.email}</div>)}
				<label className='opacity-50'>Начало:</label>
				<div>{task.dateFrom ?? '-'}</div>
				<label className='opacity-50'>Конец:</label>
				<div>{task.dateTo ?? '-'}</div>
			</button>
			<ModalTaskPreview
				show={showModal}
				onHide={toggleModalTaskPreview}
				task={task}
				onDelete={handleDelete}
				onUpdate={handleUpdate}
				onMove={handleMoveTask}
			/>
		</>
	)
}

export default Card
