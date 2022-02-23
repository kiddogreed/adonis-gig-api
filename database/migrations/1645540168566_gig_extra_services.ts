import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigExtraServices extends BaseSchema {
  protected tableName = 'gig_extra_services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
      table.string('package',15)
      table.integer('price')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
