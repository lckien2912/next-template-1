import { http } from 'viem'
import { bsc, bscTestnet } from 'viem/chains'
import { cookieStorage, createConfig, createStorage } from 'wagmi'

import { walletConnect } from '@wagmi/connectors'

const network = bscTestnet

const projectId = process.env.NEXT_PUBLIC_API_CONNECT_WALLET_ID || ''

export const wagmiConfig = createConfig({
	chains: [network],
	connectors: [
		walletConnect({
			projectId,
			qrModalOptions: {
				themeMode: 'dark',
			},
		}),
	],
	ssr: true,
	storage: createStorage({
		storage: cookieStorage,
	}),
	transports: {
		[bsc.id]: http(),
		[bscTestnet.id]: http(),
	},
})
