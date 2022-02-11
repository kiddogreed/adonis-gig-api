import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigRequirement from 'App/Repositories/GigRequirementRepository'
import GigMultipleRequirement from 'App/Repositories/GigMultipleChoiceRepository'



export default class GigRequirementTransformer extends TransformerAbstract {
  public async transform(requirement: GigRequirement) {
    const choice = await GigMultipleRequirement.query().where('requirement_id', requirement.id)
    return {
      id: requirement.id,
      client_id: requirement.client_id,
      question: requirement.question,
      choice: choice
    }
  }
}
