import CountryRepository from 'App/Repositories/CountryRepository'
import CountryTransformer from 'App/Transformers/CountriesTransformer'

export default class CountriesController {

  async show({ request, response, transform }) {
    const filters = request.only('country')
    const query = CountryRepository.query()
    if (filters.country) {
      query.where('name', 'LIKE', `${filters.country}%`)
        .orWhere('code', `${filters.country}`)
    }
    const country = await query
    return response.resource(await transform.collection(country, CountryTransformer))
  }
}
