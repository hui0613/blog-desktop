import { ExtensionContext } from '@main/types/Context'

export function activate(context: ExtensionContext) {
  context.hooks.create.tapAsync('juejin', () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("掘金文章创建")
      }, 1000);
    })
  })
}