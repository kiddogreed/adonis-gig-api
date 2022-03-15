// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Response from 'App/Helpers/Response'
import ClientRepository from 'App/Repositories/ClientRepository'
import MyAccountTransformer from 'App/Transformers/MyAccountTransformer'

export default class MyAccountsController {
    async index({request, response, transform }) {
        const userId = request.input('userId')
        console.log("UserId: " + userId)
        const apiResponse = new Response(response)
        const client = await ClientRepository.query().where('id', userId).first()
        if(!client) {
          return apiResponse.notFound('Not found id: ' + userId)
        }
        return response.resource(await transform.item(client, MyAccountTransformer))
      }
    
}
