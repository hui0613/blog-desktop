import { getCookies } from './cookies'
import { request } from '@main/main/utils'
import { ARTICLE_PARAMS } from './utils'




export function createArticle() {
  const params = Object.assign({}, ARTICLE_PARAMS)
  return new Promise((resolve, reject) => {
    getCookies().then((cookies: string) => {
      request({
        host: 'api.juejin.cn',
        method: 'POST',
        path: '/content_api/v1/article_draft/create',
        headers: {
          'content-type': 'application/json',
          cookie: cookies,
          'user-agent': 'Mozilla/5.0',
          referer: 'https://juejin.cn/',
          origin: 'https://juejin.cn'
        },
      }, params).then((res: any) => {
        console.log(res)
        resolve(res)
      }).catch((err: any) => {
        console.log(err)
        resolve(err)
      })
    })
  })
}
