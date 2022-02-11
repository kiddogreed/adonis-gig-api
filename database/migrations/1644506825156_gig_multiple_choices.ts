import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigMultipleChoices extends BaseSchema {
  protected tableName = 'gig_multiple_choices'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('requirement_id')
      table.string('option',150)
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
