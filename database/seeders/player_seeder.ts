import Player from '#models/player'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import playerData from '../data/player_data.json' with { type: 'json' }

export default class PlayerSeeder extends BaseSeeder {
  async run() {
    await Player.createMany(playerData)
  }
}
