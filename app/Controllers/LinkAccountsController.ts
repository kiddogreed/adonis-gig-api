
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LinkAcccountRepository from 'App/Repositories/LinkAccountRepository'
import LinkAccountRepository from 'App/Repositories/LinkAccountRepository'

export default class LinkAccountsController {

  async index({ auth, response }: HttpContextContract) {
    const user = auth.user
    try {
      const linkAccount = await LinkAcccountRepository.findBy('client_id', user?.profile_id)
      console.log(linkAccount?.email)

      return response.data(linkAccount)

    } catch (e) {
      console.log(e)
      return response.badRequest('Invalid Linked Request')
    }
  }

  async set({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    try {
      const linkAccount = await LinkAcccountRepository.create({
        client_id: user.profile_id,
        email: request.input('email'),
        presence_name: request.input('presence_name'),
      });
      await linkAccount.save();
      return response.ok('Linked account successfully saved')
    } catch (e) {
      return response.badRequest('Invalid Linked Request')
    }
  }

  async redirect({ ally }) {
    return ally.use('github').redirect()
  }

  // async callback({ ally }) {
  //   const github = ally.use('github')
  //   console.log(github,'sample')
  //   /**
  //    * User has explicitly denied the login request
  //    */
  //   if (github.accessDenied()) {
  //     return 'Access was denied'
  //   }

  //   /**
  //    * Unable to verify the CSRF state
  //    */
  //   if (github.stateMisMatch()) {
  //     return 'Request expired. Retry again'
  //   }

  //   if (github.hasError()) {
  //     return github.getError()
  //   }

  //   const user = await github.user()
  //   console.log(user,'user')
  // }

  async callback({ ally }) {
    const github = ally.use('github')

    /**
     * Managing error states here
     */

    const githubUser = await github.user()

    console.log(githubUser.email,'here')

    /**
     * Find the user by email or create
     * a new one
     */
    // const link = await LinkAccountRepository.firstOrCreate({
    //   email: githubUser.email,
    // }, {
    //   name: githubUser.name,
    //   token: githubUser.token.token,
    //   verified: githubUser.emailVerificationState === 'verified'
    // })

    // /**
    //  * Login user using the web guard
    //  */
    // await auth.use('api').login(user)
  }


}
