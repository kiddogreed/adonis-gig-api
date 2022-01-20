import Response from 'App/Helpers/Response'
import CategoriesRepository from 'App/Repositories/CategorieRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriesController {

	public async index({ response, request }: HttpContextContract) {
		const apiResponse = new Response(response)
		const meta = request.only(["page", "per_page"]);
		const filters = request.only([
			"name",
		]);
		const query = CategoriesRepository.query()
		if (filters.name) {
			query.where('name', 'LIKE', `${filters.name}%`)
		}
		const categories = await query.orderBy('id', 'desc')
			.paginate(meta.page, meta.per_page);

		return apiResponse.data(categories)
	}

	public async set({ response, request }: HttpContextContract) {
		const apiResponse = new Response(response)
		const data = request.only([
			"name",
			"logo",
			"banner"
		])

		const categories = new CategoriesRepository()
		categories.name = data.name,
			categories.logo = data.logo,
			categories.banner = data.banner
		await categories.save()

		return apiResponse.ok("Categories was successfully created")
	}

	public async update({ response, request, params }: HttpContextContract) {
		const apiResponse = new Response(response)
		const data = request.only([
			"name",
			"logo",
			"banner"
		]);

		const categories = await CategoriesRepository.find(params.id)
		categories?.merge(data)
		await categories?.save()
		return apiResponse.ok("Categories was successfully updated!");

	}
}
