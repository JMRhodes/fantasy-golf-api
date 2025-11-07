import Tournament from '#models/tournament'
import type { TournamentSchemaType } from '#validators/tournament'
import { DateTime } from 'luxon'
import type { ModelObject } from '@adonisjs/lucid/types/model'
export class TournamentService {
  async all(): Promise<ModelObject[]> {
    const tournaments = await Tournament.all()
    return tournaments.map((tournament) => tournament.serialize())
  }

  async create(payload: TournamentSchemaType): Promise<Tournament> {
    const tournament = await Tournament.create({
      name: payload.name,
      description: payload.description,
      status: payload.status,
      startDate: DateTime.fromJSDate(payload.startDate),
      endDate: DateTime.fromJSDate(payload.endDate),
    })

    return tournament
  }

  async find(id: number): Promise<Tournament | null> {
    return await Tournament.find(id)
  }

  async delete(id: number) {
    return await Tournament.query().where('id', id).delete()
  }
}
