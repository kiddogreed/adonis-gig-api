import SkillRepository from 'App/Repositories/SkillRepository'
import ClientRepository from 'App/Repositories/ClientRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducationRepository from 'App/Repositories/EducationRepository'
import OccupationRepository from 'App/Repositories/OccupationRepository'
import ProfessionalTransformer from 'App/Transformers/ProfessionalTransformer'
import CertificationRepository from 'App/Repositories/CertificationRepository'
import PersonalWebsiteRepository from 'App/Repositories/PersonalWebsiteRepository'

export default class ProfessionalInformationsController {

  async show({ auth, response, transform }: HttpContextContract) {
    const user = auth.user
    const client = await ClientRepository.query().where('id', user.profile_id).first()

    return response.resource(await transform.item(client, ProfessionalTransformer))

  }

  async set({ auth, request, response }: HttpContextContract) {
    const data = request.input([`data`])
    try {
      for (let value of data) {
        const user = auth.user
        if (value.company) {
          const occupation = await OccupationRepository.create({
            client_id: user.profile_id,
            company: value.company,
            date_from: value.date_from,
            date_to: value.date_to,
          })
          await occupation.save();
        }
        if (value.skill_id) {
          const skill = await SkillRepository.create({
            client_id: user.profile_id,
            skill_id: value.skill_id,
            level: value.level
          })
          await skill.save();
        }
        if (value.school) {
          const education = await EducationRepository.create({
            client_id: user.profile_id,
            country: value.country,
            school: value.school,
            degree: value.degree,
            year_graduated: value.year_graduated
          })
          await education.save();
        }
        if (value.certificate_name) {
          const certification = await CertificationRepository.create({
            client_id: user.profile_id,
            certificate_name: value.certificate_name,
            certified_from: value.certified_from,
            year: value.year
          })
          await certification.save();
        }
        if (value.website) {
          const website = await PersonalWebsiteRepository.create({
            client_id: user.profile_id,
            website: value.website
          })
          await website.save();
        }
      }
      return response.ok("Professional information successfully saved")
    } catch (e) {
      console.log(e)
      return response.badRequest('Invalid Profession Request')
    }

  }
}
