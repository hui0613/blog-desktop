import * as fs from 'fs'
import * as path from 'path'

export function loadBlogConfig(pluginRoot: string) {
  console.log('dddddd')
  console.log(pluginRoot)
  const dirs = fs.readdirSync(pluginRoot)

  let configs: any = []

  dirs.forEach((item) => {
    const absolutePath = path.resolve(pluginRoot, item)
    const stats = fs.statSync(absolutePath)
    if (!stats.isDirectory()) {
      return
    }

    const pluginConfig = loadPluginConfig(absolutePath)

    pluginConfig.entry = path.resolve(absolutePath, pluginConfig.main)

    pluginConfig && configs.push(pluginConfig)
  })

  return configs
}

function loadPluginConfig(pluginPath: string) {
  const configPath = path.resolve(pluginPath, 'package.json')

  if (!fs.existsSync(configPath)) {
    console.error('Not found plugin config')
    return null
  }

  const config = require(path.resolve(pluginPath, 'package.json'))

  return config
}
