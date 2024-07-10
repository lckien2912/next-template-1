import React from 'react'
import { ToastContainer } from 'react-toastify'

const Toast = () => {
	return (
		<ToastContainer
			autoClose={60000}
			position="top-right"
			toastStyle={{
				backgroundColor: 'rgba(34, 34, 34, 1)',
				borderRadius: '6px',
				padding: '0px 6px',
			}}
			bodyStyle={{
				color: '#ffffff',
				fontWeight: 600,
				fontSize: '14px',
			}}
		/>
	)
}

export default Toast
