
import GigRepository from 'App/Repositories/GigRepository'
import GigValidator from 'App/Validators/GigCreateValidator'
import GigTransformer from 'App/Transformers/GigTransformer'
import GigCategoryRepository from 'App/Repositories/GigCategoryRepository'
import GigCategoryTransformer from 'App/Transformers/GigCategoryTransformer'
import SubCategorieRepository from 'App/Repositories/SubCategorieRepository'
import SubCategoryTransformer from 'App/Transformers/SubCategoryTransformer'
import TagRepository from 'App/Repositories/TagRepository'
import GigListTransformer from 'App/Transformers/GigListTransformer'
import GigTagRepository from 'App/Repositories/GigTagRepository'

export default class GigsController {


  async show({ params, response, transform }) {
    try {
      const gig = await GigRepository.findBy('id', params.id)
      return response.resource(await transform.item(gig, GigTransformer))
    } catch (e) {
      return response.badRequest('Invalid Gig Request')
    }
  }

  async gigCategory({ response, request, transform }) {
    try {
      const filter = request.only('name')
      console.log(filter.name, 'here')
      const query = GigCategoryRepository.query()
      if (filter.name) {
        query.where('name', 'LIKE', `${filter.name}`)
      }
      const gigCategory = await query.orderByRaw('id')

      return response.resource(await transform.collection(gigCategory, GigCategoryTransformer))

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

      return response.resource(await transform.collection(subCategory, SubCategoryTransformer))

    } catch (e) {
      return response.badRequest('Invalid SubCategory Request')
    }
  }

  async set({ auth, response, request }) {
    await request.validate(GigValidator)
    const user = auth.user
    const data = request.input([`tag`])
    // try {

      const gig = await GigRepository.create({
        client_id: user.profile_id,
        name: request.input('title'),
        category_id: request.input('category_id'),
        subcategory_id: request.input('subcategory_id'),
        status: 'draft'
      })
      await gig.save()

      for (let tag of data) {
        const existTag = await TagRepository.findByOrFail('name', tag.tag)
        console.log(existTag?.name)
        if (!existTag?.name) {
          //create new tag

          const tags = await TagRepository.create({
            name: tag.tag
          })
          await tags.save()
          //create gigtag
          const gigTag = await GigTagRepository.create({
            gig_id: gig.id,
            tag_id: tags.$original.id
          })
          await gigTag.save()
        }
        if (existTag) {
          const existingTag = await GigTagRepository.create({
            gig_id: gig.id,
            tag_id: existTag?.$original.id
          })
          await existingTag.save()
        }
      }

      return response.data({ 'id': gig.id }, 'Gig information successfully created')

    // } catch (e) {
    //   return response.badRequest('Invalid Gig Request')
    // }
  }

  async update({ request, params, response }) {
    const data = request.only(['title', 'category_id', 'subcategory_id', 'tag', 'description'])
    try {
      const gig = await GigRepository.findBy('id', params.id)
      gig.name = data.title,
        gig.category_id = data.category_id,
        gig.subcategory_id = data.subcategory_id,
        gig.tag = data.tag,
        gig.description = data.description
      await gig?.save()

      if (data.description) {
        return response.data({ 'id': gig?.id }, 'Gig Description successfully created')
      }
      return response.data({ 'id': gig?.id }, 'Gig information successfully updated')

    } catch (e) {
      return response.badRequest('Invalid Gig Request')
    }
  }

  public async gigList({ auth, request, response, transform }) {
    const user = auth.user
    try {
      const gigs = await GigRepository.query().where('client_id', user.profile_id)
      var gigResponse = await transform.collection(gigs, GigListTransformer)
      return response.resource(gigResponse)
    }
    catch (error) {
      return response.badRequest('Invalid Request: ' + error)
    }
  }
}
