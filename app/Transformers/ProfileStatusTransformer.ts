import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import ProfileStatusRepository from 'App/Repositories/ProfileStatusRepository'
export default class ProfileStatusTransformer extends TransformerAbstract {
  public async transform(status: ProfileStatusRepository) {
    return {
      client_id: status.client_id,
      section: status.section,
      under: status.under,
      section_percent: status.section_percent,
      section_status: status.section_status
    }
  }
}
