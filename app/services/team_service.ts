import Team from '#models/team'
import type { ModelObject } from '@adonisjs/lucid/types/model'
import type { TeamSchemaType } from '#validators/team'
import { DateTime } from 'luxon'
import tournament from '#models/tournament'

export class TeamService {
  async all(): Promise<ModelObject[]> {
    const teams = await Team.all()
    return teams.map((team) => team.serialize())
  }

  async find(id: number) {
    const team = await Team.find(id)
    return team ? team.serialize() : null
  }

  async create(payload: TeamSchemaType): Promise<Team> {
    const team = await Team.create({
      name: payload.name,
    })

    return team
  }

  async delete(id: number) {
    return await Team.query().where('id', id).delete()
  }
}
