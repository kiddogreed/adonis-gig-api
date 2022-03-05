import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import GigGalleryRepository from 'App/Repositories/GigGallerieRepository'


export default class GigGalleryTransformer extends TransformerAbstract {
  public async transform(gallery: GigGalleryRepository) {

    return {
      id: gallery.id,
      client_id: gallery.client_id,
      gig_id: gallery.gig_id,
      type: gallery.type,
      files: gallery.files,
      created_at: gallery.createdAt,
      updated_at: gallery.updatedAt
    }
  }
}
