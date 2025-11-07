import vine from '@vinejs/vine'

enum TournamentStatus {
  UPCOMING = 'upcoming',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export const TournamentSchema = vine.object({
  name: vine.string().minLength(3).maxLength(100),
  description: vine.string().minLength(10).maxLength(500),
  status: vine.enum(TournamentStatus),
  startDate: vine.date(),
  endDate: vine.date(),
})

export const createTournamentValidator = vine.compile(TournamentSchema)
