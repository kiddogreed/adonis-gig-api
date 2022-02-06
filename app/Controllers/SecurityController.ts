import ClientRepository from 'App/Repositories/ClientRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SecurityController {

  async show({ auth, response }: HttpContextContract) {
    const user = auth.user
    try {
      const client = await ClientRepository.findByOrFail('id', user.profile_id)
      return response.badGateway(client)
    } catch (e) {
      return response.badRequest('Invalid Security Request')
    }
  }

  async update({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    try {
      const client = await ClientRepository.findByOrFail('id', user.profile_id)
      client.contact = request.input('contact')
      await client?.save()

      return response.ok('Security information saved')

    } catch (e) {
      return response.badRequest('Invalid Security Request')
    }
  }

}
