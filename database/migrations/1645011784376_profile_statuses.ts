import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProfileStatuses extends BaseSchema {
  protected tableName = 'profile_statuses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
      table.string('section',15)
      table.string('under',45)
      table.integer('section_percent')
      table.string('section_status',45)
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
