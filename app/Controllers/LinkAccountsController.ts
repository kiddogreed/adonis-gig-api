import LinkAcccountRepository from 'App/Repositories/LinkAccountRepository'
import LinkAccountTransformer from 'App/Transformers/LinkAccountTransformer'
import ProfileStatusRepository from 'App/Repositories/ProfileStatusRepository'
import ClientRepository from 'App/Repositories/ClientRepository'

export default class LinkAccountsController {

  async show({auth,response,transform}){
    const user = auth.user
    try {
      const account = await LinkAcccountRepository.query().where('client_id', user.profile_id)
      return response.resource(await transform.collection(account, LinkAccountTransformer))
    } catch (e) {
      return response.badRequest("Invalid Account request")
    }
  }

  async set({ auth, params, response }) {
    const user = auth.user
    const account = await LinkAcccountRepository.find(params.Id)
    account.client_id = user.profile_id
    await account?.save()

    const status = await ProfileStatusRepository.create({
      client_id: user.profile_id,
      section: 'LinkedAccount',
      section_percent: 100,
      section_status: 'Completed',
    })
    await status.save();

    const client = await ClientRepository.findBy('id', user?.profile_id)
    client.profile_status = 'inProgress-accountSecurity'
    await client?.save()

    return response.ok("Your account successfully connected")
  }

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
      verified: connectionUser.emailVerificationState === 'verified',
      presence_name: 'google'
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
      verified: connectionUser.emailVerificationState === 'verified',
      presence_name: 'github'
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
      verified: connectionUser.emailVerificationState === 'verified',
      presence_name: 'twitter'
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
      verified: connectionUser.emailVerificationState === 'verified',
      presence_name: 'stackoverflow'
    })
    await auth.use('api').login(user)
  }

}