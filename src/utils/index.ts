import { type ClassValue, clsx } from 'clsx'
import { KeyboardEvent } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const blockInvalidChar = (e: KeyboardEvent<HTMLInputElement>) =>
	['e', 'E', '+', '-', '[', ']', '{', '}', ','].includes(e.key) &&
	e.preventDefault()

export const truncateString = (text: string): string =>
	`${text.slice(0, 6)}..${text.slice(text.length - 4)}`

export const formatCurrency = (currency: number | string) =>
	new Intl.NumberFormat().format(Number(currency))
