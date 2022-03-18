import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import GigTagRepository from 'App/Repositories/GigTagRepository'


export default class Tag extends BaseModel {
  static get table (){
    return ('tags')
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => GigTagRepository, {
    localKey: 'id',
    foreignKey: 'tag_id'
  })
  public tag: BelongsTo<typeof GigTagRepository>


}