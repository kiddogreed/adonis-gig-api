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
    const filters = request.only(["by_name", "by_tag"]);

    if (filters.by_name) {
      const gigs = await GigRepository.query().preload('tags')
      .where('name', 'like', `%${filters.by_name}%`)
      .orderBy("id", "desc")
      .paginate(meta.page, meta.per_page)
      //  gig.related('tags').query() // 
      //console.log(testgig);

      return response.resource(await transform.collection(gigs, GigListTransformer))
      
    }
    //search by tag query
 if(filters.by_tag){
  const tags = await TagRepository.query()
  .where('name', 'like', `%${filters.by_tag}%`)
  .orderBy("id", "desc")
  .paginate(meta.page, meta.per_page)

 return tags
  //return response.resource(await transform.collection(tags, GigListTransformer))
 }

   
  }

} 