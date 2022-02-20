import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProfileStatus extends BaseModel {
  static get table() {
    return ('profile_statuses')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public section: string

  @column()
  public under: string

  @column()
  public section_percent: number

  @column()
  public section_status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
