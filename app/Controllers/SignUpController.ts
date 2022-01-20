import Response from 'App/Helpers/Response'
import UserRepository from 'App/Repositories/UserRepository'
import ClientRepository from 'App/Repositories/ClientRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignUpController {

	public async store({ request, response }: HttpContextContract) {
		const apiResponse = new Response(response)
		const data = request.only([
			"email",
			"username",
			"password",
			"first_name",
			"middle_name",
			"last_name",
		])

		const user = await UserRepository.query()
			.where("email", data.email)
			.first()

		if (user) {
			return apiResponse.unableToProcess("Email already taken")
		}

		const clients = new ClientRepository()
		clients.first_name = data.first_name,
			clients.middle_name = data.middle_name,
			clients.last_name = data.last_name,
			await clients.save()

		const users = new UserRepository()
		users.username = data.username,
			users.email = data.email,
			users.password = data.password,
			users.profile_id = clients.id,
			await users.save()


		return apiResponse.ok("Signup Successfully")
	}

}
