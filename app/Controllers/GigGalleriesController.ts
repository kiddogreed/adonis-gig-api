import GigGallerieRepository from "App/Repositories/GigGallerieRepository"
export default class GigGalleriesController {

  async set({ auth, request, response }) {
    const user = auth.user
    const data = request.input([`data`])
    
    try {
      for (let value of data) {
        const gallery = await GigGallerieRepository.create({
          client_id: user.profile_id,
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

}
