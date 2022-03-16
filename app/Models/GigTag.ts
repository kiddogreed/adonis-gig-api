import { DateTime } from 'luxon'
import { BaseModel, column,HasMany,hasMany } from '@ioc:Adonis/Lucid/Orm'
import TagRepository from 'App/Repositories/TagRepository'

export default class GigTag extends BaseModel {
  static get table() {
    return ('gig_tags')
  }
  @column({ isPrimary: true })
  public id: number


  @column()
  public gigs_id: number


  @column()
  public tag_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => TagRepository, {
    localKey: 'tag_id'
    foreignKey: 'id'
  })
  public tags: HasMany<typeof TagRepository>
}
