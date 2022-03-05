import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GigFaqRepository from 'App/Repositories/GigFaqRepository'
import GigFaqTransformer from 'App/Transformers/GigFaqTransformer'

export default class GigFaqsController {

  async show({ params, response, transform }) {
    try {
      const description = await GigFaqRepository.query().where('gig_id', params.gigId)
      return response.resource(await transform.collection(description, GigFaqTransformer))
    }
    catch (e) {
      return response.badRequest('Invalid FAQ request')
    }
  }

  async set({ auth, response, request }: HttpContextContract) {
    const user = auth.user
    try {
      const gigFaq = await GigFaqRepository.create({
        client_id: user.profile_id,
        gig_id: request.input('gig_id'),
        question: request.input('question'),
        answer: request.input('answer')
      })
      await gigFaq.save()

      return response.ok('Gig FAQ successfully created')

    } catch (e) {
      console.log(e)
      return response.badRequest('Invalid FAQ request')
    }
  }

  async update({ response, request, params }: HttpContextContract) {
    try {
      const gigFaq = await GigFaqRepository.findByOrFail('id', params.Id)
      gigFaq.question = request.input('question')
      gigFaq.answer = request.input('answer')
      await gigFaq.save()

      return response.ok('Gig FAQ successfully updated')

    } catch (e) {
      return response.badRequest('Invalid FAQ request')
    }
  }

  async destroy({ response, params }: HttpContextContract) {
    try {
      const gigFaq = await GigFaqRepository.findBy('id', params.Id)
      await gigFaq.delete()

      return response.ok('Gig FAQ successfully deleted')
    } catch (e) {
      return response.badRequest('Invalid FAQ request')
    }
  }
}
