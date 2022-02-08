import EducationRepository from "App/Repositories/EducationRepository"
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducationTransformer from 'App/Transformers/EducationTransformer'

export default class EducationsController {

  async index({ auth, response, transform }: HttpContextContract) {
    const user = auth.user
    const education = await EducationRepository.query().where('client_id', user.profile_id)
    return response.resource(await transform.collection(education, EducationTransformer))
  }

  async set({ auth, request, response }: HttpContextContract) {
    const data = request.input([`data`])
    const user = auth.user
    try {
      for (let value of data) {
        const education = await EducationRepository.create({
          client_id: user.profile_id,
          country: value.country,
          school: value.school,
          degree: value.degree,
          year_graduated: value.year_graduated
        })
        await education.save()
      }
      return response.ok('Education information saved')
    } catch (e) {
      return response.badRequest('Invalid Education Request')
    }
  }

  async update({ request, response, params }: HttpContextContract) {
    try {
      const education = await EducationRepository.findByOrFail('id', params.Id)
      education.country = request.input('country')
      education.school = request.input('school')
      education.degree = request.input('degree')
      education.year_graduated = request.input('year_graduated')
      await education?.save()

      return response.ok('Education information saved')

    } catch (e) {
      return response.badRequest('Invalid Education Request')
    }
  }

  async destroy({ response, params }: HttpContextContract) {
    try {
      const education = await EducationRepository.findByOrFail('id', params.Id)
      await education.delete()

      return response.ok('Education information deleted')

    } catch (e) {
      return response.badRequest('Invalid Education Request')
    }
  }
}
