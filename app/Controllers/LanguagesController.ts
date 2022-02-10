import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LanguageRepository from 'App/Repositories/LanguageRepository'
import LanguageTransformer from 'App/Transformers/LanguageTransformer'
import LanguageNameRepository from 'App/Repositories/LanguageNameRepository'
import LanguageNameTransformer from 'App/Transformers/LanguageNameTransformer'
import LanguageLevelRepository from 'App/Repositories/LanguageLevelRepository'
import LanguageLevelTransformer from 'App/Transformers/LanguageLevelTransformer'
export default class LanguagesController {

  async show({ auth, transform, response }: HttpContextContract) {
    const user = auth.user
    try {
      const language = await LanguageRepository.query().where('client_id', user.profile_id)
      return response.resource(await transform.collection(language, LanguageTransformer))
    } catch (e) {
      return response.badRequest("Invalid language request")
    }
  }

  async languageName({ transform, response }: HttpContextContract) {
    try {
      const language = await LanguageNameRepository.all()
      return response.resource(await transform.collection(language, LanguageNameTransformer))
    } catch (e) {
      return response.badRequest("Invalid language request")
    }
  }

  async languageLevel({ transform, response }: HttpContextContract) {
    try {
      const language = await LanguageLevelRepository.all()
      return response.resource(await transform.collection(language, LanguageLevelTransformer))
    } catch (e) {
      return response.badRequest("Invalid language request")
    }
  }

  async set({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    try {
      const language = await LanguageRepository.create({
        client_id: user?.profile_id,
        level_id: request.input('level_id'),
        language_id: request.input('language_id')
      })
      await language.save();

      return response.ok("Language information successfully saved")
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
