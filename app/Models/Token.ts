import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Token extends BaseModel {
  static get table (){
    return ('tokens')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public code: string

  @column()
  public type: string

  @column()
  public revoked: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
