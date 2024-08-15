import { toast } from 'react-toastify'
import { createPublicClient, Hash, http } from 'viem'
import { bsc, bscTestnet } from 'viem/chains'

export function myToast(
	toastId: string,
	status: 'error' | 'success' | 'loading' | 'idle' | 'pending',
	label: string,
	errorMsg?: string,
) {
	let message = ''

	if (errorMsg?.includes('User rejected the request.')) {
		message = 'User rejected the request'
	} else if (errorMsg?.includes('reason:' && 'Contract Call:')) {
		message =
			errorMsg?.split('reason:')[1]?.split('Contract Call:')[0] ||
			'Transaction failed'
	} else if (errorMsg?.includes('Version:')) {
		message = errorMsg?.split('Version:')[0] || 'Transaction failed'

		if (message.includes('Address' && 'is invalid')) {
			message = 'The Referral address does not exist'
		}
	} else {
		message = errorMsg || 'Transaction failed'
	}

	switch (status) {
		case 'error':
			toast.update(toastId, {
				render: (
					<span>
						{label}
						:
						<br /> <span className="font-normal">{message}.</span>
					</span>
				),
				type: 'error',
				isLoading: false,
				closeButton: true,
				autoClose: 3000,
			})
			break
		case 'success':
			toast.update(toastId, {
				render: (
					<span>
						{label}
						:
						<br /> <span className="font-normal">Transaction success.</span>
					</span>
				),
				type: 'success',
				isLoading: false,
				closeButton: true,
				autoClose: 3000,
			})
			break
		case 'loading':
			toast.loading(
				<span>
					{label}
					<br />
					<span className="font-normal">Transaction pending...</span>
				</span>,
				{
					toastId,
					autoClose: false,
					closeButton: false,
				},
			)
			break
		case 'pending':
			toast.loading(
				<span>
					{label}
					<br />
					<span className="font-normal">Transaction pending...</span>
				</span>,
				{
					toastId,
					autoClose: false,
					closeButton: false,
				},
			)
			break
		case 'idle':
			toast.dismiss(toastId)
			break
		default:
			break
	}
}

export const handleToast = ({
	hash,
	toastId,
	label,
	writeStatus,
	writeError,
}: {
	hash: `0x${string}` | undefined
	toastId: string
	label: string
	writeStatus: 'success' | 'error' | 'loading' | 'idle' | 'pending'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	writeError: any
}) => {
	if (
		(writeStatus && writeStatus !== 'success') ||
		(writeStatus === 'success' && !hash)
	) {
		myToast(toastId, writeStatus, label, writeError?.message)
	} else if (hash && writeStatus === 'success') {
		let isMounted = true

		waitTransaction({ hash })
			.then((res) => {
				if (isMounted) {
					if (res?.status === 'success') {
						myToast(toastId, 'success', label)
					} else {
						myToast(toastId, 'error', label, 'Transaction failed')
					}
				}

				return () => {
					isMounted = false
				}
			})
			.catch((err) => {
				myToast(toastId, 'error', label, err.message)
			})
	}
}

export const waitTransaction = async ({
	hash,
}: {
	hash: `0x${string}` | undefined
}) => {
	const client =
		process.env.NEXT_PUBLIC_NETWORK === 'testnet'
			? createPublicClient({
					chain: bscTestnet,
					transport: http('https://data-seed-prebsc-1-s1.binance.org:8545/'),
				})
			: createPublicClient({
					chain: bsc,
					transport: http('https://bsc-dataseed1.binance.org/'),
				})

	return client.waitForTransactionReceipt({ hash: hash as Hash })
}
