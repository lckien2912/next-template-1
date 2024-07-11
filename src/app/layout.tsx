import type { Metadata } from 'next'
import { Instrument_Sans } from 'next/font/google'
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'

import Toast from '@/components/Toast'

import './globals.css'
import { wagmiConfig } from '@/configs'
import { QueryProvider, WagmiProvider } from '@/providers'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'App Name',
	description: 'App description.',
}

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const initialState = cookieToInitialState(
		wagmiConfig,
		headers().get('cookie'),
	)

	return (
		<html lang="en">
			<body className={instrumentSans.className}>
				<WagmiProvider initialState={initialState}>
					<QueryProvider>
						<Toast />
						{children}
					</QueryProvider>
				</WagmiProvider>
			</body>
		</html>
	)
}

export default RootLayout
