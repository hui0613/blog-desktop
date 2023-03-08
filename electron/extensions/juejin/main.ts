import { onCreate } from 'dew-blog'
import { container } from 'tsyringe'
import { BlogArticleController } from '@main/main/database'
import { createArticle } from './article'

export function activate() {
  onCreate.tapPromise(() => {
    const blogArticleController = container.resolve(BlogArticleController)
    return new Promise((resolve, reject) => {
      blogArticleController
        .get('sdsd')
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  })
}
