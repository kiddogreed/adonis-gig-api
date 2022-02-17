
import LinkAcccountRepository from 'App/Repositories/LinkAccountRepository'

export default class LinkAccountsController {

  async social({ ally, params }) {
    return ally.use(params.social).redirect()
  }

  async google({ ally, auth }) {
    const connection = ally.use('google')
    const connectionUser = await connection.user()

    const user = await LinkAcccountRepository.firstOrCreate({
      email: connectionUser.email,
    }, {
      name: connectionUser.name,
      token: connectionUser.token.token,
      verified: connectionUser.emailVerificationState === 'verified'
    })
    await auth.use('api').login(user)
  }

  async github({ ally, auth }) {
    const connection = ally.use('github')
    const connectionUser = await connection.user()

    const user = await LinkAcccountRepository.firstOrCreate({
      email: connectionUser.email,
    }, {
      name: connectionUser.name,
      token: connectionUser.token.token,
      verified: connectionUser.emailVerificationState === 'verified'
    })

    await auth.use('api').login(user)
  }

  async twitter({ ally, auth }) {
    const connection = ally.use('twitter')
    const connectionUser = await connection.user()

    const user = await LinkAcccountRepository.firstOrCreate({
      email: connectionUser.email,
    }, {
      name: connectionUser.name,
      token: connectionUser.token.token,
      verified: connectionUser.emailVerificationState === 'verified'
    })
    await auth.use('api').login(user)
  }

  async stackoverflow({ ally, auth }) {
    const connection = ally.use('stackoverflow')
    const connectionUser = await connection.user()

    const user = await LinkAcccountRepository.firstOrCreate({
      email: connectionUser.email,
    }, {
      name: connectionUser.name,
      token: connectionUser.token.token,
      verified: connectionUser.emailVerificationState === 'verified'
    })
    await auth.use('api').login(user)
  }

}