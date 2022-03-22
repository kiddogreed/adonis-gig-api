import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NewGigTags extends BaseSchema {
  protected tableName = 'new_gig_tags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('gigs_id').unsigned().references('gigs.id')
      table.integer('tag_id').unsigned().references('tags.id')
      table.unique(['gigs_id', 'tag_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
