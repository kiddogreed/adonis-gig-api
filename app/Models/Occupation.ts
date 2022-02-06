import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Occupation extends BaseModel {
  static get table (){
    return ('occupations')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public company: string

  @column.dateTime()
  public date_from: DateTime

  @column.dateTime()
  public date_to: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
