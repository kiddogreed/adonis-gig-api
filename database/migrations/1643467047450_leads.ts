import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Leads extends BaseSchema {
  protected tableName = 'leads'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email',100).unique()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
