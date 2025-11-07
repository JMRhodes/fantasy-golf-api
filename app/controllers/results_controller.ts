import { createResultValidator } from '#validators/result'
import type { HttpContext } from '@adonisjs/core/http'

export default class ResultsController {
  async store({ request }: HttpContext) {
    const payload = request.validateUsing(createResultValidator)

    return payload
  }
}
