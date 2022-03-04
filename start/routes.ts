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

Route.post('doc/auth','AuthDoconchainController.login')
Route.post('doc/login','AuthDoconchainController.gigToDoc')

Route.get('/categories', 'CategoriesController.index')
Route.post('/categories', 'CategoriesController.set')
Route.put('/categories/:id', 'CategoriesController.update')

Route.get('/certification', 'CertificationsController.index').middleware('auth:api')
Route.post('/certification', 'CertificationsController.set').middleware('auth:api')
Route.put('/certification/:Id', 'CertificationsController.update').middleware('auth:api')
Route.delete('/certification/:Id', 'CertificationsController.destroy').middleware('auth:api')
Route.get('/country', 'CountriesController.show').middleware('auth:api')

Route.put('/draft/professional', 'PersonalInformationsController.draftProfessional').middleware('auth:api')
Route.put('/draft/profile', 'PersonalInformationsController.draftProfile').middleware('auth:api')
Route.put('/draft/linkAccount', 'LinkAccountsController.draft').middleware('auth:api')
Route.put('/draft/security', 'SecurityController.draft').middleware('auth:api')

Route.get('/education', 'EducationsController.index').middleware('auth:api')
Route.post('/education', 'EducationsController.set').middleware('auth:api')
Route.put('/education/:Id', 'EducationsController.update').middleware('auth:api')
Route.delete('/education/:Id', 'EducationsController.destroy').middleware('auth:api')

Route.get('/gig', 'GigsController.show').middleware('auth:api')
Route.post('/gig', 'GigsController.set').middleware('auth:api')
Route.put('/gig/:Id', 'GigsController.update').middleware('auth:api')
Route.get('/gig/category', 'GigsController.gigCategory').middleware('auth:api')
Route.get('/gig/sub-category', 'GigsController.subCategory').middleware('auth:api')

Route.get('/gig/description', 'GigDescriptionsController.show').middleware('auth:api')
Route.post('/gig/description', 'GigDescriptionsController.set').middleware('auth:api')
Route.put('/gig/:Id/description', 'GigDescriptionsController.update').middleware('auth:api')

Route.get('/gig/faq', 'GigFaqsController.show').middleware('auth:api')
Route.post('/gig/faq', 'GigFaqsController.set').middleware('auth:api')
Route.put('/gig/:Id/faq', 'GigFaqsController.update').middleware('auth:api')
Route.delete('/gig/:Id/faq', 'GigFaqsController.destroy').middleware('auth:api')

Route.get('gig/post', 'GigPostsController.index').middleware('auth:api')
Route.get('gig/post/:id', 'GigPostsController.show').middleware('auth:api')


Route.get('/gig/requirement', 'GigRequirementsController.index').middleware('auth:api')
Route.post('/gig/requirement', 'GigRequirementsController.set').middleware('auth:api')
Route.delete('/gig/:Id/requirement', 'GigRequirementsController.destroy').middleware('auth:api')
Route.put('/gig/question/:Id/requirement', 'GigRequirementsController.question').middleware('auth:api')
Route.put('/gig/answer/:Id/requirement', 'GigRequirementsController.choice').middleware('auth:api')

Route.get('/gig/manage/post', 'GigManagePostsController.show').middleware('auth:api')

Route.get('/gig/pricing', 'GigPricingsController.show').middleware('auth:api')
Route.post('/gig/pricing', 'GigPricingsController.set').middleware('auth:api')
Route.post('/gig/pricing/extra-service', 'GigPricingsController.extraService').middleware('auth:api')
Route.delete('/gig/pricing/:Id/extra-service', 'GigPricingsController.destroy').middleware('auth:api')

Route.get('/gig/gallery', 'GigGalleriesController.show').middleware('auth:api')
Route.post('/gig/gallery', 'GigGalleriesController.set').middleware('auth:api')

Route.get('/language', 'LanguagesController.show').middleware('auth:api')
Route.post('/language', 'LanguagesController.set').middleware('auth:api')
Route.put('/language/:Id', 'LanguagesController.update').middleware('auth:api')
Route.delete('/language/:Id', 'LanguagesController.destroy').middleware('auth:api')

Route.get('/linked', 'LinkAccountsController.show').middleware('auth:api')
Route.post('/linked', 'LinkAccountsController.set').middleware('auth:api')

Route.get('/occupation', 'OccupationsController.index').middleware('auth:api')
Route.post('/occupation', 'OccupationsController.set').middleware('auth:api')
Route.put('/occupation/:Id', 'OccupationsController.update').middleware('auth:api')
Route.delete('/occupation/:Id', 'OccupationsController.destroy').middleware('auth:api')

Route.get('/profile', 'PersonalInformationsController.show').middleware('auth:api')
Route.post('/profile', 'PersonalInformationsController.set').middleware('auth:api')
Route.put('/profile', 'PersonalInformationsController.update').middleware('auth:api')
Route.get('/profile/status', 'ProfileStatusesController.show').middleware('auth:api')
Route.put('/profile/type', 'ProfileSetupController.profileSetupType').middleware('auth:api')
Route.put('/profile/role', 'ProfileSetupController.profileSetupRole').middleware('auth:api')

Route.get('/security', 'SecurityController.show').middleware('auth:api')
Route.put('/security', 'SecurityController.update').middleware('auth:api')
Route.post('/signup', 'SignUpController.signup')
Route.post('/signup/verify', 'SignUpController.register')

Route.get('/skill', 'SkillsController.index').middleware('auth:api')
Route.post('/skill', 'SkillsController.set').middleware('auth:api')
Route.put('/skill/:Id', 'SkillsController.update').middleware('auth:api')
Route.delete('/skill/:Id', 'SkillsController.destroy').middleware('auth:api')
Route.get('/skill/name', 'SkillsController.show').middleware('auth:api')

Route.post('two_factor/enable','TwoFactorAuthenticationsController.enable').middleware('auth:api');
Route.post('two_factor/disable','TwoFactorAuthenticationsController.disable').middleware('auth:api');
Route.post('two_factor/verify','TwoFactorAuthenticationsController.verify').middleware('auth:api');
Route.post('two_factor/auth','TwoFactorAuthenticationsController.authenticate').middleware('auth:api');

Route.get('/my_account', 'MyAccountsController.index')









