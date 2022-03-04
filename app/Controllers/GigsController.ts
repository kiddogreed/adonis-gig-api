
import GigRepository from 'App/Repositories/GigRepository'
import GigValidator from 'App/Validators/GigCreateValidator'
import GigTransformer from 'App/Transformers/GigTransformer'
import GigCategoryRepository from 'App/Repositories/GigCategoryRepository'
import GigCategoryTransformer from 'App/Transformers/GigCategoryTransformer'
import SubCategorieRepository from 'App/Repositories/SubCategorieRepository'
import SubCategoryTransformer from 'App/Transformers/SubCategoryTransformer'


export default class GigsController {


  async show({ params, response, transform }) {
    try {
      const gig = await GigRepository.findBy('id',params.id)
      return response.resource(await transform.item(gig, GigTransformer))
    } catch (e) {
      return response.badRequest('Invalid Gig Request')
    }
  }

  async gigCategory({ response, request, transform }) {
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

  async set({ auth, response, request }) {
    await request.validate(GigValidator)
    const user = auth.user
    try {
      const gig = await GigRepository.create({
        client_id: user.profile_id,
        name: request.input('title'),
        category_id: request.input('category_id'),
        subcategory_id: request.input('subcategory_id'),
        tag: request.input('tag'),
        status: 'draft'
      })
      await gig.save()
      return response.data({ 'id': gig.id }, 'Gig information successfully created')

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
