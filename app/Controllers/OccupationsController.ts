import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OccupationRepository from 'App/Repositories/OccupationRepository'
import OccupationTransformer from 'App/Transformers/OccupationTransformer'

export default class OccupationsController {

  async index({ auth, response, transform }: HttpContextContract) {
    const user = auth.user
    const occupation = await OccupationRepository.query().where('client_id', user.profile_id)
    return response.resource(await transform.collection(occupation, OccupationTransformer))
  }

  async set({ auth, request, response }: HttpContextContract) {
    const data = request.input([`data`])
    const user = auth.user
    try {
      for (let value of data) {
        const occupation = await OccupationRepository.create({
          client_id: user.profile_id,
          company: value.company,
          date_from: value.date_from,
          date_to: value.date_to,
        })
        await occupation.save();
      }
      return response.ok('Occupation information saved')

    } catch (e) {
      return response.badRequest('Invalid Occupation Request')
    }
  }

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
