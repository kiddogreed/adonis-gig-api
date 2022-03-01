import Mail from 'App/Services/Mail'
import Env from '@ioc:Adonis/Core/Env';
import axios, { AxiosResponse } from 'axios';
import RandomString from 'App/Services/RandomString'
import UrlShortener from 'App/Services/UrlShortener'
import LeadRepository from 'App/Repositories/LeadRepository';
import UserRepository from 'App/Repositories/UserRepository';
import TokenRepository from 'App/Repositories/TokenRepository';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClientRepository from 'App/Repositories/ClientRepository';
import SignUpValidator from 'App/Validators/SignUpValidator';
import RegisterValidator from 'App/Validators/RegisterValidator';


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

        const clientProfile = await ClientRepository.create({
          "verified": 1,

        })

        await UserRepository.create({
          "email": inputEmail,
          "profile_id": clientProfile.id,
          "password": Env.get('DEFAULT_PASSWORD'),
          
        })

        const newUser = await UserRepository.findBy('email',inputEmail)
        const newToken = await auth.use('api').generate(newUser)

        return response.data({
          'token':  newToken.token,
          'user': {
            'id': newUser?.id,
            'profile_type': newUser?.profile_type, 
            'client_id': newUser?.profile_id,
            'email': newUser?.email,
            'username': newUser?.username, 
        
          }
        }, 'You are now logged in.')


        //----------------------------------------
        // const lead = await LeadRepository.firstOrCreate({ email: inputEmail })
        // const leadToken = await TokenRepository.create({
        //   type: 'DOC REGISTRATION',
        //   code: RandomString.generate(25)
        // })
        
        // const URLShortener = new UrlShortener();
        // const email = new Mail()
       
        // await email.verification({
        //   email: lead.email,
        //   code: leadToken.code,
        //   URL: await URLShortener.generate(Env.get("APP_FRONTEND_URL") + `/signup/verify?email=${lead.email}&code=${leadToken.code}`, 1
        //   ),
        // });
        // return response.data({ 'email': lead?.email }, "Please check your email inbox")
        //--------------------------------------
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

  public async gigToDoc({ auth, request, response}:HttpContextContract){
    const axios = require('axios');
    await request.validate(SignUpValidator)
    const data = request.only([
      "email",
    ])

    await request.validate(RegisterValidator)
    const passwordInput = request.input('password');
    
    try {

      const datas = {
        "email": data.email,
        "password":passwordInput
      }
      
      const config = {
        method:'POST',
        url: `https://stg-api.doconchain.io/auth/gig`,
          headers: { 
            'Content-Type': 'application/json'
                },
             data:datas
      }
  
      const details = await axios(config)
      return response.ok(details.data)
      
    } catch (error) {
      return response.badRequest('Invalid Verified Request')
    }
 
  }
}
