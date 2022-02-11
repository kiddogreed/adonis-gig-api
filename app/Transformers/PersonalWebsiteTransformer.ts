import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import PersonalWebsiteRepository from 'App/Repositories/PersonalWebsiteRepository'

export default class PersonalWebsiteTransformer extends TransformerAbstract {
  public async transform(web: PersonalWebsiteRepository) {
    return {
      id: web.id,
      client_id: web.client_id,
      website: web.website,
    }
  }
}
