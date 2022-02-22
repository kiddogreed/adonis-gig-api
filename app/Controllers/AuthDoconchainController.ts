import Env from '@ioc:Adonis/Core/Env';
import axios, { AxiosResponse } from 'axios';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserRepository from 'App/Repositories/UserRepository';
import ClientRepository from 'App/Repositories/ClientRepository';



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
    
      const user = await UserRepository.findBy('email', inputEmail)
        if(!user){

          const clientProfile = await ClientRepository.create({
            verified: 1,
          })

        await UserRepository.create({
         email : inputEmail,
         profile_id: clientProfile.id,
         password: inputPass
    
        })
        const newUser = await UserRepository.findBy('email', inputEmail)
        const newToken = await auth.use('api').generate(newUser)
      
        
        return response.data({
          'token':  newToken.token,
          'user': {
            'id': newUser?.id,
            'profile_type': newUser?.profile_type,  
            'client_id': newUser?.profile_id,
            'email': newUser?.email,
            'username': newUser?.username,
            'password': newUser?.password  
          }
        }, 'You are now logged in.')
      
      }
       
        const token = await auth.use('api').generate(user)
        
        return response.data({
          'token':  token.token,
          'user': {
            'id': user?.id,
            'profile_type': user?.profile_type,  //null
            'client_id': user?.profile_id,
            'email': user?.email,
            'username': user?.username,  //null
            'password': user.password
          }
        }, 'You are now logged in.')

     
    } catch (e) {
      // const rollbar = new Logger()
      // await rollbar.log('AUTH001', e, {
      //   'request': request
      // })
      console.log(e.message);
      
      return response.unauthorized('Token expired or is invalid!')
    }
  }
}
