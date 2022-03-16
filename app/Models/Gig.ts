import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany, } from '@ioc:Adonis/Lucid/Orm'
import Tag from './Tag'
import Tags from 'Database/migrations/1646810658618_tags'





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
  public tag: string

  @column()
  public description: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  

  @manyToMany(() => Tag, {
    pivotTable: 'gig_tags',
  })
  public tags: ManyToMany<typeof this.tags>

}
