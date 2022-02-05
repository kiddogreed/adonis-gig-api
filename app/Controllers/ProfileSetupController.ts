import SkillRepository from 'App/Repositories/SkillRepository'
import ClientRepository from 'App/Repositories/ClientRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EducationRepository from 'App/Repositories/EducationRepository'
import ProfileSetupValidator from 'App/Validators/ProfileSetupValidator'
import OccupationRepository from 'App/Repositories/OccupationRepository'
import CertificationRepository from 'App/Repositories/CertificationRepository'
import PersonalWebsite from 'App/Models/PersonalWebsite'



export default class ProfileSetupController {

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

  async proInformation({ auth, request, response }: HttpContextContract) {
    const data = request.input([`data`])
    console.log(data)
    try {
      for (let value of data) {
        const user = auth.user
          const occupation = await OccupationRepository.create({
            client_id: user.profile_id,
            company: value.company,
            date_from: value.date_from,
            date_to: value.date_to,
          })
          await occupation.save();

      }
      return response.ok("Professional information successfully saved")
    } catch (e) {
      console.log(e)
      return response.badRequest('Invalid Profession Request')
    }

  }



  async security({ auth, request, response }) {
    const user = auth.user
    try {
      const client = await ClientRepository.findByOrFail('id', user.cliend_id)
      client.number = request.input('number')
      await client?.save()

      return response.ok('Security information saved')
    } catch (e) {
      return response.badRequest('Invalid Security Request')
    }
  }
}
