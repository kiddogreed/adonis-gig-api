import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Occupations extends BaseSchema {
  protected tableName = 'occupations'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('job_title', 100).after('company')
      table.string('job_description', 500).after('job_title')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('job_title')
      table.dropColumn('job_description')
    })
  }
}
