import GigRepository from 'App/Repositories/GigRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GigPostsController {

  public async index({ response, request, transform, auth}:HttpContextContract){

     const user = await auth.use('api').authenticate()

    // console.log(user);
    const gigs = await GigRepository.query().orderBy('id', 'desc')
    
 
    for await (const gig of gigs){
     
      console.log(gig.name);
      // return gig.name

     }

  //  return gigs.name
    
    //const userProfile = await user.related('profile').query()
    //.orderBy('id','asc') //switch this code if you want to get collection transformer
 // .first()

  }
}
