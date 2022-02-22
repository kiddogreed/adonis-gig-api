import SkillRepository from 'App/Repositories/SkillRepository'
import ClientRepository from 'App/Repositories/ClientRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import EducationRepository from 'App/Repositories/EducationRepository'
import OccupationRepository from 'App/Repositories/OccupationRepository'
import CertificationRepository from 'App/Repositories/CertificationRepository'

export default class PersonalTransformer extends TransformerAbstract {
  public async transform(info: ClientRepository) {
    const skill = await SkillRepository.query().where('client_id', info.id)
    const education = await EducationRepository.query().where('client_id', info.id)
    const occupation = await OccupationRepository.query().where('client_id', info.id)
    const certification = await CertificationRepository.query().where('client_id', info.id)

    return {
      profile_status: info.profile_status,
      skill,
      education,
      occupation,
      certification
    }

  }
}
