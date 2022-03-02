import GigRepository from "App/Repositories/GigRepository"
import GigManagePostTransformer from "App/Transformers/GigManagePostTransformer"

export default class GigManagePostsController {

  async show({ auth, response, transform }) {
    const user = auth.user
    const postGig = await GigRepository.findBy('client_id', user.profile_id)
    return response.resource(await transform.item(postGig, GigManagePostTransformer))
  }


}
