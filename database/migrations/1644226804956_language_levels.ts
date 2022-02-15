import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LanguageLevels extends BaseSchema {
  protected tableName = 'language_levels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('level_name',75)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
