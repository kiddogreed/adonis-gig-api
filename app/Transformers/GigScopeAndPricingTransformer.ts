import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigScopePricingRepository from 'App/Repositories/GigPricingRepository'
import GigPackageInclusionRepository from 'App/Repositories/GigPackageInclusionRepository'

export default class GigScopeAndPricingTransformer extends TransformerAbstract {
  public async transform(gig: GigScopePricingRepository) {
    const inclusion = await GigPackageInclusionRepository.query().where('client_id', gig.client_id)

    return {
      id: gig.id,
      client_id: gig.client_id,
      package: gig.package,
      package_name: gig.package_name,
      package_description: gig.package_description,
      package_inclusion: inclusion

    }
  }
}
