import { TeamService } from '#services/team_service'
import { createTeamValidator } from '#validators/team'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TeamsController {
  constructor(private teamService: TeamService) {}

  async index({}: HttpContext) {
    const players = await this.teamService.all()
    return { data: players }
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createTeamValidator)
    const team = await this.teamService.create(payload)

    return { data: team }
  }

  async show({ response, params }: HttpContext) {
    const team = await this.teamService.find(params.id)

    if (!team) {
      return response.status(404).json({ message: 'Team not found' })
    }

    return { data: team }
  }

  async destroy({ params }: HttpContext) {
    await this.teamService.delete(params.id)
    return { message: 'Team deleted successfully' }
  }
}
