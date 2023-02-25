import { NodeRequireInterceptor } from '../api/node/NodeRequireInterceptor'
import { BlogHelper } from '../blog'

new NodeRequireInterceptor().install()

new BlogHelper().startPlugin()
