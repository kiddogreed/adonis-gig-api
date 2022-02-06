import UserRepository from 'App/Repositories/UserRepository'
import SkillRepository from 'App/Repositories/SkillRepository'
import ClientRepository from 'App/Repositories/ClientRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import EducationRepository from 'App/Repositories/EducationRepository'
import OccupationRepository from 'App/Repositories/OccupationRepository'
import LinkAccountRepository from 'App/Repositories/LinkAccountRepository'
import CertificationRepository from 'App/Repositories/CertificationRepository'
import PersonalWebsiteRepository from 'App/Repositories/PersonalWebsiteRepository'

export default class UserTransformer extends TransformerAbstract {
  public async transform(info: ClientRepository) {
    const user = await UserRepository.findBy('profile_id', info.id)
    const skill = await SkillRepository.findBy('client_id', info.id)
    const link = await LinkAccountRepository.findBy('client_id', info.id)
    const education = await EducationRepository.findBy('client_id', info.id)
    const occupation = await OccupationRepository.findBy('client_id', info.id)
    const certification = await CertificationRepository.findBy('client_id', info.id)
    const website = await PersonalWebsiteRepository.findBy('client_id', info.id)

    return {
      id: user?.email,
      profile_type: user?.profile_type,
      username: user?.username,
      verified: info.verified,
      country: info.country,
      first_name: info.first_name,
      middle_name: info.middle_name,
      last_name: info.last_name,
      contact: info.contact,
      photo: info.photo,
      description: info.description,
      language: info.language,
      certificate_name: certification?.certificate_name,
      certified_from: certification?.certified_from,
      certified_year: certification?.year,
      education_country: education?.country,
      school: education?.school,
      degree: education?.degree,
      year_graduated: education?.year_graduated,
      link_email: link?.email,
      presence_name: link?.presence_name,
      company: occupation?.company,
      date_from: occupation?.date_from,
      date_to: occupation?.date_to,
      skill_id: skill?.id,
      skill_level: skill?.level,
      website: website?.website
    }
  }
}
