import Category from 'App/Repositories/CategorieRepository'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class GigCategorySeeder extends BaseSeeder {
  public async run() {
    await Category.createMany([
      {
        name: 'banner bg token',
        logo: 'https://ucarecdn.com/2ebb78d8-9eb2-45c9-a78a-3883ddaff26b/',
        banner: 'https://ucarecdn.com/2ebb78d8-9eb2-45c9-a78a-3883ddaff26b/',
      },
      {
        name: 'header bg token',
        logo: 'https://ucarecdn.com/8d4068c0-e743-4dc4-ac76-3f37ab3970dc/',
        banner: 'https://ucarecdn.com/8d4068c0-e743-4dc4-ac76-3f37ab3970dc/',
      },
    ])


  }
}
