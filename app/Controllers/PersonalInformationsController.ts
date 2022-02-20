
import ClientRepository from 'App/Repositories/ClientRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LanguageRepository from 'App/Repositories/LanguageRepository'
import PersonalTransformer from 'App/Transformers/PersonalTransformer'
import ProfileSetupValidator from 'App/Validators/ProfileSetupValidator'
import ProfileStatusRepository from 'App/Repositories/ProfileStatusRepository'
export default class PersonalInformationsController {

  async show({ auth, response, transform }) {
    const user = auth.user
    const client = await ClientRepository.query().where('id', user.profile_id).first()
    return response.resource(await transform.item(client, PersonalTransformer))
  }

  async set({ auth, request, response }: HttpContextContract) {
    await request.validate(ProfileSetupValidator)
    const data = request.only(['first_name', 'last_name', 'photo', 'description'])
    try {
      const user = auth.user
      const client = await ClientRepository.findBy('id', user?.profile_id)
      client.first_name = data.first_name,
        client.last_name = data.last_name,
        client.photo = data.photo,
        client.description = data.description
      await client?.save()

      const language = await LanguageRepository.query().where('client_id', user.profile_id)

      if (language) {
        const status = await ProfileStatusRepository.create({
          client_id: user.profile_id,
          section: 'Professional',
          under: 'Occupation',
          section_percent: 100,
          section_status: 'Completed',
        })
        await status.save();

        client.profile_status = 'inProgress-professional'
        await client?.save()
      }

      if (!language) {
        return response.badRequest('Please input language')
      }

      return response.ok("Personal information successfully saved")
    } catch (e) {
      return response.badRequest('Invalid Profile Request')
    }
  }

  async update({ auth, request, response }: HttpContextContract) {
    const data = request.only(['first_name', 'last_name', 'photo', 'description', 'website'])
    try {
      const user = auth.user

      const client = await ClientRepository.findByOrFail('id', user.profile_id)

      if (!data.website) {
        client.first_name = data.first_name,
          client.last_name = data.last_name,
          client.photo = data.photo,
          client.description = data.description
        await client?.save()
        return response.ok("Personal information successfully saved")
      }

      if (data.website) {
        const unders = ['occupation','skill','education']
        for(let value of unders){
          const status = await ProfileStatusRepository.query().where('client_id', user.profile_id).where('under', value).first()
          if(!status){
          return response.badRequest('Please fillup' + ' ' + `${value}` + ' ' +  'information')
         }
        }
        client.profile_status = 'inProgress-linkedAccounts'
        client.personal_website = data.website
        await client?.save()

        return response.ok("Website information successfully saved")
      }
    } catch (e) {
      return response.badRequest('Invalid Profile Request')
    }
  }
}
