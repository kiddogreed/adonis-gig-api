import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigPackageInclusions extends BaseSchema {
  protected tableName = 'gig_package_inclusions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
      table.string('inclusion_name',150)
      table.string('package_name',25),


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
