import ProfileStatusRepository from 'App/Repositories/ProfileStatusRepository'
import ProfileStatusTransformer from 'App/Transformers/ProfileStatusTransformer'

export default class ProfileStatusesController {

  async show({ auth, request, response, transform }) {
    const user = auth.user
    const status = await ProfileStatusRepository.query().where('section', request.input('section')).where('client_id', user.profile_id).first()
    return response.resource(await transform.item(status, ProfileStatusTransformer))
  }
}
