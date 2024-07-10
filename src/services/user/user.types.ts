import { UserModels } from './user.models'

export type EditUserBody = Pick<
	UserModels,
	'email' | 'discord' | 'twitter' | 'telegram'
>
