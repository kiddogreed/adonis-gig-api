import SkillRepository from 'App/Repositories/SkillRepository'
import ClientRepository from 'App/Repositories/ClientRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import LanguageRepository from 'App/Repositories/LanguageRepository'
import LinkAccountRepository from 'App/Repositories/LinkAccountRepository'
import EducationRepository from 'App/Repositories/EducationRepository'
import CertificationRepository from 'App/Repositories/CertificationRepository'

export default class MyAccountTransformer extends TransformerAbstract {
  public async transform(client: ClientRepository) {
    
    const languages = await LanguageRepository.query().where('client_id', client.id)
    const linkAccounts = await LinkAccountRepository.query().where('client_id', client.id)
    const skills = await SkillRepository.query().where('client_id', client.id)
    const educations = await EducationRepository.query().where('client_id', client.id)
    const certifications = await CertificationRepository.query().where('client_id', client.id)

    return {
      id: client.id,
      first_name: client.first_name,
      middle_name: client.middle_name,
      last_name: client.last_name,
      profile_staus: client.profile_status,
      country: client.country,
      verified: client.verified,
      contact: client.contact,
      photo: client.photo,
      description: client.description,
      personal_website: client.personal_website,
      language: client.language,
      level: client.level,
      languages: languages,
      linked_accounts: linkAccounts,
      skills: skills,
      educations: educations,
      certifications: certifications
    }
  }
}
