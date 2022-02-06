import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Skill_name extends BaseSchema {
  protected tableName = 'skill_name'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',150)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
