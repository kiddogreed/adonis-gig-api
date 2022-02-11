import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  static get table() {
    return ('users')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public profile_id: number
  
  @column()
  public two_factor_auth: number

  @column()
  public two_factor_secret: string

  @column()
  public profile_type: string

  @column()
  public email: string

  @column()
  public username?: string

  @column({ serializeAs: null })
  public password?: string

  @column.dateTime()
  public logged_in_at: DateTime


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
