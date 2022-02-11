import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonalWebsiteRepository from 'App/Repositories/PersonalWebsiteRepository'
import PersonalWebsiteTransformer from 'App/Transformers/PersonalWebsiteTransformer'

export default class PersonalWebsitesController {

  async show({ auth, response, transform }: HttpContextContract) {
    const user = auth.user
    const website = await PersonalWebsiteRepository.query().where('client_id', user.profile_id).first()

    return response.resource(await transform.item(website, PersonalWebsiteTransformer))
  }

  async set({ auth, request, response }: HttpContextContract) {
    try {
      const user = auth.user
      const website = await PersonalWebsiteRepository.create({
        client_id: user.profile_id,
        website: request.input('website')
      })
      await website.save();
      return response.ok("Personal website successfully saved")
    } catch (e) {
      console.log(e)
      return response.badRequest('Invalid Personal Website Request')
    }
  }


  async destroy({ response, params }: HttpContextContract) {
    try {
      const website = await PersonalWebsiteRepository.findByOrFail('id', params.Id)
      await website.delete()

      return response.ok('Website information deleted')

    } catch (e) {
      return response.badRequest('Invalid Website Request')
    }
  }
}

