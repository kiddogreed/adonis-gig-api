import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Gigs extends BaseSchema {
  protected tableName = 'gigs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('client_id').after('id')
      table.string('name', 90).after('client_id')
      table.string('tag', 75).after('subcategory_id')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('client_id')
      table.dropColumn('name')
      table.dropColumn('tag')
      table.dropColumn('created_at')
      table.dropColumn('updated_at')
    })
  }
}

