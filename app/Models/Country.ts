import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Country extends BaseModel {
  static get table (){
    return ('countries')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

}
