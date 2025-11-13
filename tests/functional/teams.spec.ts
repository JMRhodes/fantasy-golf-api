import { test } from '@japa/runner'
import { TeamService } from '#services/team_service'
import app from '@adonisjs/core/services/app'

test('get all teams', async ({ client }) => {
  class FakeService extends TeamService {
    async all() {
      return [{ id: 1, name: 'Jolly 1' }]
    }
  }

  app.container.swap(TeamService, () => {
    return new FakeService()
  })

  const response = await client.get('/api/v1/teams')

  response.assertStatus(200)
  response.assertBodyContains({
    data: [{ id: 1, name: 'Jolly 1' }],
  })

  app.container.restore(TeamService)
})
