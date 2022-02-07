/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'

  Route.get('/', async () => {
    return { messsage: `DOC GIG API (${Env.get('NODE_ENV')})` }
  })
  Route.post('/auth', 'AuthController.login')
  Route.post('/auth/logout', 'AuthController.logout')

  Route.get('/categories', 'CategoriesController.index')
  Route.post('/categories', 'CategoriesController.set')
  Route.put('/categories/:id', 'CategoriesController.update')

  Route.get('/linked','linkAccountsController.index').middleware('auth:api')
  Route.post('/linked','linkAccountsController.set').middleware('auth:api')

  Route.get('/profile','ProfileSetupController.show').middleware('auth:api')
  Route.put('/profile/type','ProfileSetupController.profileSetupType').middleware('auth:api')
  Route.put('/personal/information','ProfileSetupController.personal').middleware('auth:api')
  Route.post('/professional/information','ProfileSetupController.prefessionalInformation').middleware('auth:api')

  Route.get('/security','SecurityController.show').middleware('auth:api')
  Route.put('/security','SecurityController.update').middleware('auth:api')
  Route.post('/signup','SignUpController.signup')
  Route.post('/signup/verify', 'SignUpController.register')
  Route.get('/skill','SkillsController.show').middleware('auth:api')


