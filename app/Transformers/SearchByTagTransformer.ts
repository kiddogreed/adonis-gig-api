
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigCategoryRepository from 'App/Repositories/GigCategoryRepository'
import SubCategoryRepository from 'App/Repositories/SubCategorieRepository'
import GigGallerieRepository from 'App/Repositories/GigGallerieRepository'
import GigFaqRepository from 'App/Repositories/GigFaqRepository'
import GigDescriptionRepository from 'App/Repositories/GigDescriptionRepository'
import GigPricingRepository from 'App/Repositories/GigPricingRepository'
import GigRequirementRepository from 'App/Repositories/GigRequirementRepository'
import GigExtraServiceRepository from 'App/Repositories/GigExtraServiceRepository'
import TagRepository from 'App/Repositories/TagRepository'
import GigTagRepository from 'App/Repositories/GigTagRepository'
import GigRepository from 'App/Repositories/GigRepository'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

export default class SearchByTagTransformer extends TransformerAbstract {
  public async transform(tag: TagRepository) {

   
    return tag
   // return tag
    //using tagid search on gig_tags to find the gigowners
    // const gigTag = await GigTagRepository.query()
    // .where('tag_id', tag.id)
    // .orderBy('id','asc')

    // const giga = await GigRepository.query().preload('tags')
    // return giga
    // const gigtags = await GigTagRepository.query().has('gig')
    // console.log(gigtags);
//     const test = await GigRepository.query().preload('tags', (query) => {
//       query.groupLimit(2)
    //  return tag
//     })
//const gig = await GigRepository.query().preload('tags').has('gig')
    // const gig = await GigRepository.query()
    // .where('id', gigTag.$original.gigs_id)
    // .orderBy('id','asc')
    //return gig
// return test
    // return {
    // name: gig.name,
    // tag: gig.tag, 
    // description: gig.description,
    // status: gig.status,
    // client: client,
    // pricing: pricing,
    // category: category,
    // subCategory: subCategory,
    // gallery: gallery 

    //   }
    // return {
    //   name: gig.name,
    //   tag: gig.tag, 
    //   description: gig.description,
    //   status: gig.status,
    //   client: client,
    //   pricing: pricing,
    //   category: category,
    //   subCategory: subCategory,
    //   gallery: gallery
    //  // id: gig.id,
    //   // gallery: gigGallerry,
    //   // category: category,
    //   // subcategory: subcategory,
    //   // description: gigDescription,
    //   // pricing: gigPrice,
    //   // client_id: gig.client_id,
    //   // title: gig.name,
    //  //  tag: gigtags,
    // //   tags: gigTag,
    //   // //reviews:'reviews'
    //   // status:gig.status,
    //   // name:gig.name

    // }

    
    
  }
}
