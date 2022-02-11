import { authenticator } from 'otplib';


export default class TwoFactorAuthentication {

  async verify(secret, token) {
    const isValid = authenticator.check(token, secret);

    return isValid
  }

  /**
 * This method is used to generate two factor url.
 */
  async getSecret(email) {
    const secret = authenticator.generateSecret()
    const url = authenticator.keyuri(email, 'DocGig', secret)

    return {
      secret: secret,
      url: url
    }
  }
}
