import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Skill extends BaseModel {
  static get table (){
    return ('skills')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public skill_id: string

  @column()
  public skill_name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
