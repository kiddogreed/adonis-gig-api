import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clients extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('verified').defaultTo(false)
      table.string('country', 100)
      table.string('first_name', 75)
      table.string('middle_name', 75)
      table.string('last_name', 75)
      table.string('photo',120)
      table.timestamp('birth_date')
      table.string('gender',15)
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
