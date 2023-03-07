import { ARTICLE_PARAMS } from './../utils/constants';
import { getCookies, request } from '../utils'

export const createArticle = () => {
  return new Promise((resolve, reject) => {
    const params = Object.assign({}, ARTICLE_PARAMS)
    const cookies = getCookies().then(cookies => {
      if (!cookies) {
        reject('not found cookies')
        return
      }

      console.log('掘金创建文章')
      // request({
      //   host: 'api.juejin.cn',
      //   method: 'POST',
      //   path: '/content_api/v1/article_draft/create',
      //   headers: {
      //     'content-type': 'application/json',
      //     cookie: cookies as any,
      //     'user-agent': 'Mozilla/5.0',
      //     referer: 'https://juejin.cn/',
      //     origin: 'https://juejin.cn'
      //   },
      // }, params).then((res: any) => {
      //   console.log(res)
      //   return res
      // }).catch((err: any) => {
      //   console.log(err)
      //   reject(err)
      // })
    })
  })
}
