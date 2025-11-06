import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { PlayerService } from '#services/player_service'

@inject()
export default class PlayersController {
  constructor(private playerService: PlayerService) {}

  /**
   * List all players.
   * @param param0
   * @returns
   */
  async index({}: HttpContext) {
    const players = await this.playerService.all()
    return { data: players }
  }

  // async store({ request }: HttpContext) {}

  /**
   * Show a single player by id.
   * @param param0
   * @returns
   */
  async show({ params }: HttpContext) {
    const player = await this.playerService.find(params.id)
    return { data: player }
  }

  // async update({ params, request }: HttpContext) {}

  /**
   * Delete a player by id.
   * @param param0
   * @returns
   */
  async destroy({ params }: HttpContext) {
    await this.playerService.delete(params.id)
    return { message: 'Player deleted successfully' }
  }
}
