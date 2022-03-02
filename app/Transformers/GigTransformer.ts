import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigRepository from 'App/Repositories/GigRepository'
import GigCategoryRepository from 'App/Repositories/GigCategoryRepository'
import SubCategorieRepository from 'App/Repositories/SubCategorieRepository'


export default class GigTransformer extends TransformerAbstract {
  public async transform(gig: GigRepository) {
    const category = await GigCategoryRepository.findBy('id',gig.category_id)
    const subcategory = await SubCategorieRepository.findBy('id',gig.subcategory_id)

    return {
      id: gig.id,
      client_id: gig.client_id,
      title: gig.name,
      tag: gig.tag,
      category_id: gig.category_id,
      category: category?.name,
      subcategory_id: gig.subcategory_id,
      subcategory: subcategory?.name
    }
  }
}
