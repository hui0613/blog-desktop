import { Menu } from 'electron'
import * as path from 'path'
import { loadBlogConfig } from '../utils/plugin'
import { commonMenu } from './defaultMenu'
import { createWindow } from '../window/windowManage'

export function generateMenuArr(): Menu {
  const pluginRoot = path.resolve(__dirname, '../extensions')
  const configs = loadBlogConfig(pluginRoot)
  const blogMenu: any = {
    label: '平台',
    submenu: [],
  }

  if (!configs.length) {
    return Menu.buildFromTemplate(commonMenu)
  }
  commonMenu.push(blogMenu)

  configs.forEach((config) => {
    blogMenu.submenu.push({
      label: config.name,
      toolTip: '点击跳转到登陆界面',
      click: () => {
        createWindow({ loadUrl: config.platform_login })
      },
    })
  })

  return Menu.buildFromTemplate(commonMenu)
}
