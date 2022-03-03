
import GigRepository from 'App/Repositories/GigRepository'
import GigValidator from 'App/Validators/GigCreateValidator'
import GigTransformer from 'App/Transformers/GigTransformer'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GigCategoryRepository from 'App/Repositories/GigCategoryRepository'
import GigCategoryTransformer from 'App/Transformers/GigCategoryTransformer'
import SubCategorieRepository from 'App/Repositories/SubCategorieRepository'
import SubCategoryTransformer from 'App/Transformers/SubCategoryTransformer'


export default class GigsController {

<<<<<<< HEAD
  async gigCategory( { response, request, transform}) {
=======
  async show({ auth, response, transform }) {
    try {
      const user = auth.user
      const gig = await GigRepository.query().where('client_id', user.profile_id).first()
      return response.resource(await transform.item(gig, GigTransformer))
    } catch (e) {
      return response.badRequest('Invalid Gig Request')
    }
  }

  async gigCategory({ response, request, transform }) {
>>>>>>> 1140887731c10b279b2a51f743d35ffed40c575e
    try {
      const filter = request.only('name')
      const query = GigCategoryRepository.query()
      if (filter.name) {
        query.where('name', 'LIKE', `${filter.name}`)
      }
      const gigCategory = await query.orderByRaw('id')

      return response.resource(await transform.collection(gigCategory, SubCategoryTransformer))

    } catch (e) {
      return response.badRequest('Invalid GigCategory Request')
    }
  }

  async subCategory({ response, request, transform }) {
    try {
      const filter = request.only('name')
      const query = SubCategorieRepository.query()
      if (filter.name) {
        query.where('name', 'LIKE', `${filter.name}`)
      }
      const subCategory = await query.orderByRaw('id')

      return response.resource(await transform.collection(subCategory, GigCategoryTransformer))

    } catch (e) {
      return response.badRequest('Invalid SubCategory Request')
    }
  }

  async set({ auth, response, request }: HttpContextContract) {
    await request.validate(GigValidator)
    const user = auth.user
    try {
      const gig = await GigRepository.create({
        client_id: user.profile_id,
        name: request.input('title'),
        category_id: request.input('category_id'),
        subcategory_id: request.input('subcategory_id'),
        tag: request.input('tag')
      })
      await gig.save()
      return response.ok('Gig information successfully created')

    } catch (e) {
      return response.badRequest('Invalid Gig Request')
    }
  }

  async update({request,params,response}){
    const data = request.only(['title', 'category_id', 'subcategory_id', 'tag'])
    try{
      const gig = await GigRepository.findBy('id',params.Id)
      gig.name = data.title,
      gig.category_id = data.category_id,
      gig.subcategory_id = data.subcategory_id,
      gig.tag = data.tag
      await gig?.save()

      return response.ok('Gig information successfully updated')
    }catch(e){
      return response.badRequest('Invalid Gig Request')
    }
  }
}
