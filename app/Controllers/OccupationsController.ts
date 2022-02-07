import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OccupationRepository from 'App/Repositories/OccupationRepository'

export default class OccupationsController {

  async update({ request, response, params }: HttpContextContract) {
    try {
      const occupation = await OccupationRepository.findByOrFail('id', params.Id)
      occupation.company = request.input('company')
      occupation.date_from = request.input('date_from')
      occupation.date_to = request.input('date_to')
      await occupation?.save()

      return response.ok('Occupation information saved')

    } catch (e) {
      return response.badRequest('Invalid Occupation Request')
    }
  }

  async destroy({ response, params }: HttpContextContract) {
    try {
      const occupation = await OccupationRepository.findByOrFail('id', params.Id)
      await occupation.delete()

      return response.ok('Occupation information deleted')

    } catch (e) {
      return response.badRequest('Invalid Occupation Request')
    }
  }

}
