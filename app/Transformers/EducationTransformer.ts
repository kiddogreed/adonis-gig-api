import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import EducationRepository from 'App/Repositories/EducationRepository'


export default class EducationTransformer extends TransformerAbstract {
  public async transform(education: EducationRepository) {

    return {
      id: education.id,
      client_id: education.client_id,
      country: education.country,
      school: education.school,
      degree: education.degree,
      year_graduated: education.year_graduated
    }
  }
}
