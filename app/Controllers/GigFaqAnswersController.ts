import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GigFaqAnswerRepository from 'App/Repositories/GigFaqAnswerRepository'

export default class GigFaqAnswersController {

  async set({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    try {
      const FaqAnswer = await GigFaqAnswerRepository.create({
        client_id: user.profile_id,i
        faq_id: request.input('faq_id'),
        answer: request.input('answer')
      })
      await FaqAnswer.save()
      return response.ok('FAQ Answer created')
    } catch (e) {
      return response.badRequest('Invalid FAQ request')
    }
  }

  async update({ request, response, params }: HttpContextContract) {
    try {
      const faqAnswer = await GigFaqAnswerRepository.find(params.Id)
      faqAnswer.answer = request.input('answer')
      await faqAnswer?.save()

      return response.ok('FAQ successfully updated')
    } catch (e) {
      return response.badRequest('Invalid FAQ request')
    }
  }

  async destroy({ response, params }: HttpContextContract) {
    try {
      const faqAnswer = await GigFaqAnswerRepository.findOrFail(params.Id)
      await faqAnswer.delete()
      return response.ok('FAQ successfully deleted')
    } catch (e) {
      return response.badRequest('Invalid FAQ request')
    }
  }

}
