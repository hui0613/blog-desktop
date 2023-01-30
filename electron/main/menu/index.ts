import { Menu } from 'electron'
import * as path from 'path'
import type { BrowserWindow } from 'electron'
import { loadBlogConfig } from '@main/main/utils/plugin'
import { commonMenu } from './defaultMenu'


function generateMenuArr() {

  const pluginRoot = path.resolve(__dirname, '../blog')
  const configs = loadBlogConfig(pluginRoot)
  const blogMenu = {
    label: '平台',
    submenu: []
  }

  if (!configs.length) {
    return
  }
  commonMenu.push(blogMenu)

  configs.forEach(config => {
    blogMenu.submenu.push({
      label: config.name,
      toolTip: "点击跳转到登陆界面",
      click: () => {
        console.log(config.platform_login)
      }
    })
  })

  return commonMenu
}

export function buildMenu(win: BrowserWindow) {
  const m = Menu.buildFromTemplate(generateMenuArr())
  Menu.setApplicationMenu(m)
}