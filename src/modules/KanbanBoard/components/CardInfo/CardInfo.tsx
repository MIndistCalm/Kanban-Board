import { faArrowAltCircleLeft, faArrowAltCircleRight, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import { TaskStatus } from '../../utils/enums'
import { Task } from '../../utils/models'

type CardProps = {
	index: number
	task: Task
	onUpdate: (id: Task['id'], updateTask: Task) => void
	onDelete: (id: Task['id']) => void
	onMove: (id: Task['id'], from: TaskStatus) => void
}

const CardInfo = ({ index, task, onUpdate: handleUpdate, onDelete: handleDelete, onMove: handleMoveTask }: CardProps) => {
	const [isNew, setIsNew] = useState<boolean>(false)

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

	return (
		<button
			className='w-100 d-flex flex-column mb-1 border p-1 bg-light'
			onClick={() => setIsNew((prev: boolean) => !prev)}
		>
			<div className='d-flex w-100 justify-content-between align-items-center'>
				<span className='ps-1'>{task.title}</span>
				<InputGroup className='mb-3 d-flex flex-row h-100 justify-content-center align-items-center'>
					<Form.Control
						placeholder={task.title}
						aria-label={task.title}
						defaultValue={task.title}
						onChange={handleTitleChange}
					/>
				</InputGroup>
				<div>
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
		</button>
	)
}

export default CardInfo
