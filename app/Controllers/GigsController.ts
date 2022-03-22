
import TagRepository from 'App/Repositories/TagRepository'
import GigRepository from 'App/Repositories/GigRepository'
import GigTransformer from 'App/Transformers/GigTransformer'
import GigTagRepository from 'App/Repositories/GigTagRepository'
import GigListTransformer from 'App/Transformers/GigListTransformer'
import GigCategoryRepository from 'App/Repositories/GigCategoryRepository'
import GigCategoryTransformer from 'App/Transformers/GigCategoryTransformer'
import SubCategorieRepository from 'App/Repositories/SubCategorieRepository'
import SubCategoryTransformer from 'App/Transformers/SubCategoryTransformer'

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
    const user = auth.user
    const data = request.input(['tag'])
    try {
      const gig = await GigRepository.create({
        client_id: user.profile_id,
        name: request.input('title'),
        category_id: request.input('category_id'),
        subcategory_id: request.input('subcategory_id'),
        status: 'draft'
      })
      await gig.save()

      for (let tag of data) {
        let existingTag = await TagRepository.findBy('name', tag)
        if (!existingTag) {
          const tags = await TagRepository.create({
            name: tag
          })
          await tags.save()

          const gigTag = await GigTagRepository.firstOrCreate({
            gigs_id: gig.id,
            tag_id: tags.id
          })
          await gigTag.save()
        }
        if (existingTag) {
          const gigs = await GigTagRepository.firstOrCreate({
            gigs_id: gig.id,
            tag_id: existingTag.id
          })
          await gigs.save()
        }
      }
      return response.data({ 'id': gig.id }, 'Gig information successfully created')

    } catch (e) {
      console.log(e)
      return response.badRequest('Invalid Gig Request')
    }
  }

  async update({ request, params, response }) {
    try {
      const gig = await GigRepository.findBy('id', params.id)
      gig.name = request.input('title')
      gig.category_id = request.input('category_id')
      gig.subcategory_id = request.input('subcategory_id')
      await gig?.save()

      let description = request.input('description')
      if (description) {
        const desc = await GigRepository.findBy('id',params.id)
        desc.description = request.input('description')
        await desc?.save()
        return response.data({ 'id': gig?.id }, 'Gig Description successfully created')
      }
      return response.data({ 'id': gig?.id }, 'Gig information successfully updated')

    } catch (e) {
      console.log(e)
      return response.badRequest('Invalid Gig Request')
    }
  }
  async gigList({ auth, response, transform }) {
    const user = auth.user
    const gigs = await GigRepository.query().where('client_id', user.profile_id)
    return response.resource(await transform.collection(gigs, GigListTransformer))
  }

  async allGigList({ response, transform }) {
    const gigs = await GigRepository.all()
    return response.resource(await transform.collection(gigs, GigListTransformer))
  }
}
