import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { PlayerService } from '#services/player_service'

@inject()
export default class PlayersController {
  constructor(private playerService: PlayerService) {}
  /**
   * Return list of all posts or paginate through
   * them
   */
  async index({}: HttpContext) {
    const players = await this.playerService.all()
    return { data: players }
  }

  /**
   * Render the form to create a new post.
   *
   * Not needed if you are creating an API server.
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission to create a new post
   */
  async store({ request }: HttpContext) {}

  /**
   * Display a single post by id.
   */
  async show({ params }: HttpContext) {
    const player = await this.playerService.find(params.id)
    return { data: player }
  }

  /**
   * Handle the form submission to update a specific post by id
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Handle the form submission to delete a specific post by id.
   */
  async destroy({ params }: HttpContext) {}
}
