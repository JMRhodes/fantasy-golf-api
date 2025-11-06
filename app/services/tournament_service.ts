import db from '@adonisjs/lucid/services/db'

export class TournamentService {
  async all() {
    return await db
      .from('tournaments')
      .select('id', 'name', 'description', 'status', 'start_date', 'end_date')
  }
  async find(id: number) {
    return await db.from('tournaments').where('id', id).first()
  }
  async delete(id: number) {
    return await db.from('tournaments').where('id', id).delete()
  }
}
