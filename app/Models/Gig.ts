import { DateTime } from 'luxon'
import { BaseModel, column,hasManyThrough,HasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import TagRepository from 'App/Repositories/TagRepository'
import GigTagRepository from 'App/Repositories/GigTagRepository'

export default class Gig extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public client_id: number

  @column()
  public name: string

  @column()
  public category_id: number

  @column()
  public subcategory_id: number

  @column()
  public description: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasManyThrough([() => TagRepository, () => GigTagRepository], {
    localKey: 'id',
    foreignKey: 'gigs_id',
    throughLocalKey: 'tag_id',
    throughForeignKey: 'id', 
  })
  public tags: HasManyThrough<typeof TagRepository>

}
