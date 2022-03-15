import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import UserRepository from 'App/Repositories/UserRepository'


export default class UserTransformer extends TransformerAbstract {
  public async transform(user: UserRepository) {

    return {
      id: user.id,
      profile_type: user.profile_type,
      profile_role: user.profile_role,
      email: user.email,
      username: user.username,
      password: user.password,
      profile_id: user.profile_id
    }
  }
}
