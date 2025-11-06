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

router.resource('players', PlayersController).apiOnly()
