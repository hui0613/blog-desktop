import { session } from 'electron'

export function getCookies() {
  return new Promise((resolve, reject) => {
    session.defaultSession.cookies.get({ url: 'https://juejin.cn/' }).then(cookies => {
      let cookiesString = ''
      for (let cookie of cookies) {
        cookiesString += cookie.name + '=' + cookie.value + ';'
      }
      resolve(cookiesString)
    })
  })
}