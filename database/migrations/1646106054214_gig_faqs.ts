import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigFaqs extends BaseSchema {
  protected tableName = 'gig_faqs'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('answer',1000).after('question')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('answer')
    })
  }
}
