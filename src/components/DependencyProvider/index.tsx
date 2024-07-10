import React, { createContext, useContext } from 'react'

const DependencyContext = createContext<any>({})

export const useDependency = <T,>() => {
	return useContext<T>(DependencyContext)
}

const DependencyProvider = <T,>({
	children,
	myService,
}: {
	children: React.ReactNode
	myService: T
}) => {
	return (
		<DependencyContext.Provider value={myService}>
			{children}
		</DependencyContext.Provider>
	)
}

export default DependencyProvider
