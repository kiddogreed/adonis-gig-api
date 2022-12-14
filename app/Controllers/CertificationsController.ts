import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CerticationValidator from 'App/Validators/CertificationValidator'
import ProfileStatusRepository from 'App/Repositories/ProfileStatusRepository'
import CertificationRepository from 'App/Repositories/CertificationRepository'
import CertificationTransformer from 'App/Transformers/CertificationTransformer'

export default class CertificationsController {
  async index({ auth, response, transform }) {
    const user = auth.user
    const certification = await CertificationRepository.query().where('client_id', user.profile_id)
    return response.resource(await transform.collection(certification, CertificationTransformer))
  }

  async set({ auth, request, response }: HttpContextContract) {
    await request.validate(CerticationValidator)
    const user = auth.user
    try {
      const certification = await CertificationRepository.create({
        client_id: user.profile_id,
        certificate_name: request.input('certificate_name'),
        certified_from: request.input('certified_from'),
        certification_link: request.input('certification_link'),
        year: request.input('year')
      })
      await certification.save();

      const status = await ProfileStatusRepository.create({
        client_id: user.profile_id,
        section: 'Professional',
        under: 'Certification',
        section_percent: 100,
        section_status: 'Completed',
      })
      await status.save();

      return response.ok('Certification information saved')

    } catch (e) {
      return response.badRequest('Invalid Certification Request')
    }
  }

  async update({ request, response, params }: HttpContextContract) {
    await request.validate(CerticationValidator)
    try {
      const certifaction = await CertificationRepository.findByOrFail('id', params.Id)
      certifaction.certificate_name = request.input('certificate_name')
      certifaction.certified_from = request.input('certified_from')
      certifaction.certification_link = request.input('certification_link')
      certifaction.year = request.input('year')
      await certifaction?.save()

      return response.ok('Certification information saved')

    } catch (e) {
      return response.badRequest('Invalid Certification Request')
    }
  }

  async destroy({ response, params }: HttpContextContract) {
    try {
      const certification = await CertificationRepository.findByOrFail('id', params.Id)
      await certification.delete()

      return response.ok('Certification information deleted')

    } catch (e) {
      return response.badRequest('Invalid Certification Request')
    }
  }

}
