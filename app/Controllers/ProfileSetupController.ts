import ClientRepository from 'App/Repositories/ClientRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProfileSetupValidator from 'App/Validators/ProfileSetupValidator'

export default class ProfileSetupController {

 async profile_type({ auth, request, response }: HttpContextContract) {
    const user = auth.user

    user.profile_type = request.input('profile_type')
    await user?.save()

    return response.ok('Profile type successfully created')
  }

   async personal_info({ request, response }: HttpContextContract) {
    await request.validate(ProfileSetupValidator)
    const data = request.only(['first_name', 'last_name', 'photo', 'description', 'language'])
    const client = await ClientRepository.create({
      first_name: data.first_name,
      last_name: data.last_name,
      photo: data.photo,
      description: data.description
    })
    await client?.save()
    return response.ok("Personal information successfully saved")
  }

}
