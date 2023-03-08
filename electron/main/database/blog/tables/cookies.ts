import type { Knex } from 'knex'

export const cookieTableName = 'cookies'

export async function createCookiesTable(database: Knex) {
  await database.schema.hasTable(cookieTableName).then((exist: boolean) => {
    if (exist) {
      return
    }
    return database.schema.createTable(cookieTableName, (tableBuilder) => {
      tableBuilder.bigIncrements('id', { primaryKey: true })
      tableBuilder.string('domain')
      tableBuilder.text('cookies')
      tableBuilder.timestamp('create_time')
      tableBuilder.timestamp('update_time')
    })
  })
}
