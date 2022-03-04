// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientRepository from 'App/Repositories/ClientRepository'
import MyAccountTransformer from 'App/Transformers/MyAccountTransformer'

export default class MyAccountsController {
    async index({ auth, response, transform }) {
        const user = auth.user
        const client = await ClientRepository.query().where('id', user.profile_id)
        return response.resource(await transform.item(client, MyAccountTransformer))
      }
    
}
