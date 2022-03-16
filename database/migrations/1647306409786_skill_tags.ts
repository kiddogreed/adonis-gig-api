import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SkillTags extends BaseSchema {
  protected tableName = 'skill_tags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('tag_id').unsigned().references('tags.id')
      table.integer('skill_id').unsigned().references('skills.id')
      table.unique(['tag_id', 'skill_id'])

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
