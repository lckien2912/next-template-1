import { EffectCallback, useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'

export const useAccountChanged = (effect: EffectCallback) => {
	const { connector: activeConnector } = useAccount()
	const { disconnect } = useDisconnect()

	return useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const handleConnectorUpdate = ({ accounts }: any) => {
			if (accounts) {
				effect()
			}
		}

		if (activeConnector) {
			activeConnector?.emitter?.on('change', handleConnectorUpdate)
		}

		return () => activeConnector?.emitter?.off('change', handleConnectorUpdate)
	}, [activeConnector, disconnect, effect])
}
