import { Address } from 'viem'
import { SignMessageData } from 'wagmi/query'

export interface CheckPublicAddressParams {
	publicAddress: Address
}

export interface SignUpParams {
	publicAddress: Address
	email: string
	telegram: string
	twitter: string | null
	discord: string | null
	refCode: string | null
}

export interface SignInParams {
	publicAddress: Address
	signature: SignMessageData
	remember: boolean
}
