'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAccountEffect, useDisconnect } from 'wagmi'

import { authServices } from '@/services/auth/auth.services'

import { useAccountChanged } from '@/hooks'

export interface ILoginStateProvider {
	isLogin: boolean
	setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginContext = createContext<ILoginStateProvider>({
	isLogin: false,
	setIsLogin: () => {},
})

export const useLogin = () => useContext(LoginContext)

const LoginStateProvider = ({
	loginState = false,
	children,
}: {
	loginState: boolean
	children: React.ReactNode
}) => {
	const [isLogin, setIsLogin] = useState(loginState)
	const { disconnect } = useDisconnect()

	const handleLogout = () => {
		authServices.postLogout()
		disconnect()
		setIsLogin(false)
	}

	useAccountChanged(handleLogout)

	useAccountEffect({
		onDisconnect() {
			handleLogout()
		},
	})

	useEffect(() => {
		setIsLogin(loginState)
	}, [loginState])

	return (
		<LoginContext.Provider value={{ isLogin, setIsLogin }}>
			{children}
		</LoginContext.Provider>
	)
}

export default LoginStateProvider
