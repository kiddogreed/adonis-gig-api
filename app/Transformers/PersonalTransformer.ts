import ClientRepository from 'App/Repositories/ClientRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import LanguageRepository from 'App/Repositories/LanguageRepository'
// import PersonalWebsiteRepository from 'App/Repositories/PersonalWebsiteRepository'

export default class PersonalTransformer extends TransformerAbstract {
  public async transform(info: ClientRepository) {
    const language = await LanguageRepository.query().where('client_id', info.id)
    // const website = await PersonalWebsiteRepository.query().where('client_id', info.id).first()
    return {
      id: info.id,
      first_name: info.first_name,
      last_name: info.last_name,
      photo: info.photo,
      description: info.description,
      website: info.personal_website,
      language: language,
    }
  }
}
