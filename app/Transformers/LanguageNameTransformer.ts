import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import LanguageRepository from 'App/Repositories/LanguageNameRepository'


export default class LanguageNameRepository extends TransformerAbstract {
  public async transform(language: LanguageRepository) {

    return {
      id: language.id,
      language_name: language.language_name
    }
  }
}
