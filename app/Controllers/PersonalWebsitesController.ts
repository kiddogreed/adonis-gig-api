import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonalWebsiteRepository from 'App/Repositories/PersonalWebsiteRepository'

export default class PersonalWebsitesController {

    async update({ request, response, params }: HttpContextContract) {
        try {
          const website = await PersonalWebsiteRepository.findByOrFail('id', params.Id)
          website.website = request.input('website')
       
          await website?.save()
    
          return response.ok('Website information saved')
    
        } catch (e) {
          return response.badRequest('Invalid website Request')
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

