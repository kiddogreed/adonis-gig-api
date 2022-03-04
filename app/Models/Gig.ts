import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Gig extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public name: string

  @column()
  public category_id: number

  @column()
  public subcategory_id: number
  
  @column()
  public tag: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
