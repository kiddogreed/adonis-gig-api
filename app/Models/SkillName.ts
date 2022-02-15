import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SkillName extends BaseModel {
  static get table (){
    return ('skill_name')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

}
