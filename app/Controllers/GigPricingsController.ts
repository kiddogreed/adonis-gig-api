import GigPricingRepository from "App/Repositories/GigPricingRepository"
import GigExtraServiceRepository from "App/Repositories/GigExtraServiceRepository"
import GigScopeAndPricingTransformer from "App/Transformers/GigScopeAndPricingTransformer"
export default class GigPricingsController {

  async show({ params, response, transform }) {
    try {
      const gigPricing = await GigPricingRepository.query().where('gig_id', params.gigId)
      return response.resource(await transform.collection(gigPricing, GigScopeAndPricingTransformer))
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
          package_description: value.package_description,
          delivery_time: value.delivery_time,
          price: value.price,
          inclusion_one: value.inclusion_one,
          inclusion_two: value.inclusion_two,
          inclusion_three: value.inclusion_three
        })
        await gigPricing.save()
      }
      return response.data({ 'id': request.input('gig_id') }, 'Scope and Pricing successfully saved')

    } catch (e) {
      console.log(e)
      return response.badRequest('Scope and Pricing Invalid')
    }
  }
  // async updateCreate({ auth, request, response }) {
  //   const user = auth.user
  //   const data = request.input([`data`])
  //   for (let value of data) {
  //     await GigPricingRepository.updateOrCreateMany('gig_id',data.gig_id,)

  //   }
  // }
  async update({ auth, request, response }) {
    const user = auth.user

    try {
      const data = request.input([`data`])
      for (let value of data) {
        const gigPricing = await GigPricingRepository.query().where('id', value.id).where('client_id', user.profile_id).first()
        gigPricing.gig_id = value.gig_id,
          gigPricing.package = value.package,
          gigPricing.package_name = value.package_name,
          gigPricing.package_description = value.package_description,
          gigPricing.delivery_time = value.delivery_time,
          gigPricing.price = value.price,
          gigPricing.inclusion_one = value.inclusion_one,
          gigPricing.inclusion_two = value.inclusion_two,
          gigPricing.inclusion_three = value.inclusion_three

        await gigPricing?.save()
      }
      return response.data({ 'id': request.input('gig_id') }, 'Scope and Pricing successfully updated')
    } catch (e) {
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
      const service = await GigExtraServiceRepository.findByOrFail('id', params.id)
      await service.delete()

      return response.ok('Extra service successfully deleted')

    } catch (e) {
      return response.badRequest('Invalid extra service request')
    }
  }
}
