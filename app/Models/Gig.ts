import { DateTime } from 'luxon'
import { BaseModel, column, hasManyThrough, HasManyThrough, belongsTo, BelongsTo, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import TagRepository from 'App/Repositories/TagRepository'
import GigTagRepository from 'App/Repositories/GigTagRepository'
import Tag from './Tag'


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

  // @hasMany(() => TagRepository, {
  //   localKey: 'id',
  //   foreignKey: 'tag_id'
  // })
  // public tag: HasMany<typeof TagRepository>

  @belongsTo(() => GigTagRepository, {
    localKey: 'gigs_id', // id column on "User" model
    foreignKey: 'id'
  })
  public gig: BelongsTo<typeof GigTagRepository>

  @manyToMany(() => TagRepository, {
    localKey: 'id',
    pivotForeignKey: 'gigs_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'tag_id',
    pivotTable: 'gig_tags',
  })
  public manyTag: ManyToMany<typeof TagRepository>

  @hasManyThrough([() => TagRepository, () => GigTagRepository], {
    localKey: 'id',
    foreignKey: 'gig_id',
    throughLocalKey: 'tag_id',
    throughForeignKey: 'id', 
  })
  public tags: HasManyThrough<typeof TagRepository>

}
