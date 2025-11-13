import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const TeamSchema = vine.object({
  name: vine.string().minLength(3).maxLength(100),
})

export type TeamSchemaType = Infer<typeof TeamSchema>
export const createTeamValidator = vine.compile(TeamSchema)
