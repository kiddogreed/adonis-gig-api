import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ProfileStatusRepository from 'App/Repositories/ProfileStatusRepository'

export default class Occupation extends BaseModel {
  static get table() {
    return ('occupations')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public company: string

  @column()
  public job_title: string

  @column()
  public job_description: string

  @column()
  public date_from: number

  @column()
  public date_to: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
