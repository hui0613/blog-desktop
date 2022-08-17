import { createApp } from 'vue'
import { openLoginPage } from './tools/vscode'
import DewEditor, { ImgMenu } from './components/markdown/main'

import './assets/styles/resetcss.scss'
import App from './App.vue'
import router from './router/router'

import 'element-plus/dist/index.css'

const app = createApp(App)

const imtMenuTool = ImgMenu({ api: 'aaa' })

// app.component('imtMenuTool', imtMenuTool)

app
  .use(function (vue) {
    const vm = vue
    vm.config.globalProperties.openLoginPage = openLoginPage
  })
  .use(
    DewEditor({
      toolbar: [imtMenuTool],
    })
  )

app.use(router).mount('#root')
