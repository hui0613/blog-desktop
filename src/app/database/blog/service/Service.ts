import { injectable, inject } from 'tsyringe'
import { Database } from '../base/Database'

@injectable()
export class BlogArticleService {
  private tableName: string = 'article'
  constructor(@inject(Database) private database: Database) {}

  async add(tableName: string, data: any) {
    await this.database.table(tableName).insert(data)
  }

  async getByDomain(domain: string) {
    return await this.database.table('cookies').select('*').where('domain', '=', domain).first()
  }
}
