import GigRepository from 'App/Repositories/GigRepository'
import GigFaqRepository from 'App/Repositories/GigFaqRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'

export default class GigDescriptionTransformer extends TransformerAbstract {
  public async transform(description: GigRepository) {
    const faq = await GigFaqRepository.query().where('gig_id', description.id)
    

    return {
      id: description.id,
      client_id: description.client_id,
      description: description.description,
      faq: faq
    }
  }
}
