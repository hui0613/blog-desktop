import { onCreate } from 'dew-blog'
import { container } from 'tsyringe'
import { BlogArticleController } from '@main/main/database'
import { createArticle } from './article'

export function activate() {
  onCreate.tapPromise(() => {

  })
}
