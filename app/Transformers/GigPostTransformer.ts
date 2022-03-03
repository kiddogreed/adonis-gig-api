import GigRepository from 'App/Repositories/GigRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigCategoryRepository from 'App/Repositories/GigCategoryRepository'
import SubCategoryRepository from 'App/Repositories/SubCategorieRepository'
import GigGallerieRepository from 'App/Repositories/GigGallerieRepository'
import GigFaqRepository from 'App/Repositories/GigFaqRepository'
import GigDescriptionRepository from 'App/Repositories/GigDescriptionRepository'
import GigPricingRepository from 'App/Repositories/GigPricingRepository'
import GigRequirementRepository from 'App/Repositories/GigRequirementRepository'
import GigExtraServiceRepository from 'App/Repositories/GigExtraServiceRepository'

export default class GigPostTransformer extends TransformerAbstract {
  public async transform(gig: GigRepository) {
    const categoryRepository = await GigCategoryRepository.findByOrFail('id', gig.category_id)
    const subRepository = await SubCategoryRepository.findByOrFail('id', gig.subcategory_id)
    
    const gigGallerry = await GigGallerieRepository.query()
      .where('client_id', gig.client_id)
      .orderBy('id','asc')
    
    const faqs = await GigFaqRepository.query()
      .where('client_id', gig.client_id)
      .orderBy('id','asc')    

      
    const gigDesc = await GigDescriptionRepository.query()
      .where('client_id', gig.client_id)
      .orderBy('id','asc')  

    const gigPrice = await GigPricingRepository.query()
      .where('client_id', gig.client_id)
      .orderBy('id','asc')  
    
    const gigReq = await GigRequirementRepository.query()  
      .where('client_id', gig.client_id)
      .orderBy('id','asc')  

    const extraService = await GigExtraServiceRepository.query()  
      .where('client_id', gig.client_id)
      .orderBy('id','asc')  
    
    return {
      id: gig.id,
      client_id: gig.client_id,
      name: gig.name,
      category_name: categoryRepository?.name,
      subcategory_name: subRepository?.name,
      description:gigDesc,
      faq:faqs,
      gallery: gigGallerry,
      pricing:gigPrice,
      requirements:gigReq,
      extra_service:extraService,
      created_at: gig.createdAt,
      updated_at: gig.updatedAt,
    }
  }
}
