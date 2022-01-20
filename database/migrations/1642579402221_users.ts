import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterUsers extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {

      table.string('profile_type', 75).after('id')

    })
  }
  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('profile_type')
    })
  }
}
