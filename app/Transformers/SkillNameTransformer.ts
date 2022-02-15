import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import SkillName from 'App/Repositories/SkillNameRepository'


export default class SkillNameTransformer extends TransformerAbstract {
  public async transform(skill: SkillName) {

    return {
      id: skill.id,
      name: skill.name,
    }
  }
}
