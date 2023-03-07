import { getCookie } from 'dew-blog'

export const getCookies = (() => {
  let cookies = ''
  return () => new Promise((resolve, reject) => {
    if (cookies) {
      resolve(cookies)
      return
    }
    getCookie({ url: 'https://juejin.cn/' }).then(cookies => {
      for (let cookie of cookies) {
        cookies += cookie.name + '=' + cookie.value + ';'
      }
      resolve(cookies)
    }).catch(err => {
      reject(err)
    })
  })
})()
