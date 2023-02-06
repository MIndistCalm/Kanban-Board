import React from 'react'

interface BoardProps {
	children?: React.ReactNode
}

const Board = ({ children }: BoardProps) => {
	return <div className='p-3 h-100 border border-1 m-5 d-flex justify-content-around'>{children}</div>
}

export default Board
