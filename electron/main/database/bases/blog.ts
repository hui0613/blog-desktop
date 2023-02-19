import { knex } from 'knex'
import type { Knex } from 'knex'
import { app } from 'electron'
import path from 'path';


export class BlogDataBase {
  private static database: Knex

  public static getInstance(schemaName: string): Knex {
    if (!BlogDataBase.database) {
      BlogDataBase.database = BlogDataBase.connectDB(schemaName)
    }
    return BlogDataBase.database
  }

  private static connectDB(schemaName: string) {
    return knex({
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: path.resolve(app.getPath('userData'), schemaName)
      }
    })
  }
}
