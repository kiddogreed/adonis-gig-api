import GigRepository from 'App/Repositories/GigRepository'
import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigPricingRepository from 'App/Repositories/GigPricingRepository'
import GigGallerieRepository from 'App/Repositories/GigGallerieRepository'
import GigCategoryRepository from 'App/Repositories/GigCategoryRepository'
import SubCategorieRepository from 'App/Repositories/SubCategorieRepository'
import GigDescriptionRepository from 'App/Repositories/GigDescriptionRepository'



// export default class GigTransformer extends TransformerAbstract {
//   public async transform(gig: GigRepository) {
//    //  const category = await GigCategoryRepository.findBy('id',gig.category_id)



//       const category = await GigCategoryRepository.query()
//         .where('id',gig.category_id)
//         .orderBy('id','asc') 

//       const subcategory = await SubCategorieRepository.query()
//         .where('id',gig.subcategory_id)
//         .orderBy('id','asc') 



      
//       const gigPrice = await GigPricingRepository.query()
//         .where('client_id', gig.client_id)
//         .orderBy('id','asc')  

//       const gigTag = await GigTagRepository.query()
//         .where('gig_id',gig.id)
//         .orderBy('id','asc') 

//       const tags = TagRepository.$getRelation

export default class GigTransformer extends TransformerAbstract {
  public async transform(gig: GigRepository) {
    const gigGallerry = await GigGallerieRepository.query()
      .where('client_id', gig.client_id)
      .orderBy('id','asc')

    const gigDescription  = await GigDescriptionRepository.query()
      .where('id',gig.description)
      .orderBy('id','asc') 

    const gigPrice = await GigPricingRepository.query()
      .where('client_id', gig.client_id)
      .orderBy('id','asc')    
    const category = await GigCategoryRepository.findBy('id',gig.category_id)
    const subcategory = await SubCategorieRepository.findBy('id',gig.subcategory_id)
    const tags = await GigRepository.findByOrFail('id', gig.id)
    const tag = await tags.related('tags').query()

  
    return {
      id: gig.id,
      title: gig.name,
      tag: tag,
      tags: tags,
      category: category,
      subcategory: subcategory,
      description: gigDescription,
      pricing: gigPrice,
      client_id: gig.client_id,
      //reviews:'reviews'
      status:gig.status,
      gallery: gigGallerry,
      name:gig.name
    }
  }
}
