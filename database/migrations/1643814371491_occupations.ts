import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Occupations extends BaseSchema {
  protected tableName = 'occupations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
      table.string('company', 150)
      table.integer('date_from')
      table.integer('date_to')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
