import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class GigTags extends BaseSchema {
  protected tableName = 'gig_tags'

  public async up () {
    this.schema.renameTable(this.tableName, 'old_gig_tags')
  }

  public async down () {
    this.schema.renameTable('old_gig_tags', 'gig_tags')
  }
}
