import ScholarRepository from "App/Repositories/ScholarRepository";
import MyScholarTransformer from "App/Transformers/MyScholarTransformer";
import UserTransformer from "App/Transformers/UserTransformer";
import UserRepository from "App/Repositories/UserRepository";

export default class ScholarsController {

  async index({ auth, response, request, transform }) {

    const user = auth.user
    if (request.input('filter') == 'Manager') {
      const myScholar = await ScholarRepository.query().where('manager_id', user.id)
      return response.resource(await transform.collection(myScholar, MyScholarTransformer))
    }
    if (request.input('filter') == 'Scholar') {
      const scholar = await UserRepository.query().where('profile_role', 'Scholar')
      return response.resource(await transform.collection(scholar, UserTransformer))
    }
  }
}
