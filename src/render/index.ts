import { createApp } from 'vue'
import { openLoginPage } from './tools/vscode'
import DewEditor from './components/markdown/main'

import './assets/styles/resetcss.scss'
import App from './App.vue'
import router from './router/router'

import 'element-plus/dist/index.css'

const app = createApp(App)

app
  .use(function (vue) {
    const vm = vue
    vm.config.globalProperties.openLoginPage = openLoginPage
  })
  .use(DewEditor({}))

app.use(router).mount('#root')
