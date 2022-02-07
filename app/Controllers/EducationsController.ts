import EducationRepository from "App/Repositories/EducationRepository"
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EducationsController {

	async update({ request, response, params }: HttpContextContract) {
		try {
			const education = await EducationRepository.findByOrFail('id', params.Id)
			education.country = request.input('country')
			education.school = request.input('school')
			education.degree = request.input('degree')
			education.year_graduated = request.input('year_graduated')
			await education?.save()

			return response.ok('Education information saved')

		} catch (e) {
			return response.badRequest('Invalid Education Request')
		}
	}

	async destroy({ response, params }: HttpContextContract) {
		try {
			const education = await EducationRepository.findByOrFail('id', params.Id)
			await education.delete()
			
			return response.ok('Education information deleted')
		
		} catch (e) {
			return response.badRequest('Invalid Education Request')
		}
	}
}
