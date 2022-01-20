import SubCategory from 'App/Repositories/SubCategorieRepository'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class GigSubCategorySeeder extends BaseSeeder {
  public async run () {
    await SubCategory.createMany([
      {
        name: 'token design',
        logo: 'https://ucarecdn.com/97bf62f7-fc29-490e-ae38-471e30226661/',
        banner: 'https://ucarecdn.com/97bf62f7-fc29-490e-ae38-471e30226661/',
      },
      {
        name: 'token influencers',
        logo: 'https://ucarecdn.com/e36b02b6-03f7-419f-8c22-be8f18f7d809/',
        banner: 'https://ucarecdn.com/e36b02b6-03f7-419f-8c22-be8f18f7d809/',
      },
      {
        name: 'token listing',
        logo: 'https://ucarecdn.com/1bc251ad-30ae-47e7-948e-c03100eb8cc6/',
        banner: 'https://ucarecdn.com/1bc251ad-30ae-47e7-948e-c03100eb8cc6/',
      },
      {
        name: 'token promotion',
        logo: 'https://ucarecdn.com/c69836f7-2654-40d8-adfa-9bdca582ab57/',
        banner: 'https://ucarecdn.com/c69836f7-2654-40d8-adfa-9bdca582ab57/',
      },
      {
        name: 'token proservices',
        logo: 'https://ucarecdn.com/9cb62b8b-3e18-4270-bf71-dc32ae96ce75/',
        banner: 'https://ucarecdn.com/9cb62b8b-3e18-4270-bf71-dc32ae96ce75/',
      },
      {
        name: 'token technology',
        logo: 'https://ucarecdn.com/cbe721b3-eea4-4bb0-a28a-8d9f70f6e8ea/',
        banner: 'https://ucarecdn.com/cbe721b3-eea4-4bb0-a28a-8d9f70f6e8ea/',
      },
    ])
    // Write your database queries inside the run method
  }
}
