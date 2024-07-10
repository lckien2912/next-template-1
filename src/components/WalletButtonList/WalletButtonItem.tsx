import Image from 'next/image'
import React from 'react'
import { Connector } from 'wagmi'

import { Button } from '../ui/button'

interface IWalletBtnItemProps {
	item: Connector
	onConnect: () => void
}

const WalletBtnItem: React.FC<IWalletBtnItemProps> = ({ item, onConnect }) => {
	const { name, icon } = item

	return (
		<Button onClick={() => onConnect()} className="flex items-center gap-5">
			<Image
				src={icon as string}
				blurDataURL={icon}
				alt={name}
				width={40}
				height={40}
				className="rounded-full"
			/>
			<p className="">{name}</p>
		</Button>
	)
}

export default WalletBtnItem
