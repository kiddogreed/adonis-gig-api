import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducationRepository from "App/Repositories/EducationRepository"
import EducationTransformer from 'App/Transformers/EducationTransformer'
import ProfileStatusRepository from 'App/Repositories/ProfileStatusRepository'

export default class EducationsController {

  async index({ auth, response, transform }) {
    const user = auth.user
    const education = await EducationRepository.query().where('client_id', user.profile_id)
    return response.resource(await transform.collection(education, EducationTransformer))
  }

  async set({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    try {
      const education = await EducationRepository.create({
        client_id: user.profile_id,
        country: request.input('country'),
        school: request.input('school'),
        degree: request.input('degree'),
        year_graduated: request.input('year_graduated')
      })
      await education.save()

      const status = await ProfileStatusRepository.create({
        client_id: user.profile_id,
        section: 'Professional',
        under: 'Education',
        section_percent: 100,
        section_status: 'Completed',
      })
      await status.save();

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
