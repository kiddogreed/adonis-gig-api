import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TestGigTags extends BaseSchema {
  protected tableName = 'test_gig_tags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('gig_id').unsigned().references('gigs.id')
      table.integer('tag_id').unsigned().references('tags.id')
      table.unique(['gig_id', 'tag_id'])
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
