import GigPricingRepository from "App/Repositories/GigPricingRepository"
import GigExtraServiceRepository from "App/Repositories/GigExtraServiceRepository"
import GigPackageInclusionRepository from "App/Repositories/GigPackageInclusionRepository"
export default class GigPricingsController {

  async set({ auth, request, response }) {
    const user = auth.user
    try {
      const gigPricing = await GigPricingRepository.create({
        client_id: user.profile_id,
        package: request.input('package'),
        package_name: request.input('package_name'),
        package_description: request.input('description'),
        delivery_time: request.input('delivery_time'),
        price: request.input('price')
      })
      await gigPricing.save()
      
      const data = request.input([`data`])
      for(let value of data){
        const inclusion = await GigPackageInclusionRepository.create({
          client_id: user.profile_id,
          inclusion_name: value.inclusion_name,
          package_name: value.inclusion_package,
        })
        await inclusion.save()
      }
     
      return response.ok('Scope and Pricing successfully saved')
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
