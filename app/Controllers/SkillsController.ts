import SkillRepository from 'App/Repositories/SkillRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SkillNameRepository from 'App/Repositories/SkillNameRepository'
import SkillNameTransformer from 'App/Transformers/SkillNameTransformer'


export default class SkillsController {

  async show({ response, transform }: HttpContextContract) {
    const skill = await SkillNameRepository.all()
    return response.resource(await transform.collection(skill, SkillNameTransformer))
  }

  async update({ request, response, params }: HttpContextContract) {
    try {
      const skill = await SkillRepository.findByOrFail('id', params.Id)
      skill.skill_id = request.input('skill_id')
      skill.level = request.input('level')
      await skill?.save()

      return response.ok('Skill information saved')

    } catch (e) {
      return response.badRequest('Invalid Skill Request')
    }
  }

  async destroy({ response, params }: HttpContextContract) {
    try {
      const skill = await SkillRepository.findByOrFail('id', params.Id)
      await skill.delete()

      return response.ok('Skill information deleted')

    } catch (e) {
      return response.badRequest('Invalid Skill Request')
    }
  }
}
