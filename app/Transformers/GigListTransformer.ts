
import GigRepository from 'App/Repositories/GigRepository'
import ClientRepository from 'App/Repositories/ClientRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigPricingRepository from 'App/Repositories/GigPricingRepository'
import GigCategoryRepository from 'App/Repositories/GigCategoryRepository'
import SubCategorieRepository from 'App/Repositories/SubCategorieRepository'
import GigDescriptionRepository from 'App/Repositories/GigDescriptionRepository'
import GigGallerieRepository from 'App/Repositories/GigGallerieRepository'

export default class MyAccountTransformer extends TransformerAbstract {
  public async transform(gig: GigRepository) {
    
    const pricing = await GigPricingRepository.query().where('gig_id', gig.id)
    const gallery = await GigGallerieRepository.query().where('gig_id', gig.id)
    const client = await ClientRepository.query().where('id', gig.client_id)
    const category = await GigCategoryRepository.query().where('id', gig.category_id)
    const subCategory = await SubCategorieRepository.query().where('id', gig.subcategory_id)

    return {
      name: gig.name,
      tag: gig.tag, 
      description: gig.description,
      status: gig.status,
      client: client,
      pricing: pricing,
      category: category,
      subCategory: subCategory,
      gallery: gallery
    }
  }
}
