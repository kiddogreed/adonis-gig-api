import ClientRepository from 'App/Repositories/ClientRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import LanguageRepository from 'App/Repositories/LanguageRepository'
export default class PersonalTransformer extends TransformerAbstract {
  public async transform(info: ClientRepository) {
    const language = await LanguageRepository.query().where('client_id', info.id)

    return {
      id: info.id,
      profile_status: info.profile_status,
      contact: info.contact,
      verified: info.verified,
      first_name: info.first_name,
      last_name: info.last_name,
      photo: info.photo,
      description: info.description,
      website: info.personal_website,
      language: language
    }
  }
}
