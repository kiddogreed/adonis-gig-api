import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigFaqs extends BaseSchema {
  protected tableName = 'gig_faqs'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('gig_id').after('client_id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('gig_id')
    })
  }
}
