import { TransformerAbstract } from '@ioc:Adonis/Addons/Bumblebee'
import CertificationRepository from 'App/Repositories/CertificationRepository'


export default class CertificationTransformer extends TransformerAbstract {
  public async transform(certificate: CertificationRepository) {

    return {
      id: certificate.id,
      client_it: certificate.client_id,
      certificate_name: certificate.certificate_name,
      certified_from: certificate.certified_from,
      year: certificate.year
    }
  }
}
