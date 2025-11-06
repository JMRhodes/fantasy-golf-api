import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { TournamentService } from '#services/tournament_service'

@inject()
export default class TournamentsController {
  constructor(private tournamentService: TournamentService) {}
  /**
   * List all tournaments.
   * @param param0
   * @returns
   */
  async index({}: HttpContext) {
    const tournaments = await this.tournamentService.all()
    return { data: tournaments }
  }

  // async store({ request }: HttpContext) {}

  /**
   * Show a single tournament by id.
   * @param param0
   * @returns
   */
  async show({ params }: HttpContext) {
    const tournament = await this.tournamentService.find(params.id)
    return { data: tournament }
  }

  // async update({ params, request }: HttpContext) {}

  /**
   * Delete a tournament by id.
   * @param param0
   * @returns
   */
  async destroy({ params }: HttpContext) {
    await this.tournamentService.delete(params.id)
    return { message: 'Tournament deleted successfully' }
  }
}
