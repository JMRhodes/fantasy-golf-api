import Player from '#models/player'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class PlayerSeeder extends BaseSeeder {
  async run() {
    await Player.createMany([
      { name: 'Rory McIlroy', salary: 4000000 },
      { name: 'Jordan Spieth', salary: 3500000 },
      { name: 'Justin Thomas', salary: 3000000 },
    ])
  }
}
