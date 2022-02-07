import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LanguageRepository from 'App/Repositories/LanguageRepository'
export default class LanguagesController {

  async set({ auth, request, response }: HttpContextContract) {
    const language = request.input([`data`])
    const user = auth.user
    try {
      for (let value of language) {
        const language = await LanguageRepository.create({
          client_id: user?.profile_id,
          level_id: value.level_id,
          language_id: value.language_id
        })
        await language.save();

        return response.ok("Language information successfully saved")
      }
    }
    catch (e) {
      return response.badRequest("Invalid language request")
    }
  }

  async update({ params, request, response }: HttpContextContract) {
    try {
      const language = await LanguageRepository.find(params.Id)
      language.level_id = request.input('level_id'),
        language.language_id = request.input('language_id')
      await language?.save()

      return response.ok('Language successfully updated')

    } catch (e) {
      return response.badRequest("Invalid language request")
    }
  }

  async destroy({ params, response }: HttpContextContract) {
    try {
      const language = await LanguageRepository.findOrFail(params.Id)
      await language.delete()

      return response.ok('Language successfully deleted')

    } catch (e) {
      return response.badRequest("Invalid language request")
    }
  }
}
