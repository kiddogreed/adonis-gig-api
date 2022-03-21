
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
  public async transform(gig: TagRepository) {


    const tags = await GigTagRepository.query().preload('tag').preload('gig')
    
    return tags
    // name: gig.name,
    // tag: gig.tag, 
    // description: gig.description,
    // status: gig.status,
    // client: client,
    // pricing: pricing,
    // category: category,
    // subCategory: subCategory,
    // gallery: gallery
    return {
      gig:gig,
      status: gig.$original.status,
      
    }
   

    
    
  }
}
