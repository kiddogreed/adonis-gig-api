
import ClientRepository from 'App/Repositories/ClientRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonalTransformer from 'App/Transformers/PersonalTransformer'
import ProfileSetupValidator from 'App/Validators/ProfileSetupValidator'

export default class PersonalInformationsController {

  async show({ auth, response, transform }: HttpContextContract) {
    const user = auth.user
    const client = await ClientRepository.query().where('id', user.profile_id).first()

    return response.resource(await transform.item(client, PersonalTransformer))

  }

  async set({ auth, request, response }: HttpContextContract) {
    await request.validate(ProfileSetupValidator)
    const data = request.only(['first_name', 'last_name', 'photo', 'description', 'language', 'level'])

    try {
      const user = auth.user
      const client = await ClientRepository.findBy('id', user?.profile_id)
      client.first_name = data.first_name,
        client.last_name = data.last_name,
        client.photo = data.photo,
        client.description = data.description
      await client?.save()

      return response.ok("Personal information successfully saved")
    } catch (e) {
      console.log(e)
      return response.badRequest('Invalid Profile Request')
    }
  }
}
