import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigDescription from 'App/Repositories/GigDescriptionRepository'


export default class GigDescriptionTransformer extends TransformerAbstract {
  public async transform(description: GigDescription) {

    return {
      id: description.id,
      client_id: description.client_id,
      description: description.description
    }
  }
}
