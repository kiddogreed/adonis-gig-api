import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class LanguageLevel extends BaseModel {
  static get table() {
    return ('language_levels')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public level_name: string
}
