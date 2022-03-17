import GigTagRepository from "App/Repositories/GigTagRepository";

// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TagsController {

    async destroy({response,params}){
        const gigs = await GigTagRepository.findBy('id',params.id)
        await gigs?.delete()
        return response.ok('Tag deleted')
    }
    
}
