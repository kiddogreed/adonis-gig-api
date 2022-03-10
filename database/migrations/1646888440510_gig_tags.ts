import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigTags extends BaseSchema {
  protected tableName = 'gig_tags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('gig_id')
      table.string('tag',75)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
