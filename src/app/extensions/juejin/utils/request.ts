import * as https from 'https'
import type { RequestOptions } from 'https'


export function request(options: RequestOptions, params?: any) {
  return new Promise((resolve, reject) => {
    const _r = https.request(options, (res) => {
      let str = ''
      res.on('data', (buffer) => {
        str += buffer
      })
      res.on('end', () => {
        const result = JSON.parse(str)
        resolve(result)
      })
    })
    _r.on('error', (e) => {
      reject(e)
    })
    _r.write(JSON.stringify(params))
    _r.end()

  })
}
