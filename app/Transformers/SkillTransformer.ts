import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import SkillRepository from 'App/Repositories/SkillRepository'


export default class SkillNameTransformer extends TransformerAbstract {
  public async transform(skill: SkillRepository) {

    return {
      id: skill.id,
      client_id: skill.client_id,
      skill_id: skill.skill_id,
      skill_name: skill.skill_name
    }
  }
}
