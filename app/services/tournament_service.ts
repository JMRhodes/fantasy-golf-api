import Tournament from '#models/tournament'
import db from '@adonisjs/lucid/services/db'
import type { Infer } from '@vinejs/vine/types'
import type { TournamentSchema } from '#validators/tournament'
import { DateTime } from 'luxon'
export class TournamentService {
  async all() {
    return await db
      .from('tournaments')
      .select('id', 'name', 'description', 'status', 'start_date', 'end_date')
  }

  async create(payload: Infer<typeof TournamentSchema>) {
    const tournament = await Tournament.create({
      name: payload.name,
      description: payload.description,
      status: payload.status,
      startDate: DateTime.fromJSDate(payload.startDate),
      endDate: DateTime.fromJSDate(payload.endDate),
    })

    return tournament
  }

  async find(id: number) {
    return await db.from('tournaments').where('id', id).first()
  }

  async delete(id: number) {
    return await db.from('tournaments').where('id', id).delete()
  }
}
