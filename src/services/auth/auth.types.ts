import { Address } from 'viem'
import { SignMessageData } from 'wagmi/query'

export interface ICheckPublicAddressParams {
	publicAddress: Address
}

export interface ISignUpParams {
	publicAddress: Address
	email: string
	telegram: string
	twitter?: string | null
	discord?: string | null
	refCode?: string | null
}

export interface ISignInParams {
	publicAddress: Address
	signature: SignMessageData
	remember: boolean
}
