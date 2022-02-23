import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LinkAccounts extends BaseSchema {
  protected tableName = 'link_accounts'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('token','social_id')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('social_id')
    })
  }
}
