import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag';
import GigRepository from 'App/Repositories/GigRepository';
import TagRepository from 'App/Repositories/TagRepository'
import TagTransformer from 'App/Transformers/TagTransformer';

export default class GigSearchesController {

   public async find({response, request, transform}:HttpContextContract){
    
   
    const tagInput = request.input('tags');
    // const existTag = await TagRepository.findBy('name', tagInput)

    // console.log(existTag);
    
     const existTag = await TagRepository.query()
    //     .from('tags')
        //  .where('name', tagInput)
        .where('name', 'like', `%${tagInput}%`)
        .orderBy('id','asc')
        .limit(4)
    
     
      //  for( const tag of existTag){
      //    //log tagid with input names match
      //    let testdata = {

      //     id: tag.id,
      //     tag_name: tag.name

         
  
      //   }
      //   console.log(testdata);
      //   //return response.data(testdata)
        
        return response.resource(await transform.collection(existTag, TagTransformer))
      }
      


     

   // const gigs = await GigRepository.all
 //------------------------------using many to many relation----------------------------//
    // const gigtags = await GigRepository.findByOrFail('tag', tagInput)
    // //console.log(gigtags);
    
    //  await gigtags?.load('tags')
    //  console.log(gigtags?.tags);
  //------------------------------using many to many relation----------------------------//
    
    
    
    
  }
}
