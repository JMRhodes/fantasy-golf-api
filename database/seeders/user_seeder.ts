import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/User'
import env from '#start/env'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Justin Rhodes',
        email: env.get('ADMIN_EMAIL'),
        password: env.get('ADMIN_PASSWORD'),
      },
    ])
  }
}
