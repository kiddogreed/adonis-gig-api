import GigRepository from 'App/Repositories/GigRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GigPostTransformer from 'App/Transformers/GigPostTransformer'
import GigTransformer from 'App/Transformers/GigTransformer'



export default class GigPostsController {

    public async index({ response, request, transform, auth}:HttpContextContract){
      //get current user
      const user = auth.user
      //get gigs of the user
      const gigs = await GigRepository.query()
        .where('client_id', user.id)
        .orderBy('id','asc')
     
        if(!gigs){
          return response.badRequest('Gig not found!')
         }
      return response.resource(await transform.collection(gigs, GigTransformer))
    

  }

    public async show({ response, params, transform, auth}:HttpContextContract){
      const user = auth.user
      try {
         const postGig = await GigRepository.findBy('id',params.id)

         if(!postGig){
          return response.badRequest('Gig not found!')
         }
        return response.resource(await transform.item(postGig, GigPostTransformer))
      } catch (error) {
        return response.badRequest('Invalid Request')
        
      }
     
    }

}
