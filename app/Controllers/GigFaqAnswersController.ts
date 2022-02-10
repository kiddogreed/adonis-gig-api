import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GigFaqAnswerRepository from 'App/Repositories/GigFaqAnswerRepository'

export default class GigFaqAnswersController {

    async set({auth,request,response}:HttpContextContract){
       const user = auth.user
       const FaqAnswer = await GigFaqAnswerRepository.create({
           client_id : user.profile_id,
           
       })
    }

}
