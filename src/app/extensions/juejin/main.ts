import { onCreate } from 'dew-blog'


export function activate() {
  console.log('插件启动')
  onCreate.tapPromise(async () => {
    // createArticle()
    return 'juejin'
  })
}
