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

  Route.put('/education/:Id/information', 'EducationsController.update').middleware('auth:api')
  Route.delete('/education/:Id/information', 'EducationsController.destroy').middleware('auth:api')

  Route.get('/language','LanguagesController.show').middleware('auth:api')
  Route.post('/language','LanguagesController.set').middleware('auth:api')
  Route.put('/language/:Id','LanguagesController.update').middleware('auth:api')
  Route.delete('/language/:Id','LanguagesController.destroy').middleware('auth:api')
  Route.get('/linked','linkAccountsController.index').middleware('auth:api')
  Route.post('/linked','linkAccountsController.set').middleware('auth:api')

  Route.put('/occupation/:Id/information', 'OccupationsController.update').middleware('auth:api')
  Route.delete('/occupation/:Id/information', 'OccupationsController.destroy').middleware('auth:api')

  Route.get('/profile','PersonalInformationsController.show').middleware('auth:api')
  Route.put('/profile','PersonalInformationsController.set').middleware('auth:api')
  Route.get('/professional/information','ProfessionalInformationsController.show').middleware('auth:api')
  Route.post('/professional/information','ProfessionalInformationsController.set').middleware('auth:api')
  Route.put('/profile/type','ProfileSetupController.profileSetupType').middleware('auth:api')

  Route.get('/security','SecurityController.show').middleware('auth:api')
  Route.put('/security','SecurityController.update').middleware('auth:api')
  Route.post('/signup','SignUpController.signup')
  Route.post('/signup/verify', 'SignUpController.register')
  Route.get('/skill','SkillsController.show').middleware('auth:api')
  Route.put('/skill/:Id','SkillsController.update').middleware('auth:api')
  Route.delete('/skill/:Id','SkillsController.destroy').middleware('auth:api')

  Route.put('/website/:Id/information', 'PersonalWebsitesController.update').middleware('auth:api')
  Route.delete('/website/:Id/information', 'PersonalWebsitesController.destroy').middleware('auth:api')



