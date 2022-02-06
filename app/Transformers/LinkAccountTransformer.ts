import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import LinkAccountRepository from 'App/Repositories/LinkAccountRepository'


export default class LinkAccountTransformer extends TransformerAbstract {
  public async transform(link: LinkAccountRepository) {

    return {
      id: link.id,
      client: link.client_id,
      email: link.email,
      presence_name: link.presence_name
    }
  }
}
