import { DateTime } from "luxon"
import Response from 'App/Helpers/Response'
import AuthValidator from 'App/Validators/AuthValidator'
import UserRepository from 'App/Repositories/UserRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

	public async login({ request, response, }: HttpContextContract) {
		await request.validate(AuthValidator)

		const apiResponse = new Response(response)
		const data = request.only([
			"email",
			"password"
		])
		try {

			const user = await UserRepository.query()
				.where("email", data.email)
				.first()

			if (!user) {
				return apiResponse.notFound(
					"Invalid email or password"
				);
			}

			user.logged_in_at = DateTime.now()
			await user.save();

			const responseData = {
				id: user.id,
				client_id: user.profile_id,
			}

			return apiResponse.data(responseData, "Login successfully.")
		}
		catch (error) {
			return apiResponse.badRequest("Invalid email or password.")
		}
	}

}
