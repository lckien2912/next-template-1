'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { Address } from 'viem'
import { useAccount, useConnect } from 'wagmi'

import { authServices } from '@/services/auth/auth.services'

import WalletBtnItem from './WalletButtonItem'
import { wagmiConfig } from '@/configs'
import { routers } from '@/constants/routers'
import { useSignIn } from '@/hooks'
import coinbaseIcon from '@/images/Coinbase.png'
import connectWalletIcon from '@/images/walletconnect.png'

const WalletBtnList = () => {
	const router = useRouter()
	const { signMessage } = useSignIn({})
	const { address } = useAccount()

	const handleCheckAddress = async (account: Address | undefined) => {
		if (!account) throw new Error('You must connect to a wallet!')

		const { data } = await authServices.getPublicAddressAvailability({
			publicAddress: account,
		})

		if (!data.exist) return router.push(routers.SIGN_UP)

		const { nonce } = data
		const message = `Sign this message for authenticating with your wallet. Nonce: ${nonce}`

		signMessage({ message })
	}

	const { connect, connectors } = useConnect({
		config: wagmiConfig,
		mutation: {
			async onSuccess({ accounts }) {
				const currentAccount = accounts[0]

				handleCheckAddress(currentAccount)
			},
			onError: async ({ message }) => {
				if (message.includes('Connector already connected.')) {
					handleCheckAddress(address)
				}
				console.log('error', message)
			},
		},
	})

	return (
		<div className="lg: mt-8 flex flex-col-reverse gap-5 lg:mt-[70px]">
			{React.Children.toArray(
				connectors.map((connector) => {
					if (connector.name === 'WalletConnect') {
						return (
							<WalletBtnItem
								item={{ ...connector, icon: connectWalletIcon.src }}
								onConnect={() => connect({ connector })}
							/>
						)
					}

					if (connector.name === 'Coinbase Wallet') {
						return (
							<WalletBtnItem
								item={{ ...connector, icon: coinbaseIcon.src }}
								onConnect={() => connect({ connector })}
							/>
						)
					}

					return (
						<WalletBtnItem
							item={connector}
							onConnect={() => connect({ connector })}
						/>
					)
				}),
			)}
		</div>
	)
}

export default WalletBtnList
