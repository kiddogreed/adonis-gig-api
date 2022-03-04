import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GigDescriptionRepository from 'App/Repositories/GigDescriptionRepository'
import GigDescriptionTransformer from 'App/Transformers/GigDescriptionTransformer'

export default class GigDescriptionsController {

  async show({auth,response,transform}){
    const user = auth.user
    try{
      const description = await GigDescriptionRepository.findByOrFail('client_id', user.profile_id)
      return response.resource(await transform.item(description, GigDescriptionTransformer))
    }
    catch(e){
      return response.badRequest('Invalid Description Request')
    }
  }

  async set({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    try {
      const gigDescription = await GigDescriptionRepository.create({
        client_id: user.profile_id,
        
        description: request.input('description'),
      })
      await gigDescription.save()
      return response.ok('Gig Description created')

    } catch (e) {
      return response.badRequest('Invalid Gig Request')
    }
  }

  async update({ params, request, response }: HttpContextContract) {
    try {
      const gigDescription = await GigDescriptionRepository.findByOrFail('id', params.Id)
      gigDescription.description = request.input('description')
      await gigDescription?.save()
      
      return response.ok('Occupation information saved')
    } catch (e) {
      return response.badRequest('Invalid Gig Request')
    }
  }

}
