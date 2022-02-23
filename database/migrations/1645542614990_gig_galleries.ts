import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigGalleries extends BaseSchema {
  protected tableName = 'gig_galleries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
      table.string('type',20)
      table.string('files',300)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
