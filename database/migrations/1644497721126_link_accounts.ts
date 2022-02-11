import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LinkAccounts extends BaseSchema {
  protected tableName = 'link_accounts'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name').after('email')
      table.string('token').after('presence_name')
      table.string('verified').after('token')

     
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('name')
      table.dropColumn('token')
      table.dropColumn('verified')
     
    })
  }
}
