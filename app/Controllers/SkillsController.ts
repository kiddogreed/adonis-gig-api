import SkillRepository from 'App/Repositories/SkillRepository'
import SkillTransformer from 'App/Transformers/SkillTransformer'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SkillNameRepository from 'App/Repositories/SkillNameRepository'
import SkillNameTransformer from 'App/Transformers/SkillNameTransformer'
import ProfileStatusRepository from 'App/Repositories/ProfileStatusRepository'

export default class SkillsController {

  async show({ response, transform }) {
    const skill = await SkillNameRepository.all()
    return response.resource(await transform.collection(skill, SkillNameTransformer))
  }

  async index({auth,response,transform}){
    const user = auth.user
    const skill = await SkillRepository.query().where('client_id',user.profile_id)
    return response.resource(await transform.collection(skill,SkillTransformer))
  }

  async set({ auth, request, response }) {
    const user = auth.user
    const data = request.input([`data`])
    try {
      for(let value of data){
        const skill = await SkillRepository.create({
          client_id: user.profile_id,
          skill_id: value.skill_id,
          skill_name: value.skill_name
        });
        await skill.save();
        
        const status = await ProfileStatusRepository.create({
          client_id: user.profile_id,
          section: 'Professional',
          under: 'Skill',
          section_percent: 100,
          section_status: 'Completed',
        })
        await status.save();
      }
      return response.ok('Skill information saved')
    }
    catch (e) {
      return response.badRequest('Invalid Skill Request')
    }
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
