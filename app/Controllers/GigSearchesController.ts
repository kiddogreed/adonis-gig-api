import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Tag from 'App/Models/Tag';
import GigRepository from 'App/Repositories/GigRepository';
import TagRepository from 'App/Repositories/TagRepository'
import GigTransformer from 'App/Transformers/GigTransformer';
import TagTransformer from 'App/Transformers/TagTransformer';

export default class GigSearchesController {

  public async index({response, request, transform}:HttpContextContract){
    
    // const gigs = GigRepository.all()

 
    const page = request.input('page', 1)
    const limit = 10

    const gigs = await Database.from('gigs').paginate(page, limit)

    
  //  // console.log(gigs)
   // const gigs = await GigRepository
    // .query()
    // .preload('tags')
    //console.log(gigs);
     
    //  let data = {

    //   id:gigs.
    //   // client_id: tag.$original.client_id,
    //   // title: tag.name,
    //   // tag: tag.$original.tag,
    //   // category_id: tag.$original.category_id,
    //   // category: category?.name,
    //   // subcategory_id: tag.$original.subcategory_id,
    //   // subcategory: subcategory?.name,
    //   // tags: tags

    // }
    
    //     return response.data(gigs)
    return response.resource(await transform.collection(gigs, GigTransformer))
      
    
  }

  public async show({ response, params:{gig_id}, transform}:HttpContextContract){
   // const user = auth.user
   const gigs = await GigRepository.findByOrFail('id', gig_id)
   return gigs
    // const gigs = await GigRepository.findBy('id',params.id)
    // console.log( gigs);
    // return gigs
    // try {
    //   const gigs = await GigRepository.findBy('id',params.id)
    //   console.log( gigs);
      
    //   if(!gigs){
    //     return response.badRequest('Gig not found!')
    //    }
    //    return response.resource(await transform.item(gigs, GigTransformer))
    // } catch (error) {
    //   return response.badRequest('Invalid Request')
    // }
    // // const gig = await GigRepository.findByOrFail('id', params.gig_id)
    // // console.log(gig);
    // // console.log(gig_id);
    
    // console.log(params);
    
    

    }
}
