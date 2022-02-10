import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigCategoryRepository from 'App/Repositories/GigCategoryRepository'


export default class GigCategoryTransformer extends TransformerAbstract {
  public async transform(category: GigCategoryRepository) {

    return {
      id: category.id,
      name: category.name,
      logo: category.logo,
      banner: category.banner
    }
  }
}
