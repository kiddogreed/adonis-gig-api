// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientRepository from 'App/Repositories/ClientRepository'
import MyAccountTransformer from 'App/Transformers/MyAccountTransformer'

export default class MyAccountsController {
    async index({ auth, response, transform }) {
        console.log('PUMASOK')
        // const user = auth.user
        // const client = await ClientRepository.query().where('id', user.profile_id)
        const client = await ClientRepository.query().where('id', 1).first()
        console.log('client: ' + JSON.stringify(client))
        return response.resource(await transform.item(client, MyAccountTransformer))
      }
    
}
