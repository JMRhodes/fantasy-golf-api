/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const PlayersController = () => import('#controllers/players_controller')
const TournamentsController = () => import('#controllers/tournaments_controller')
const TeamsController = () => import('#controllers/teams_controller')
const ResultsController = () => import('#controllers/results_controller')

router
  .group(() => {
    router
      .group(() => {
        router.resource('players', PlayersController).apiOnly()
        router.resource('tournaments', TournamentsController).apiOnly()
        router.resource('teams', TeamsController).apiOnly()
        router.resource('tournaments/:tournamentId/results', ResultsController).apiOnly()
      })
      .prefix('v1')
      .as('v1')
  })
  .prefix('api')
  .as('api')
