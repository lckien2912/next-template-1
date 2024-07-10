/* eslint-disable no-unused-vars */
import { ISignUpModel } from '@/services/auth/auth.models'
import { authServices } from '@/services/auth/auth.services'
import { ISignUpParams } from '@/services/auth/auth.types'

import { useSignIn } from './useSignIn'
import { useMutation } from '@tanstack/react-query'

export const useSignUp = ({
	successCallback,
	errorCallback,
}: {
	successCallback?: (
		data: ISignUpModel,
		variables: ISignUpParams,
		context: unknown
	) => unknown
	errorCallback?: (
		error: Error,
		variables: ISignUpParams,
		context: unknown
	) => unknown
}) => {
	const { signMessage } = useSignIn({})

	return useMutation({
		mutationFn: async (body: ISignUpParams) =>
			await authServices.postSignUp(body),

		onSuccess({ data }, variables, context) {
			const { nonce } = data
			const message = `Sign this message for authenticating with your wallet. Nonce: ${nonce}`
			signMessage({ message })
			successCallback?.(data, variables, context)
		},

		onError(...params) {
			errorCallback?.(...params)
		},
	})
}
