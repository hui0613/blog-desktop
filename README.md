
## 项目初始化

使用 electron-quick-start 作为项目模板，后面进行修改

## 添加 TypeScript

```shell
# 安装 typescript
yarn add typescript -D

# 初始化生成 tsconfig.json
tsc --init
```

## 修改目录

创建 src/main 目录，存放主进程代码

编辑 src/main/main.ts

```ts
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

```

编辑 src/main/preload.ts

```ts
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]!)
  }
})
```

## 安装 rollup

对于主进程的 ts 代码，使用 rollup 打包成 json

```shell
yarn add -D rollup 
```

### 配置 rollup

在根目录 rollup.config.js

```js
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import * as path from 'path'

export default {
  input: 'src/main/main.ts',
  output: {
    file: 'out/main.js',
    format: 'es'
  },
  plugins: [
    json(),
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    })
  ]
}
```
