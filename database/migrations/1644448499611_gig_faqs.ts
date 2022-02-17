import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigFaqs extends BaseSchema {
  protected tableName = 'gig_faqs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
      table.string('question',250)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
