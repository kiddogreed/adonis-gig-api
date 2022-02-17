import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Languages extends BaseSchema {
  protected tableName = 'languages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
      table.string('language_name',50),
      table.string('level',40)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
