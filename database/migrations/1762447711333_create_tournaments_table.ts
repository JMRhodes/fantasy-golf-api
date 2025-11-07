import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tournaments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description')
      table
        .enu('status', ['upcoming', 'in-progress', 'completed'])
        .notNullable()
        .defaultTo('upcoming')
      table.dateTime('start_date')
      table.dateTime('end_date')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
