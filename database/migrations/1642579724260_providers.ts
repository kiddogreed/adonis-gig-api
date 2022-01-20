import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Providers extends BaseSchema {
  protected tableName = 'providers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 75)
      table.string('last_name', 75)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
