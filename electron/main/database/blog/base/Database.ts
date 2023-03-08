import * as path from 'path'
import { knex } from 'knex'
import type { Knex } from 'knex'
import * as tables from '../tables'
import { USER_DATA_DIR } from '@main/main/utils'
import { injectable } from 'tsyringe'

@injectable()
export class Database {
  private _database: Knex
  constructor() {
    this._init()
  }

  private async _init() {
    this._database = knex({
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: path.resolve(USER_DATA_DIR, 'dew-blog'),
      },
    })

    await this.syncTable()
  }

  private async syncTable() {
    await tables.createArticleTable(this._database)
    await tables.createCookiesTable(this._database)
  }

  get table() {
    return this._database.table.bind(this._database)
  }
}
