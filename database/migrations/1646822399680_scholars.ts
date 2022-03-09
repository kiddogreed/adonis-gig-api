import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Scholars extends BaseSchema {
  protected tableName = 'scholars'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('manager_id')
      table.integer('scholar_id')
      table.string('status')
      table.string('note',1500)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
