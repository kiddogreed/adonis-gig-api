import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GigPackageInclusion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public gig_id: number

  @column()
  public package_inclusion: string

  @column()
  public package_name: string

  @column()
  public feature_name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
