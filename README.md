
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

## 配置 eslint 和 prettier

> vscode 需要安装 eslint 和 prettier 插件配合使用

安装依赖

```shell
yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint -D
```

### 添加配置

- .eslintrc.js

```js
const eslintrc = {
  parser: '@typescript-eslint/parser', // 使用 ts 解析器
  extends: [
    'eslint:recommended', // eslint 推荐规则
    'plugin:@typescript-eslint/recommended', // ts 推荐规则
  ],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {}, // 自定义
}

module.exports = eslintrc
```

- .prettierrc

```json
{
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 140
}
```

- tsconfig.eslint.json

```json
/* tsconfig.eslint.json */
{
  "compilerOptions": {
    "baseUrl": ".",
    "resolveJsonModule": true,
  },
  "include": [
    "**/*.ts",
    "**/*.js"
  ]
}
```

## 修改项目运行路径

修改 `package.json` 中的 `main` 字段， 与 `rollup.config.js` 中 `main.ts` 输出一样。在将 `ts` 转换成 `js` 之后，执行 `yarn start` ，正常应该是可以启动应用的

## 添加 render 项目

使用 vueCli 创建一个 vue 3 项目，然后将相关配置合并过来
