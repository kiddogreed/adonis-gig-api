import SkillRepository from 'App/Repositories/SkillRepository'
import UserTransformer from 'App/Transformers/UserTransformer'
import ClientRepository from 'App/Repositories/ClientRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducationRepository from 'App/Repositories/EducationRepository'
import ProfileSetupValidator from 'App/Validators/ProfileSetupValidator'
import OccupationRepository from 'App/Repositories/OccupationRepository'
import CertificationRepository from 'App/Repositories/CertificationRepository'
import PersonalWebsiteRepository from 'App/Repositories/PersonalWebsiteRepository'


export default class ProfileSetupController {

  async show({auth,response,transform}:HttpContextContract){
    const user = auth.user
    const client = await ClientRepository.query().where('id',user.profile_id).first()
    return response.resource(await transform.item(client, UserTransformer))
  }

  async profileSetupType({ auth, request, response }: HttpContextContract) {
    try {
      const user = auth.user
      user.profile_type = request.input('type')
      await user?.save()

      return response.ok('Profile type successfully created')

    } catch (e) {
      return response.badRequest('Invalid Type Request')
    }
  }

  async personal({ auth, request, response }: HttpContextContract) {
    await request.validate(ProfileSetupValidator)
    const data = request.only(['first_name', 'last_name', 'photo', 'description', 'language', 'level'])

    try {
      const user = auth.user
      const client = await ClientRepository.findBy('id', user?.profile_id)
      client.first_name = data.first_name,
        client.last_name = data.last_name,
        client.photo = data.photo,
        client.description = data.description,
        client.language = data.language,
        client.level = data.level
      await client?.save()

      return response.ok("Personal information successfully saved")

    } catch (e) {
      console.log(e)
      return response.badRequest('Invalid Profile Request')
    }
  }

  async prefessionalInformation({ auth, request, response }: HttpContextContract) {
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
