import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Result from '#models/result'

export default class Tournament extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare status: 'upcoming' | 'in-progress' | 'completed'

  @column({ serializeAs: 'start_date' })
  declare startDate: DateTime

  @column({ serializeAs: 'end_date' })
  declare endDate: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @hasMany(() => Result)
  declare results: HasMany<typeof Result>
}
