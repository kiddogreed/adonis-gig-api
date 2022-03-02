import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigRepository from 'App/Repositories/GigRepository'


export default class GigTransformer extends TransformerAbstract {
  public async transform(gig: GigRepository) {

    return {
      id: gig.id,
      client_id: gig.client_id,
      title: gig.name,
      tag: gig.tag,
      category_id: gig.category_id,
      subcategory_id: gig.subcategory_id
    }
  }
}
