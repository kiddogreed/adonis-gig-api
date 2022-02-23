import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigPricings extends BaseSchema {
  protected tableName = 'gig_pricings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
      table.string('package',10)
      table.string('package_name',75)
      table.string('package_description',500)
      table.string('delivery_time',15)
      table.integer('price')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
