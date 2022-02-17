import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Certification extends BaseSchema {
  protected tableName = 'certifications'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('certification_link',350).after('certified_from')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName,(table) => {
      table.dropColumn('certification_link')
    })
  }
}
