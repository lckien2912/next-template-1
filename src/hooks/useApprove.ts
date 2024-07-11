import { useEffect } from 'react'
import {
	Config,
	useWriteContract,
	UseWriteContractParameters,
	UseWriteContractReturnType,
} from 'wagmi'

import { handleToast } from '@/utils/toast'

export const useApprove = (
	parameters?: UseWriteContractParameters<Config, unknown>,
): UseWriteContractReturnType<Config, unknown> => {
	const data = useWriteContract(parameters)

	const { status: approveStatus, data: approveData, error: approveError } = data

	useEffect(() => {
		handleToast({
			hash: approveData,
			toastId: 'approve_toast',
			writeStatus: approveStatus,
			writeError: approveError,
			label: `Approve`,
		})
	}, [approveData, approveError, approveStatus])

	return data
}
