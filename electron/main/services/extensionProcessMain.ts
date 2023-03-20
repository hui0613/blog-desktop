import "reflect-metadata"
import { NodeRequireInterceptor } from '../api/node/NodeRequireInterceptor'
import { BlogExtensionService } from './blog/blogExtensionService'
import { container } from 'tsyringe'


new NodeRequireInterceptor().install()
container.resolve(BlogExtensionService)

// const blogHelper = new BlogHelper()

// process.on('message', (message: ProcessMessage, sendHandle: unknown) => {
//   console.log('插件进程收到消息')
//   console.log(message)
//   switch (message.type) {
//     case 'plugin:start':
//       startPlugin()
//       break
//     case 'blog:create':
//       createArticle()
//       break
//     case 'blog:update':
//       updateArticle(message.data)
//       break
//     case 'blog:publish':
//       publishArticle()
//       break
//   }
// })

// function startPlugin() {
//   blogHelper.startPlugin()
// }

// function createArticle() {
//   blogHelper.createArticle('')
// }

// function updateArticle(msg: any) {
//   blogHelper.update(msg)
// }

// function publishArticle() { }

// function restartPluginProcess(params: any) { }


