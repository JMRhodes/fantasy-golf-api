import db from '@adonisjs/lucid/services/db'

export class PlayerService {
  async all() {
    return await db.from('players').select('id', 'pga_id', 'name', 'salary')
  }
  async find(id: number) {
    return await db.from('players').where('id', id).first()
  }
}
