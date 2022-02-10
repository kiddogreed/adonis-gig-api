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

  Route.get('/certification', 'CertificationsController.index').middleware('auth:api') 
  Route.post('/certification', 'CertificationsController.set').middleware('auth:api') 
  Route.put('/certification/:Id', 'CertificationsController.update').middleware('auth:api') 
  Route.delete('/certification/:Id', 'CertificationsController.destroy').middleware('auth:api') 

  Route.get('/education/information', 'EducationsController.index').middleware('auth:api') 
  Route.post('/education/information', 'EducationsController.set').middleware('auth:api')  
  Route.put('/education/:Id/information', 'EducationsController.update').middleware('auth:api')
  Route.delete('/education/:Id/information', 'EducationsController.destroy').middleware('auth:api')

  Route.post('/gig', 'GigsController.set').middleware('auth:api')
  Route.get('/gig/category', 'GigsController.gigCategory').middleware('auth:api') 
  Route.get('/gig/sub-category', 'GigsController.subCategory').middleware('auth:api')

  Route.get('/gig/description', 'GigDescriptionsController.show').middleware('auth:api')
  Route.post('/gig/description', 'GigDescriptionsController.set').middleware('auth:api') 
  Route.put('/gig/:Id/description', 'GigDescriptionsController.update').middleware('auth:api')

  Route.get('/gig/faq', 'GigFaqsController.show').middleware('auth:api')
  Route.post('/gig/faq', 'GigFaqsController.set').middleware('auth:api')
  Route.put('/gig/:Id/faq', 'GigFaqsController.update').middleware('auth:api')
  Route.delete('/gig/:Id/faq', 'GigFaqsController.destroy').middleware('auth:api')
  
  Route.get('/language','LanguagesController.show').middleware('auth:api')
  Route.post('/language','LanguagesController.set').middleware('auth:api')
  Route.put('/language/:Id','LanguagesController.update').middleware('auth:api')
  Route.delete('/language/:Id','LanguagesController.destroy').middleware('auth:api')

  Route.get('/language/name','LanguagesController.languageName').middleware('auth:api')
  Route.get('/language/level','LanguagesController.languageLevel').middleware('auth:api')
  Route.get('/linked','linkAccountsController.index').middleware('auth:api')
  Route.post('/linked','linkAccountsController.set').middleware('auth:api')
  Route.post('/linked/sample','linkAccountsController.link').middleware('auth:api')

  Route.get('/occupation/information', 'OccupationsController.index').middleware('auth:api')
  Route.post('/occupation/information', 'OccupationsController.set').middleware('auth:api')
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

  Route.get('/skill','SkillsController.index').middleware('auth:api')
  Route.post('/skill','SkillsController.set').middleware('auth:api')
  Route.put('/skill/:Id','SkillsController.update').middleware('auth:api')
  Route.delete('/skill/:Id','SkillsController.destroy').middleware('auth:api')
  Route.get('/skill/name','SkillsController.show').middleware('auth:api')

  Route.put('/website/:Id/information', 'PersonalWebsitesController.update').middleware('auth:api')
  Route.delete('/website/:Id/information', 'PersonalWebsitesController.destroy').middleware('auth:api')



