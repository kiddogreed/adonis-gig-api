import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import SubCategoryRepository from 'App/Repositories/SubCategorieRepository'


export default class SubCategoryTransformer extends TransformerAbstract {
  public async transform(category: SubCategoryRepository) {

    return {
      id: category.id,
      name: category.name,
      logo: category.logo,
      banner: category.banner
    }
  }
}
