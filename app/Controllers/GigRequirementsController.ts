import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GigRequirementRepository from 'App/Repositories/GigRequirementRepository'
import GigRequirementTransformer from 'App/Transformers/GigRequirementTransformer'
import GigMultipleChoiceRepository from 'App/Repositories/GigMultipleChoiceRepository'

export default class GigRequirementsController {

  async index({ auth, response, transform }: HttpContextContract) {
    try {
      const user = auth.user
      const certification = await GigRequirementRepository.query().where('client_id', user.profile_id)
      return response.resource(await transform.collection(certification, GigRequirementTransformer))
    } catch (e) {
      return response.badRequest('Gig requirement invalid')
    }
  }

  async set({ auth, request, response }: HttpContextContract) {
    const data = request.only(['type'])
   
    const user = auth.user
    const RequirementRepository = GigRequirementRepository
    try {
      if (data.type == 'Free text') {
        const requirement = await RequirementRepository.create({
          client_id: user.profile_id,
          question: request.input('question')
        })
        await requirement.save()
        return response.ok('Gig requirement created')
      }

      if (data.type == 'Multiple choice') {
        const requirement = await GigRequirementRepository.create({
          client_id: user.profile_id,
          question: request.input('question')
        })
        await requirement.save()

        for (let value of request.input('choices')) {
          const multiple = await GigMultipleChoiceRepository.create({
            requirement_id: requirement.id,
            option: value
          })
          await multiple.save()
        }
        return response.ok('Gig requirement created')

      }
    } catch (e) {
      return response.badRequest('Gig requirement invalid')
    }

  }

  async question({ response, request, params }: HttpContextContract) {
    try {
      const question = await GigRequirementRepository.findByOrFail('id', params.Id)
      question.question = request.input('question')
      await question.save()

      return response.ok('Gig requirement updated')

    } catch (e) {
      return response.badRequest('Gig requirement invalid')
    }
  }

  async choice({ response, request, params }: HttpContextContract) {
    try {
      const choice = await GigMultipleChoiceRepository.findByOrFail('id', params.Id)
      choice.option = request.input('option')
      await choice.save()

      return response.ok('Gig option updated')
    } catch (e) {
      return response.badRequest('Gig option invalid')
    }
  }

}
