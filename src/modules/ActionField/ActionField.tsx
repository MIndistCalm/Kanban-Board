import React, { useState } from 'react'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import CreateUserModal from './components/Modal/CreateUserModal'
import DeleteUserModal from './components/Modal/DeleteUserModal/DeleteUserModal'

const ActionField = () => {
	const [showCreateUserModal, setShowCreateUserModal] = useState(false)
	const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)

	const toggleCreateModal = () => {
		setShowCreateUserModal((prev) => !prev)
	}

	const toggleDeleteModal = () => {
		setShowDeleteUserModal((prev) => !prev)
	}

	return (
		<div className='p-3 d-flex flex-row justify-content-end vw-100'>
			<Button
				variant='outline-primary'
				className='me-3'
				onClick={toggleCreateModal}
			>
				<FontAwesomeIcon icon={faAdd} />
				<span className='ps-2'>Создать пользователя</span>
			</Button>
			<Button
				variant='outline-danger'
				onClick={toggleDeleteModal}
			>
				<FontAwesomeIcon icon={faTrashCan} />
				<span className='ps-2'>Удалить пользователя</span>
			</Button>

			<CreateUserModal
				show={showCreateUserModal}
				onHide={toggleCreateModal}
			/>
			<DeleteUserModal
				show={showDeleteUserModal}
				onHide={toggleDeleteModal}
			/>
		</div>
	)
}

export default ActionField
