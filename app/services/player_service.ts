import db from '@adonisjs/lucid/services/db'

export class PlayerService {
  async all() {
    return await db.from('players').select('id', 'name', 'salary')
  }
}
