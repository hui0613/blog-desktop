import { NodeRequireInterceptor } from "../api/node/NodeRequireInterceptor"
import { BlogHelper } from '../blog'
import { ProcessMessage } from './processMessage.impl'

new NodeRequireInterceptor().install()

process.on('message', (message: ProcessMessage, sendHandle: unknown) => {
  console.log("插件进程收到消息")
  console.log(message)
})

function startPlugin() {
  new BlogHelper().startPlugin()
}





