import GigGallerieRepository from "App/Repositories/GigGallerieRepository"
import GigGalleryTransformer from "App/Transformers/GigGalleryTransformer"
export default class GigGalleriesController {


  async show({ params, response, transform }) {
    try {
      const gallery = await GigGallerieRepository.query().where('gig_id', params.gigId)
      return response.resource(await transform.collection(gallery, GigGalleryTransformer))
    } catch (e) {
      console.log(e)
      return response.badRequest('Invalid file Request')
    }
  }

  async set({ auth, request, response }) {
    const user = auth.user
    const data = request.input([`data`])
    
    try {
      for (let value of data) {
        const gallery = await GigGallerieRepository.create({
          client_id: user.profile_id,
          gig_id: value.gig_id,
          type: value.type,
          files: value.files
        })
        await gallery.save()
      }
      return response.ok('Gallery Successfully created')
    } catch (e) {
      return response.badRequest('Invalid file Request')
    }
  }

  async update({ params, request, response }) {
    const data = request.input([`data`])
    try {
      for (let value of data) {
        const gallery = await GigGallerieRepository.find(params.id)
        gallery.type = value.type,
          gallery.files = value.files,
          await gallery?.save()
      }
      return response.ok('Gallery Successfully updated')

    } catch (e) {
      return response.badRequest('Invalid file Request')
    }
  }

}
