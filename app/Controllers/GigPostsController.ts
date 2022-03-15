import GigRepository from 'App/Repositories/GigRepository'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GigPostTransformer from 'App/Transformers/GigPostTransformer'



export default class GigPostsController {

    public async index({ response, request, transform, auth}:HttpContextContract){
      //get current user
      const user = auth.user
      //get gigs of the user
      const gigs = await GigRepository.query()
        .where('client_id', user.id)
        .orderBy('id','asc')
      //get faq of the gigs
      // const faqs = await GigFaqRepository.query()
      //  .where('client_id', user.id)
      //  .orderBy('id','asc')


      //get pricing of the gigs
      // const gigPrice = await GigPricingRepository.query()
      // .where('client_id', user.id)
      // .orderBy('id','asc')
      
   
      //get categorie
      // const categoryRepository = await GigCategoryRepository.findByOrFail('id', gigs[0].$original.category_id)
    //  const category = await CategorieRepository.query()
      
      //get gig description
      // const gigDesc = await GigDescriptionRepository.query()
      //   .where('client_id', user.id)
      //   .orderBy('id','asc')


      //get gig requirement
      // const gigReq = await GigRequirementRepository.query()  
      // .where('client_id', gig.client_id)
      // .orderBy('id','asc')  
      //gig extra service
      //get gig subcateg
      // const subRepository = await SubCategoryRepository.findByOrFail('id', gigs[0].$original.subcategory_id)
      //gig multiple choice
      //gig packages
  
      //console.log(gigs[0].$original.id);
        // console.log(await transform.collection(gigs, GigManagePostTransformer));
        
        // return
        if(!gigs){
          return response.badRequest('Gig not found!')
         }
      return response.resource(await transform.collection(gigs, GigPostTransformer))
      
      
     
   


  }

    public async show({ response, params, transform, auth}:HttpContextContract){
      const user = auth.user
      try {
         const postGig = await GigRepository.findBy('id',params.id)

         if(!postGig){
          return response.badRequest('Gig not found!')
         }
        return response.resource(await transform.item(postGig, GigPostTransformer))
      } catch (error) {
        return response.badRequest('Invalid Request')
        
      }
     
    }

}
