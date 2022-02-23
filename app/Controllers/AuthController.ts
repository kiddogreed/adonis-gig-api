import { DateTime } from "luxon"
import UserRepository from 'App/Repositories/UserRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientRepository from "App/Repositories/ClientRepository"

export default class AuthController {

  async login({ auth, request, response }) {
    const data = request.only([
      "username",
      "password"
    ])
    try {
      const user = await UserRepository.query()
        .where("email", data.username)
        .orWhere("username", data.username)
        .first()

      if (!user) {
        return response.notFound(
          "Invalid email/username or password"
        );
      }
      if (user.two_factor_auth == 1) {
        return response.data(
          user.profile_type = user.profile_type,
          user.two_factor_auth = user.two_factor_auth,
        );
      }

      const client = await ClientRepository.findByOrFail('id',user.profile_id)
      
      const token = await auth.use('api').attempt(user.email, data.password)
      user.logged_in_at = DateTime.now()
      await user.save();

      return response.data({
        'token': token.token,
        'user': {
          'id': user?.id,
          'profile_type': user?.profile_type,
          'client_id': user?.profile_id,
          'profile_status': client.profile_status,
          'email': user?.email,
          'username': user?.username
        }
      }, 'You are now logged in.')
    }
    catch (error) {
      console.log('error', error)
      return response.badRequest("Invalid email/username or password")
    }
  }

  async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()

    return response.ok('You have successfully logged out.')
  }

}
