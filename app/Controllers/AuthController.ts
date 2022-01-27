import { DateTime } from "luxon"
import Response from 'App/Helpers/Response'
import UserRepository from 'App/Repositories/UserRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

	public async login({request, response }: HttpContextContract) {
		const apiResponse = new Response(response)
		const data = request.only([
			"email",
			"password"
		])
		try {
			const user = await UserRepository.query()
				.where("email", data.email)
				.orWhere("username", data.email)
				.first()
			

			if (!user) {
				return apiResponse.notFound(
					"Invalid email/username or password"
				);
			}

			user.logged_in_at = DateTime.now()
			await user.save();

		//	const token = await auth.use('api').generate(user)
			const responseData = {
				id: user.id,
				profile_type: user.profile_type,
				client_id: user.profile_id,
		//		token: token.token
			}

			return apiResponse.data(responseData, "Login successfully.")
		}
		catch (error) {
			return apiResponse.badRequest("Invalid email/username or password")
		}
	}

}
