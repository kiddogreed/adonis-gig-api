import ClientRepository from 'App/Repositories/ClientRepository'
import LinkAcccountRepository from 'App/Repositories/LinkAccountRepository'
import LinkAccountTransformer from 'App/Transformers/LinkAccountTransformer'
import ProfileStatusRepository from 'App/Repositories/ProfileStatusRepository'
export default class LinkAccountsController {

  async show({ auth, response, transform }) {
    const user = auth.user
    try {
      const account = await LinkAcccountRepository.query().where('client_id', user.profile_id)
      return response.resource(await transform.collection(account, LinkAccountTransformer))
    } catch (e) {
      return response.badRequest("Invalid Account request")
    }
  }

  async draft({ auth, response }) {
    const user = auth.user
    const client = await ClientRepository.findBy('id', user?.profile_id)
    client.profile_status = 'inProgress-linkedAccounts'
    await client?.save()
    return response.ok("Linked account information successfully saved into draft")
  }

  async set({ auth,request, response }) {
    const user = auth.user
    const account = await LinkAcccountRepository.create({
      client_id : user.profile_id,
      email : request.input('email'),
      name: request.input('name'),
      presence_name: request.input('social'),
      token: request.input('token'),
      verified: true
    })
    await account.save()
    return response.ok("Your account successfully connected")
  }

  // async social({ ally }) {
  //   return ally.use('google').redirect()
  // }

  // async google({ ally ,response}) {
  //   const connection = ally.use('google')
  //   const connectionUser = await connection.user()

  //     const name = connectionUser.name
  //     const token = connectionUser.token.token
  //     const  verified = connectionUser.emailVerificationState === 'verified'
 
  //   const link = `${Env.get('APP_FRONTEND_URL')}/profile/link?name=${name}&token=${token}&verified=${verified}&presence_name=google`
  //   return response.redirect().toPath(link)
   
  // }


}