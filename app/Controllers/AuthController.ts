import { DateTime } from "luxon"
// import UserRepository from 'App/Repositories/UserRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

  async login({ auth, request, response }: HttpContextContract) {
    // const data = request.only([
    //   "username",
    //   "password"
    // ])
    try {
      // const user = await UserRepository.query()
      //   .where("email", data.username)
      //   .orWhere("username", data.username)
      //   .first()
    
      // if (!user) {
      //   return response.notFound(
      //     "Invalid email/username or password"
      //   );
      // }
      const token = await auth.use('api').attempt(request.input('username'), request.input('password'))
      const user = auth.user
      user.logged_in_at = DateTime.now()
      await user.save();
      // const token = await auth.use('api').generate(user)

      return response.data({
        'token': token.token,
        'user': {
          'id': user?.id,
          'profile_type': user?.profile_type,
          'client_id': user?.profile_id,
          'email': user?.email,
          'username': user?.username
        }
      }, 'Login successfully.')
    }
    catch (error) {
      console.log('error',error)
      return response.badRequest("Invalid email/username or password")
    }
  }

}
