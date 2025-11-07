import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'results'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tournament_id').unsigned().references('tournaments.id').onDelete('CASCADE')
      table.integer('player_id').unsigned().references('players.id').onDelete('CASCADE')
      table.integer('points').notNullable()
      table.string('position').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
