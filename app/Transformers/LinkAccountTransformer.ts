import ClientRepository from 'App/Repositories/ClientRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import LinkAccountRepository from 'App/Repositories/LinkAccountRepository'



export default class LinkAccountTransformer extends TransformerAbstract {
  public async transform(link: LinkAccountRepository) {
    const client = await ClientRepository.findBy('id', link.client_id)

    return {
      id: link.id,
      client: link.client_id,
      profile_status: client?.profile_status,
      email: link.email,
      presence_name: link.presence_name,
      verified: link.verified,
      social_id: link.social_id
    }
  }
}
