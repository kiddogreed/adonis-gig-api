import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigPackageInclusions extends BaseSchema {
  protected tableName = 'gig_package_inclusions'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('gig_id').after('client_id')
      table.string('package_inclusion').after('gig_id')
      table.renameColumn('inclusion_name','feature_name')

    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('gig_id')
      table.dropColumn('package_inclusion')
      table.dropColumn('feature_name')
    })
  }
}
