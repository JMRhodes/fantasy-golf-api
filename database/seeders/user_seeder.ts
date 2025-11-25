import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import env from '#start/env'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: env.get('ADMIN_FULL_NAME'),
        email: env.get('ADMIN_EMAIL'),
        password: env.get('ADMIN_PASSWORD'),
      },
    ])
  }
}
