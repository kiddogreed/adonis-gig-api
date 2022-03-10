import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Scholar extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public manager_id: number

  @column()
  public scholar_id: number

  @column()
  public status: string

  @column()
  public note: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
