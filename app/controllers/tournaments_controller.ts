import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TournamentService } from '#services/tournament_service'
import { createTournamentValidator } from '#validators/tournament'

@inject()
export default class TournamentsController {
  constructor(private tournamentService: TournamentService) {}

  async index({}: HttpContext) {
    const tournaments = await this.tournamentService.all()
    return { data: tournaments }
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createTournamentValidator)
    const tournament = await this.tournamentService.create(payload)

    return { data: tournament }
  }

  async show({ response, params }: HttpContext) {
    const tournament = await this.tournamentService.find(params.id)

    if (!tournament) {
      return response.status(404).json({ message: 'Tournament not found' })
    }

    return { data: tournament }
  }

  // async update({ params, request }: HttpContext) {}

  async destroy({ params }: HttpContext) {
    await this.tournamentService.delete(params.id)
    return { message: 'Tournament deleted successfully' }
  }
}
