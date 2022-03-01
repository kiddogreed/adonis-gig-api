import GigRepository from 'App/Repositories/GigRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigCategoryRepository from 'App/Repositories/GigCategoryRepository'
import SubCategoryRepository from 'App/Repositories/SubCategorieRepository'
import GigGallerieRepository from 'App/Repositories/GigGallerieRepository'

export default class GigManagePostTransformer extends TransformerAbstract {
  public async transform(gig: GigRepository) {
    const categoryRepository = await GigCategoryRepository.findByOrFail('id', gig.category_id)
    const subRepository = await SubCategoryRepository.findByOrFail('id', gig.subcategory_id)
    const gigGallerry = await GigGallerieRepository.findByOrFail('client_id', gig.client_id)


    return {
      id: gig.id,
      client_id: gig.client_id,
      name: gig.name,
      category_name: categoryRepository?.name,
      subcategory_name: subRepository?.name,
      created_at: gig.createdAt,
      updated_at: gig.updatedAt,
      gallery: gigGallerry,
    }
  }
}
