
import { onCreate } from 'dew-blog'
import { createArticle } from './article'

export function activate() {
  onCreate.tapPromise(createArticle)
}
