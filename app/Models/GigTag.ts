import { DateTime } from 'luxon'
import { BaseModel, column , hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import GigRepository from 'App/Repositories/GigRepository'
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

  @hasMany(() => GigRepository, {
    localKey: 'gigs_id',
    foreignKey: 'id'
  })
  public gig: HasMany<typeof GigRepository>

  @hasMany(() => TagRepository, {
    localKey: 'tag_id',
    foreignKey: 'id'
  })
  public tag: HasMany<typeof TagRepository>
}
