import { injectable, inject } from 'tsyringe'
import { BlogArticleService } from '../service/Service'

@injectable()
export class BlogArticleController {
  constructor(@inject(BlogArticleService) private blogArticleService: BlogArticleService) {}

  async create(data: any) {
    await this.blogArticleService.add('cookies', data)
  }

  async get(domain: string) {
    return await this.blogArticleService.getByDomain(domain)
  }
}
