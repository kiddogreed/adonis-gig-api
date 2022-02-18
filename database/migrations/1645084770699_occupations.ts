import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DateFrom extends BaseSchema {
  protected tableName = 'occupations'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('date_from', 15).alter()
      table.string('date_to', 15).alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropdown('date_from').alter()
      table.dropdown('date_to').alter()
    })
  }
}
