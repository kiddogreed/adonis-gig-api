import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class LanguageName extends BaseModel {
  static get table() {
    return ('language_ids')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public language_name: string

}
