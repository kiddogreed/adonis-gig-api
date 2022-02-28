import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GigFaqRepository from 'App/Repositories/GigFaqRepository'
import GigFaqTransformer from 'App/Transformers/GigFaqTransformer'
import GigFaqAnswerRepository from 'App/Repositories/GigFaqAnswerRepository'

export default class GigFaqsController {

  async show({auth,response,transform}){
    const user = auth.user
    try{
      const description = await GigFaqRepository.query().where('client_id', user.profile_id)
      return response.resource(await transform.collection(description, GigFaqTransformer))
    }
    catch(e){
      return response.badRequest('Invalid FAQ request')
    }
  }

  async set({ auth, response, request }: HttpContextContract) {
    const user = auth.user
    try {
      const gigFaq = await GigFaqRepository.create({
        client_id: user.profile_id,
        question: request.input('question')
      })
      await gigFaq.save()

      return response.ok('Gig FAQ created')

    } catch (e) {
      console.log(e)
      return response.badRequest('Invalid FAQ request')
    }
  }

  async update({ response, request, params }: HttpContextContract) {
    try {
      const gigFaq = await GigFaqRepository.findByOrFail('id', params.Id)
      gigFaq.question = request.input('question')
      await gigFaq.save()

      return response.ok('Gig FAQ updated')

    } catch (e) {
      return response.badRequest('Invalid FAQ request')
    }
  }

  async destroy({ response, params }: HttpContextContract) {
    try {
      const gigFaq = await GigFaqRepository.findOrFail(params.Id)
      await gigFaq.delete()
      const gigAnswer = await GigFaqAnswerRepository.findBy('faq_id', params.Id)
      await gigAnswer.delete()

      return response.ok('Gig FAQ successfully deleted')
    } catch (e) {
      return response.badRequest('Invalid FAQ request')
    }
  }
}
