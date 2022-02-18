import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import CountryRepository from 'App/Repositories/CountryRepository'


export default class CertificationTransformer extends TransformerAbstract {
	public async transform(country: CountryRepository) {

		return {
			id: country.id,
			name: country.name,
			code: country.code
		}
	}
}
