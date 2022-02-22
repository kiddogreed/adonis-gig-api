import ClientRepository from 'App/Repositories/ClientRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonalTransformer from 'App/Transformers/PersonalTransformer'

export default class SecurityController {

  async show({ auth, response, transform }) {
    const user = auth.user
    const client = await ClientRepository.query().where('id', user.profile_id).first()
    return response.resource(await transform.item(client, PersonalTransformer))
  }

  async update({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    try {
      const client = await ClientRepository.findByOrFail('id', user.profile_id)
      client.contact = request.input('contact')
      client.profile_status = 'Completed'
      await client?.save()

      return response.ok('Security information saved')

    } catch (e) {
      return response.badRequest('Invalid Security Request')
    }
  }

  async draft({auth,response}){
    const user = auth.user
    const client = await ClientRepository.findBy('id', user?.profile_id)
    client.profile_status = 'inProgress-accountSecutiry'
    await client?.save()
    return response.ok("Security information successfully saved into draft")
  }

}
