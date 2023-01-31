import * as https from 'https'
import { getCookies } from './cookies'

export function createArticle() {
  return new Promise((resolve, reject) => {
    const params = JSON.stringify({
      brief_content: '',
      category_id: '0',
      cover_image: '',
      edit_type: 10,
      html_content: 'deprecated',
      link_url: '',
      mark_content: '',
      tag_ids: [],
      title: '',
    })

    getCookies().then((cookies: string) => {
      const request = https.request({
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
      }, (res) => {
        let str = ''
        res.on('data', (buffer) => {
          str += buffer
        })
        res.on('end', () => {
          const result = JSON.parse(str)
          if (result.err_no === 0) {
            resolve(result.data)
          } else {
            console.error("掘金文章创建失败")
            console.error(result.err_msg)
            reject(result)
          }
        })
      })
      request.write(params)
      request.end()

      request.on('error', function (e) {
        reject('网络连接异常')
      });
    })
  })
}
