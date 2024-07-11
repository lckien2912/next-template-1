/* eslint-disable no-unused-vars */
import { useRouter } from 'next/navigation'
import { useReadLocalStorage } from 'usehooks-ts'
import { useAccount, useDisconnect, useSignMessage } from 'wagmi'

import { authServices } from '@/services/auth/auth.services'
import { SignInParams } from '@/services/auth/auth.types'

import { PREVIOUS_ADDRESS } from '@/constants/variables'
import { useMutation } from '@tanstack/react-query'

export const useSignIn = ({
	successCallback,
	errorCallback,
}: {
	successCallback?: (
		data: boolean,
		variables: SignInParams,
		context: unknown,
	) => unknown
	errorCallback?: (
		error: Error,
		variables: SignInParams,
		context: unknown,
	) => unknown
}) => {
	const router = useRouter()
	const { disconnect } = useDisconnect()
	const { address } = useAccount()
	const previousAddress = useReadLocalStorage<string | null>(PREVIOUS_ADDRESS)

	const { mutate: handleSignIn } = useMutation({
		mutationFn: async (body: SignInParams) =>
			await authServices.postSignIn(body),

		onSuccess(...params) {
			successCallback?.(...params)
			router.replace(previousAddress || '/')
		},

		onError(...params) {
			disconnect()
			errorCallback?.(...params)
		},
	})

	return useSignMessage({
		mutation: {
			onSuccess(data) {
				if (!address) throw new Error('You must connect to a wallet!')

				const signInData: SignInParams = {
					publicAddress: address,
					signature: data,
					remember: false,
				}

				handleSignIn(signInData)
			},

			onError() {
				disconnect()
			},
		},
	})
}
