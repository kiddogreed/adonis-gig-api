import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LanguageIds extends BaseSchema {
  protected tableName = 'language_ids'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('language_name')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
