import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Educations extends BaseSchema {
  protected tableName = 'educations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
      table.string('country',150)
      table.string('school',250)
      table.string('degree',150)
      table.integer('year_graduated')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
