
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

export default class TagTransformer extends TransformerAbstract {
  public async transform(tag: TagRepository) {
   
    const gigTag = await GigTagRepository.query()
      .where('tag_id', tag.id)
     .orderBy('id','asc')


     
     
    let gigs = await GigRepository.query()
      .where('id', gigTag[0].gig_id)
      .orderBy('id','asc')    
   
    
      
    // const gigDesc = await GigDescriptionRepository.query()
    //   .where('client_id', gig.client_id)
    //   .orderBy('id','asc')  

    // const gigPrice = await GigPricingRepository.query()
    //   .where('client_id', gig.client_id)
    //   .orderBy('id','asc')  
    
    // const gigReq = await GigRequirementRepository.query()  
    //   .where('client_id', gig.client_id)
    //   .orderBy('id','asc')  

    // const extraService = await GigExtraServiceRepository.query()  
    //   .where('client_id', gig.client_id)
    //   .orderBy('id','asc')  
    
    return {
    //  tag_id: tag.id,
      gig_tags: gigTag,
      gigs :gigs
     // tag:gigs
      // created_at: tag.createdAt,
      // updated_at: tag.updatedAt,
    }
  }
}
