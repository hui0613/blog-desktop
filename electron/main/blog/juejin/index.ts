import type { ExtensionContext } from '@main/types/Context'
import { createArticle } from './create'

export function activate(context: ExtensionContext) {
  context.hooks.create.tapPromise('juejin', () => {
    return new Promise((resolve, reject) => {
      createArticle().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  })
}