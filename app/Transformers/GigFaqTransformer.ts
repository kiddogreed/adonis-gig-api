import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigFaqRepository from 'App/Repositories/GigFaqRepository'


export default class GigFaqTransformer extends TransformerAbstract {
  public async transform(faq: GigFaqRepository) {

    return {
      id: faq.id,
      client_id: faq.client_id,
      question: faq.question,
      created_at: faq.createdAt,
      updated_at: faq.updatedAt
    }
  }
}
