import UserRepository from 'App/Repositories/UserRepository'

export default class ScholarsController {

  
  async index({ response }) {
    const client = await UserRepository.query().where('profile_role', 'Scholar')
    return response.data(client)
  }
  
}
