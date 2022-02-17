import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import OccupationRepository from 'App/Repositories/OccupationRepository'


export default class OccupationTransformer extends TransformerAbstract {
  public async transform(occupation: OccupationRepository) {

    return {
      id: occupation.id,
      client_id: occupation.client_id,
      company: occupation.company,
      job_title: occupation.job_title,
      job_description: occupation.job_description,
      date_from: occupation.date_from,
      date_to: occupation.date_to
    }
  }
}
