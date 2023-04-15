import 'reflect-metadata'
import { NodeRequireInterceptor } from '../api/node/NodeRequireInterceptor'
import { BlogExtensionService } from './blog/blogExtensionService'
import { container } from 'tsyringe'

process.on('uncaughtException', (err) => {
  console.log(err)
})

new NodeRequireInterceptor().install()
container.resolve(BlogExtensionService)
