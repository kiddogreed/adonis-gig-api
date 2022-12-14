import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import QoutationRepository from 'App/Repositories/QoutationRepository'
import GigScopePricingRepository from 'App/Repositories/GigPricingRepository'

export default class GigScopeAndPricingTransformer extends TransformerAbstract {
  public async transform(gig: GigScopePricingRepository) {
    const qoutation = await QoutationRepository.query().where('gig_id',gig.id).first()

    return {
      id: gig.id,
      client_id: gig.client_id,
      package: gig.package,
      package_name: gig.package_name,
      package_description: gig.package_description,
      delivery_time: gig.delivery_time,
      price: gig.price,
      inclusion_one: gig.inclusion_one,
      inclusion_two: gig.inclusion_two,
      inclusion_three: gig.inclusion_three,
      qoutation: qoutation
    }
  }
}
