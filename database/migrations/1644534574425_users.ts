import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('two_factor_auth').after('profile_id')
      table.string('two_factor_secret', 90).after('two_factor_auth')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('two_factor_auth')
      table.dropColumn('two_factor_secret')
    })
  }
}
