import { useEffect } from 'react'
import {
	Config,
	useWriteContract,
	UseWriteContractParameters,
	UseWriteContractReturnType,
} from 'wagmi'

import { handleToast } from '@/utils/toast'

export const useInvest = (
	parameters?: UseWriteContractParameters<Config, unknown>,
): UseWriteContractReturnType<Config, unknown> => {
	const data = useWriteContract(parameters)

	const { status: investStatus, data: investData, error: investError } = data

	useEffect(() => {
		handleToast({
			hash: investData,
			toastId: 'invest_toast',
			writeStatus: investStatus,
			writeError: investError,
			label: `Invest`,
		})
	}, [investData, investError, investStatus])

	return data
}
