import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Tag from 'App/Models/Tag';
import GigRepository from 'App/Repositories/GigRepository';
import GigTagRepository from 'App/Repositories/GigTagRepository';
import TagRepository from 'App/Repositories/TagRepository'
import GigTransformer from 'App/Transformers/GigTransformer';
import SearchByTagTransformer from 'App/Transformers/SearchByTagTransformer';
import TagTransformer from 'App/Transformers/TagTransformer';
import GigListTransformer from 'App/Transformers/GigListTransformer'


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

  public async search({response, request, transform}:HttpContextContract){

  
    const meta = request.only(["page", "per_page"]);
    const filters = request.only("keyword");
    const inputId = request.only("gig_id");
   
    
    const tagss = await TagRepository.query()
    .where('name', 'like', `%${filters.keyword}%`)
    .orderBy("id", "desc")
    .paginate(meta.page, meta.per_page)
    
    
   //const tagsss = await GigTagRepository.query().preload('tag').preload('gig').where
    //return tagsss
    const gig = await GigRepository.query().preload('tags')
    //const gigtags = await GigTagRepository.query().preload('gig').preload('tag')
    .where('name', 'like', `%${filters.keyword}%`)
    //.where('status', '!=', 'draft')
    .orderBy("id", "desc")
  
    .paginate(meta.page, meta.per_page)

    return response.resource(await transform.collection(gig, GigListTransformer))
    return gig
    
    //const gigTag = await GigTagRepository.query().preload('gig')
   // .where('name', 'like', `%${filters.keyword}%`)
    // return gigTag
  // gig.forEach(element => {
  //   console.log(tag);

//  return tagss
  
    //return gig
  // });
     

  // return gig
  //   //return gigtags
  
   // return response.resource(await transform.collection(tagss, SearchByTagTransformer))
return
    // const gigs = await GigRepository.query().preload('tags')
    const gigs = await GigRepository.query()
        .where()
        .orderBy("id", "desc")
    return gigs
    const data =  {
      meta:meta,
      filter:filters
    }
          
      
        
return data
  }

  public async find({response, request, transform}:HttpContextContract){

    const meta = request.only(["page", "per_page"]);
    const filters = request.only("search");
    const gigs = await GigRepository.query().preload('tags')
      .where('name', 'like', `%${filters.search}%`)
      .orderBy("id", "desc")
      .paginate(meta.page, meta.per_page)
      //  gig.related('tags').query() // 
      //console.log(testgig);

      return response.resource(await transform.collection(gigs, GigListTransformer))
      
   
  }

} 