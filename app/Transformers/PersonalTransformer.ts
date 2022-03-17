import ClientRepository from 'App/Repositories/ClientRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import LanguageRepository from 'App/Repositories/LanguageRepository'
import UserRepository from 'App/Repositories/UserRepository'
import LinkAccountRepository from 'App/Repositories/LinkAccountRepository'
import SkillRepository from 'App/Repositories/SkillRepository'
import EducationRepository from 'App/Repositories/EducationRepository'
import CertificationRepository from 'App/Repositories/CertificationRepository'
export default class PersonalTransformer extends TransformerAbstract {
  public async transform(info: ClientRepository) {

    const language = await LanguageRepository.query().where('client_id', info.id)
    const user = await UserRepository.findBy('profile_id', info.id)
    const linkAccounts = await LinkAccountRepository.query().where('client_id', info.id)
    const skills = await SkillRepository.query().where('client_id', info.id)
    const educations = await EducationRepository.query().where('client_id', info.id)
    const certifications = await CertificationRepository.query().where('client_id', info.id)

    return {
      id: info.id,
      profile_status: info.profile_status,
      email: user?.email,
      username: user?.username,
      profile_type: user?.profile_type,
      profile_role: user?.profile_role,
      contact: info.contact,
      verified: info.verified,
      first_name: info.first_name,
      last_name: info.last_name,
      photo: info.photo,
      description: info.description,
      website: info.personal_website,
      language: language,
      linked_accounts: linkAccounts,
      skills: skills,
      educations: educations,
      certifications: certifications
    }
  }
}
