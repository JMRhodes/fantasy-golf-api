import vine from '@vinejs/vine'

export const createResultValidator = vine.compile(
  vine.object({
    playerId: vine.number(),
    tournamentId: vine.number(),
    score: vine.number(),
  })
)
