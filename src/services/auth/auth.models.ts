/* eslint-disable no-mixed-spaces-and-tabs */
import { Address } from 'viem'

export type CheckPublicAddressModel =
	| {
			exist: false
	  }
	| {
			exist: true
			nonce: string
	  }

export interface SignUpModel {
	nonce: string
	registeredUser: {
		active2fa: boolean
		balance: string
		createdAt: string
		discord: null | string
		email: string
		id: number
		lastLogin: null
		lockedBalance: string
		nonce: string
		publicAddress: Address
		refCode: string
		referralCodeApplied: string | null
		rtHash: null
		telegram: string
		totalCommission: string
		totalInvestment: string
		twitter: null | string
		updatedAt: string
		withdrawAmount: string
	}
}

export interface SignInModel {
	accessToken: string
	refreshToken: string
}
