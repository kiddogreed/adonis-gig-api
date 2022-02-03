import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clients extends BaseSchema {
  protected tableName = 'clients'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('description', 500).after('photo')
      table.string('language').after('description')
      table.string('level').after('language')
      table.integer('number').after('level')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('description')
      table.dropColumn('language')
      table.dropColumn('level')
      table.dropColumn('number')
    })
  }
}
