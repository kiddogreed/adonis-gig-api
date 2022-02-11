import { DateTime } from 'luxon'
import { BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Client extends BaseModel {
  static get table (){
    return ('clients')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public verified: number

  @column()
  public country: string

  @column()
  public first_name: string

  @column()
  public middle_name: string

  @column()
  public last_name: string

  @column()
  public photo: string

  @column()
  public description: string

  @column()
  public personal_website: string

  @column()
  public language: string

  @column()
  public level: string

  @column()
  public contact: string

  @column.date()
  public birth_date: DateTime

  @column()
  public gender: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
