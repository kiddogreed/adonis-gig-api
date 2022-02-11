import UserRepository from 'App/Repositories/UserRepository';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TwoFactorAuthentication from 'App/Services/TwoFactorAuthentication'
import VerifyTwoFactorAuth from 'App/Validators/VerifyTwoFactorAuth'

export default class TwoFactorAuthenticationsController {

  async authenticate({ request, response, auth }) {
    const email = request.input('email');
    const token = request.input('token');

    try {
      const user = await UserRepository.findBy('email', email);
      const twoFa = new TwoFactorAuthentication();
      const verification = await twoFa.verify(user?.two_factor_secret, token);

      if (!verification) {
        return response.badRequest('Invalid token');
      }

      const accessToken = await auth.use('api').generate(user);

      return response.data({
        'token': accessToken.token,
        'user': {
          'id': user?.id,
          'profile_type': user?.profile_type,
          'client_id': user?.profile_id,
          'email': user?.email,
          'username': user?.username
        }
      }, 'You are now logged in.')
    } catch (e) {
      return response.badRequest('Invalid Access')
    }
  }


  async verify({ auth, request, response }) {
    await request.validate(VerifyTwoFactorAuth)

    const token = request.input("token");
    const twoFa = new TwoFactorAuthentication();
    const user = auth.user
    const verification = await twoFa.verify(user.two_factor_secret, token);

    if (!verification) {
      return response.badRequest("Invalid token");
    }

    user.two_factor_auth = 1;
    await user.save();

    return response.data(
      user.two_factor_auth,
      "Two factor authentication enabled successfully"
    );
  }

  async enable({ auth, response }: HttpContextContract) {
    const user = auth.user
    const twoFa = new TwoFactorAuthentication();
    const twoFaData = await twoFa.getSecret(user.email);
    user.two_factor_secret = twoFaData.secret;
    await user.save();
    const data = {
      secret: twoFaData.secret,
      url: twoFaData.url,
    };

    return response.data(
      data,
      "Two factor secret created successfuly!"
    );
  }

  async disable({ auth, response, }: HttpContextContract) {
    const user = auth.user
    user.two_factor_auth = 0;
    user.two_factor_secret = null;
    await user.save();

    return response.ok(
      "Two factor authentication disabled successfully"
    );
  }

}
