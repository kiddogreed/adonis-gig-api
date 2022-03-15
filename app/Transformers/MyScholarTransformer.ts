
import ScholarRepository from 'App/Repositories/ScholarRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import UserRepository from 'App/Repositories/UserRepository'


export default class MyScholarTransformer extends TransformerAbstract {
  public async transform(manager: ScholarRepository) {
    const scholar = await UserRepository.query().where('id', manager.scholar_id)

    return {
      manager_id: manager.manager_id,
       scholar : scholar
    }
  }
}
