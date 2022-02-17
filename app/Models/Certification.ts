import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Certification extends BaseModel {
  static get table (){
    return ('certifications')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public certificate_name: string

  @column()
  public certified_from: string

  @column()
  public certification_link: string

  @column()
  public year: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
