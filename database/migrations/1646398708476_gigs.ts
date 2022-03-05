import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Gigs extends BaseSchema {
  protected tableName = 'gigs'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('description',1500).after('tag')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('description')
    })
  }
}
