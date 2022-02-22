import Mail from 'App/Services/Mail'
import Env from '@ioc:Adonis/Core/Env';
import axios, { AxiosResponse } from 'axios';
import RandomString from 'App/Services/RandomString'
import UrlShortener from 'App/Services/UrlShortener'
import LeadRepository from 'App/Repositories/LeadRepository';
import UserRepository from 'App/Repositories/UserRepository';
import TokenRepository from 'App/Repositories/TokenRepository';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class AuthFacebooksController {
  public async login({ auth, request, response}:HttpContextContract){

    const authToken = request.input('auth_token');

    try {
      const result: AxiosResponse = await axios.post(`${Env.get('DOC_API_URL')}/validate`, {}, {
        headers: {
          'api-auth-key': Env.get('DOC_API_KEY'),
          'authorization': `bearer ${authToken}`
        }
      });

      const inputEmail = result.data.data.email
      const user = await UserRepository.findBy('email', inputEmail)

      if(!user){

        const lead = await LeadRepository.firstOrCreate({ email: inputEmail })
        const leadToken = await TokenRepository.create({
          type: 'DOC REGISTRATION',
          code: RandomString.generate(25)
        })
        
        const URLShortener = new UrlShortener();
        const email = new Mail()
        let testmail = await URLShortener.generate(Env.get("APP_FRONTEND_URL") + `/signup/verify?email=${lead.email}&code=${leadToken.code}`,1)
        await email.verification({
          email: lead.email,
          code: leadToken.code,
          URL: testmail,
        });

        
      return response.data({ 'email': lead?.email }, "Please check your email inbox")
      }

      const token = await auth.use('api').generate(user)
        
      return response.data({
        'token':  token.token,
        'user': {
          'id': user?.id,
          'profile_type': user?.profile_type, 
          'client_id': user?.profile_id,
          'email': user?.email,
          'username': user?.username, 
      
        }
      }, 'You are now logged in.')

 
} catch (e) {

  console.log(e.message);
  return response.unauthorized('Token expired or is invalid!')
    }

  }
}
