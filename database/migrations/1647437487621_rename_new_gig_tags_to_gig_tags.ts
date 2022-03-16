import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NewGigTags extends BaseSchema {
  protected tableName = 'new_gig_tags'

  public async up () {
    this.schema.renameTable(this.tableName, 'gig_tags')
  }

  public async down () {
    this.schema.renameTable('gig_tags', 'new_gig_tags')
  }
}
