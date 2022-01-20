import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Gigs extends BaseSchema {
  protected tableName = 'gigs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id')
      table.integer('subcategory_id')
      table.string('reference_number',75)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
