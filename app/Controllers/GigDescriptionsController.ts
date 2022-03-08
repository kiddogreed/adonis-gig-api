import GigRepository from 'App/Repositories/GigRepository'
// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GigDescriptionTransformer from 'App/Transformers/GigDescriptionTransformer'


export default class GigDescriptionsController {

  async show({ auth, response, params, transform }) {
    const user = auth.user
    try {
      const description = await GigRepository.query().where('id', params.gigId).where('client_id', user.profile_id)
      return response.resource(await transform.collection(description, GigDescriptionTransformer))
    }
    catch (e) {
      return response.badRequest('Invalid Description Request')
    }
  }

}
