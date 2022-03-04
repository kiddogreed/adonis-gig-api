import GigPricingRepository from "App/Repositories/GigPricingRepository"
import GigExtraServiceRepository from "App/Repositories/GigExtraServiceRepository"
import GigPackageInclusionRepository from "App/Repositories/GigPackageInclusionRepository"
import GigScopeAndPricingTransformer from "App/Transformers/GigScopeAndPricingTransformer"
export default class GigPricingsController {

  async show({ params, response, transform }) {
    try {
      const gigPricing = await GigPricingRepository.findBy('gig_id', params.gigId)
      return response.resource(await transform.item(gigPricing, GigScopeAndPricingTransformer))
    } catch (e) {
      console.log(e)
      return response.badRequest('Scope and Pricing Invalid')
    }
  }

  async set({ auth, request, response }) {
    const user = auth.user
    try {
      const data = request.input([`data`])
      for (let value of data) {
        const gigPricing = await GigPricingRepository.create({
          client_id: user.profile_id,
          gig_id: value.gig_id,
          package: value.package,
          package_name: value.package_name,
          package_description: value.description,
          delivery_time: value.delivery_time,
          price: value.price
        })
        await gigPricing.save()

        const inclusion = await GigPackageInclusionRepository.create({
          client_id: user.profile_id,
          gig_id: value.gig_id,
          package_inclusion: value.package_inclusion,
          package_name: value.package_inclusion_name,
          feature_name: value.feature_name
        })
        await inclusion.save()
      }
      return response.data({ 'Id': request.input('gig_id') }, 'Scope and Pricing successfully saved')

    } catch (e) {
      console.log(e)
      return response.badRequest('Scope and Pricing Invalid')
    }
  }

  async extraService({ auth, request, response }) {
    const user = auth.user
    const data = request.input([`data`])
    try {
      for (let value of data) {
        const extraService = await GigExtraServiceRepository.create({
          client_id: user.profile_id,
          package: value.package,
          price: value.price
        })
        await extraService.save()
      }
      return response.ok('Extra Service successfully saved')
    } catch (e) {
      return response.badRequest('Extra Service Invalid')
    }
  }

  async destroy({ response, params }) {
    try {
      const service = await GigExtraServiceRepository.findByOrFail('id', params.Id)
      await service.delete()

      return response.ok('Extra service successfully deleted')

    } catch (e) {
      return response.badRequest('Invalid extra service request')
    }
  }
}
