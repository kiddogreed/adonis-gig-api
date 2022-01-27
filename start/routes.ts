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

// Route.group(() => {
  Route.get('/', async () => {
    return { messsage: `DOC GIG API (${Env.get('NODE_ENV')})` }
  })
  Route.post('auth', 'AuthController.login')
  Route.get('categories', 'CategoriesController.index')
  Route.post('categories', 'CategoriesController.set')
  Route.put('categories/:id', 'CategoriesController.update')
  Route.post('register', 'SignUpController.register')
  Route.post('signup','SignupController.signup')
// }).domain(Env.get("APP_API_DOMAIN"));

//Route.post('signup', 'SignUpController.store')
