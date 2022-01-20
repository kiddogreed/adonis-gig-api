import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Categorie extends BaseModel {
  static get table (){
    return ('gig_categories')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public logo: string

  @column()
  public banner: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
