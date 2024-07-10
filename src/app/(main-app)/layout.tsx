import { cookies } from 'next/headers'
import React, { FC } from 'react'

import { ACCESS_TOKEN } from '@/constants/variables'
import { LoginStateProvider } from '@/providers'

interface MainAppLayoutProps {
	children: React.ReactNode
}

const MainAppLayout: FC<MainAppLayoutProps> = ({ children }) => {
	const isLogin = cookies().get(ACCESS_TOKEN)?.value ? true : false

	return (
		<LoginStateProvider loginState={isLogin}>{children}</LoginStateProvider>
	)
}

export default MainAppLayout
