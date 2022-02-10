import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LinkAcccountRepository from 'App/Repositories/LinkAccountRepository'

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

  async facebook({ response }: HttpContextContract) {
    return response.send('<a href="/facebook/redirect"> Login with facebook </a>')
  }

  async redirect({ ally }) {
    return ally.use('facebook').redirect((request) => {
      request.scopes(['email'])
    })
  }

  async callback({ ally }) {
    try {
      const facebook = ally.use('facebook')
      console.log(facebook,'fb')
      if (facebook.accessDenied()) {
        return 'Access was denied'
      }

      if (facebook.stateMisMatch()) {
      
        return 'Request expired. Retry again'
      }

      if (facebook.hasError()) {
        return facebook.getError()
      }

      const user = await facebook.user()
      return user
    } catch (error) {
      console.log({ error: error.response })
      throw error
    }
  }
}
