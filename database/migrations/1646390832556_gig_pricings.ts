import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigPricings extends BaseSchema {
  protected tableName = 'gig_pricings'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('inclusion_one',250).after('package_name')
      table.string('inclusion_two',250).after('inclusion_one')
      table.string('inclusion_three',250).after('inclusion_two')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('inclusion_one')
      table.dropColumn('inclusion_two')
      table.dropColumn('inclusion_three')
    })
  }
}
