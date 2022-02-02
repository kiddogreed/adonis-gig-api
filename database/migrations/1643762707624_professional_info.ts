import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProfessionalInfo extends BaseSchema {
  protected tableName = 'professional_info'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
      table.string('occupation',500)
      table.string('skill',250)
      table.string('education',500)
      table.string('website',250)
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
