
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
    
    // const category = await GigCategoryRepository.findBy('id',tag.$original.category_id)
    // const subcategory = await SubCategoryRepository.findBy('id',tag.$original.subcategory_id)
    // const tags = await TagRepository.findBy('gig_id',tag.id)
    // console.log(tag);
    
    
    return{
      tag
    }
    return {
      id: tag.id,
      client_id: tag.$original.client_id,
      title: tag.name,
      tag: tag.$original.tag,
      category_id: tag.$original.category_id,
      category: category?.name,
      subcategory_id: tag.$original.subcategory_id,
      subcategory: subcategory?.name,
      tags: tags
    }
  }
}
