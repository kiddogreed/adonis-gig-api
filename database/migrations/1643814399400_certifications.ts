import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Certifications extends BaseSchema {
  protected tableName = 'certifications'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
      table.string('certificate_name',150)
      table.string('certified_from',150)
      table.integer('year')
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
