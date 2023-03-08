import type { Knex } from 'knex'

export const articleTableName = 'article'

export async function createArticleTable(database: Knex) {
  await database.schema.hasTable(articleTableName).then((exist: boolean) => {
    if (exist) {
      return
    }
    return database.schema.createTable(articleTableName, (tableBuilder) => {
      tableBuilder.bigIncrements('id', { primaryKey: true })
      tableBuilder.string('title')
      tableBuilder.text('mark_content')
      tableBuilder.text('html_content')
      tableBuilder.timestamp('create_time')
      tableBuilder.timestamp('update_time')
    })
  })
}
