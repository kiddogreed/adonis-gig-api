import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SkillNameRepository from 'App/Repositories/SkillNameRepository'
import SkillNameTransformer from 'App/Transformers/SkillNameTransformer'

export default class SkillsController {

  async show({ response, transform }: HttpContextContract) {
    const skill = await SkillNameRepository.all()
    return response.resource(await transform.collection(skill, SkillNameTransformer))
  }

}
