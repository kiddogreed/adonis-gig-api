import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Qoutations extends BaseSchema {
  protected tableName = 'qoutations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('gig_id')
      table.boolean('allow_qoutation').defaultTo(false)

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
