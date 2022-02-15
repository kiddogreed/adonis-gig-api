import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import SkillRepository from 'App/Repositories/SkillRepository'


export default class SkillNameTransformer extends TransformerAbstract {
  public async transform(skill: SkillRepository) {

    return {
      id: skill.id,
      client_id: skill.client_id,
      level: skill.level,
    }
  }
}
