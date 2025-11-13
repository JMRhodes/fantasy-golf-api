import { DateTime } from 'luxon'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Result from '#models/result'
import Team from './team.js'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare pgaId: number

  @column()
  declare salary: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Result)
  declare results: HasMany<typeof Result>

  @manyToMany(() => Team, {
    pivotTable: 'player_teams',
  })
  declare teams: ManyToMany<typeof Team>
}
