import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import LanguageRepository from 'App/Repositories/LanguageRepository'


export default class LanguageTransformer extends TransformerAbstract {
  public async transform(language: LanguageRepository) {

    return {
      id: language.id,
      client: language.client_id,
      level_id: language.level_id,
      language_id: language.language_id
    }
  }
}
