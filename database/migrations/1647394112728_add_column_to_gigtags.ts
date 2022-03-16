import { column } from '@ioc:Adonis/Lucid/Orm'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigTags extends BaseSchema {
  protected tableName = 'gig_tags'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {

      //column.name()
      // table.renameColumn('gig_id', 'gigs_id').foreign('gigs_id',['gigs_id']).references('gigs.id').alter()
      // table.renameColumn('tag_id', 'tags_id').foreign('tags_id',['tags_id']).references('tags.id').alter()
  //  //   table.integer('gig_id').unsigned().references('gigs.id')
  //     table.integer('tag_id').unsigned().references('tags.id')
     //table.integer('user_id').references('id').inTable('users')
    //  table.foreign('gigs_id').references('id').inTable('gigs')
    //  table.foreign('tag_id').references('id').inTable('tags')
     table.foreign('gigs_id').references('gigs.id')//.inTable('gigs')
     table.foreign('tag_id').references('id').inTable('tags')
    //  table.foreign('gigs_id').references('gigs.id')
    //  table.foreign('tag_id').references('tags.id')
     table.unique(['gigs_id', 'tag_id'])
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      
       table.dropForeign('gigs_id')
       table.dropForeign('tag_id')
      table.dropUnique([`gigs_id`, `tag_id`])
    })
  }
}
