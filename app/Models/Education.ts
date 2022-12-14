import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Education extends BaseModel {
  static get table (){
    return ('educations')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public country: string

  @column()
  public school: string

  @column()
  public degree: string

  @column()
  public year_graduated: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
