import React from 'react'
import { IButtonProps } from '../../utils/models'

import './styles.scss'

const ButtonSelectAvatar = ({ handler, children, className }: IButtonProps) => {
	return (
		<button
			className={`select-button ${className}`}
			onClick={handler}
		>
			{children}
		</button>
	)
}

export default ButtonSelectAvatar
