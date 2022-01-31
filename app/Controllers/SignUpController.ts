import Mail from 'App/Services/Mail'
import RandomString from 'App/Services/RandomString'
import UserRepository from 'App/Repositories/UserRepository'
import TokenRepository from 'App/Repositories/TokenRepository'
import ClientRepository from 'App/Repositories/ClientRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignUpController {

  public async signup({ request, response }: HttpContextContract) {
    const data = request.only([
      "email",
    ])
    const emails = await UserRepository.query()
      .where("email", data.email)
      .first()

    if (emails) {
      return response.badRequest("Email already taken")
    }

    const users = new UserRepository()
    users.email = data.email,
      await users.save()

    const token = await TokenRepository.create({
      user_id: users?.id,
      type: 'VERIFICATION',
      code: RandomString.generate(25)
    })

    const email = new Mail()
    await email.verification({
      email: users?.email,
      code: token.code,
    });

    return response.ok("Please check your email to verified")
  }

  public async register({ request, response }: HttpContextContract) {

    const code = request.input("code");
    const token = await TokenRepository.query()
      .where("code", code)
      .first()


    if (!token) {
      return response.badRequest('Incorrect verification token.');
    }
   
    const client = await ClientRepository.create({
      first_name: request.input('first_name'),
      middle_name: request.input('middle_name'),
      last_name: request.input('last_name'),
      country: request.input('country')
    })
    await client?.save()

    const user = await UserRepository.findBy('code', token?.code)
    await user?.merge({
      profile_id: client.id,
      profile_type: request.input('profile_type'),
      username: request.input('username'),
      password: request.input('password')
    }).save()

    return response.ok('Successful signup')

  }

}
