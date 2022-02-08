import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import LanguageLevelRepository from 'App/Repositories/LanguageLevelRepository'


export default class LanguageLevelTransformer extends TransformerAbstract {
  public async transform(language: LanguageLevelRepository) {

    return {
      id: language.id,
      level_name: language.level_name
    }
  }
}
