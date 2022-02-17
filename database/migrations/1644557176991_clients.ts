import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clients extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('personal_website',150).after('description')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('personal_website')
    })
  }
}
