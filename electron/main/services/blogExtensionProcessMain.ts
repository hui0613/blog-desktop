import { NodeRequireInterceptor } from "../api/node/NodeRequireInterceptor"
import { BlogHelper } from '../blog'


process.on('message', (message: unknown, sendHandle: unknown) => {
  console.log(message)
})

new NodeRequireInterceptor().install()

new BlogHelper().startPlugin()
