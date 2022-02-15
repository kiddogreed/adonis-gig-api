import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
}
