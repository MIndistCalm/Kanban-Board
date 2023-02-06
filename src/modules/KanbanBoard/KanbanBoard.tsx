import React from 'react'
import Board from './components/Board'
import Task from './components/Card'
import WorkspaceCard from './components/WorkspaceCard'
import { TaskStatus } from './utils/enums'

const KanbanBoard = () => {
	return (
		<Board>
			<WorkspaceCard
				header='TODO'
				column={TaskStatus.TODO}
			></WorkspaceCard>
			<WorkspaceCard
				header='IN PROGRESS'
				column={TaskStatus.PROGRESS}
			></WorkspaceCard>
			<WorkspaceCard
				header='DONE'
				column={TaskStatus.DONE}
			></WorkspaceCard>
		</Board>
	)
}

export default KanbanBoard
