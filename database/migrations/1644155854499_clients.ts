import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clients extends BaseSchema {
  protected tableName = 'clients'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('last_name',75).after('middle_name')
      table.string('contact',15).after('last_name')
     
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('last_name')
      table.dropColumn('contact')
    })
  }
}
