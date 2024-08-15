import React, { createContext, useContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DependencyContext = createContext<any>({})

export const useDependency = <T,>() => useContext<T>(DependencyContext)

const DependencyProvider = <T,>({
	children,
	myService,
}: {
	children: React.ReactNode
	myService: T
}) => (
	<DependencyContext.Provider value={myService}>
		{children}
	</DependencyContext.Provider>
)

export default DependencyProvider
