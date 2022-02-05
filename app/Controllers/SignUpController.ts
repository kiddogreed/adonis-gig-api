import Env from '@ioc:Adonis/Core/Env'
import Mail from 'App/Services/Mail'
import UrlShortener from 'App/Services/UrlShortener'
import RandomString from 'App/Services/RandomString'
import LeadRepository from 'App/Repositories/LeadRepository'
import UserRepository from 'App/Repositories/UserRepository'
import TokenRepository from 'App/Repositories/TokenRepository'
import SignUpValidator from 'App/Validators/SignUpValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientRepository from 'App/Repositories/ClientRepository'

export default class SignUpController {

  public async signup({ request, response }: HttpContextContract) {
    await request.validate(SignUpValidator)
    const data = request.only([
      "email",
    ])
    const emails = await UserRepository.query()
      .where("email", data.email)
      .first()

    if (emails) {
      return response.badRequest("Email already taken")
    }

    const lead = await LeadRepository.firstOrCreate({ email: data.email })

    const token = await TokenRepository.create({
      type: 'REGISTRATION',
      code: RandomString.generate(25)
    })
    const URLShortener = new UrlShortener();
    const email = new Mail()
    await email.verification({
      email: lead.email,
      code: token.code,
      URL: await URLShortener.generate(Env.get("APP_FRONTEND_URL") + `/signup/verify?email=${lead.email}?token=${token.code}`,1
      ),
    });

    return response.ok("Please check your email to verified")
  }

  public async register({ request, response }: HttpContextContract) {
    await request.validate(RegisterValidator)
    const code = request.input("code");
    const email = request.input("email");
    try {
      const token = await TokenRepository.query()
        .where("revoked", 0)
        .where("code", code)
        .first()

      if (!token) {
        return response.badRequest('Incorrect verification token.');
      }

      const client = await ClientRepository.create({
        verified: 1
      })
      await client?.save()

      const user = await UserRepository.create({
        email: email,
        username: request.input('username'),
        password: request.input('password'),
        profile_id: client.id,
      })
      await user?.save()

      token.revoked = true;
      token.user_id = user.id;
      token.save();

      return response.data({
        'token': token?.code,
        'email': user.email,
        'password': user.password,
      }, 'Login Successfully')
    } catch (e) {
      return response.badRequest('Invalid Verified Request')
    }
  }
}
