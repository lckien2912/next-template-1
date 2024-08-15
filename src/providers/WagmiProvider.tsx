'use client'

import { type State, WagmiProvider } from 'wagmi'

import { wagmiConfig } from '@/configs'

type ProviderType = {
	children: React.ReactNode
	initialState?: State
}

const WagmiProviders = ({ children, initialState }: ProviderType) => {
	return (
		<WagmiProvider config={wagmiConfig} initialState={initialState}>
			{children}
		</WagmiProvider>
	)
}

export default WagmiProviders
