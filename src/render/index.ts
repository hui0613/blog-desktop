import { createApp } from 'vue'
import { openLoginPage } from './tools/vscode'

import App from './App.vue'
import router from './router/router'

const app = createApp(App)

app.use(function (vue) {
  const vm = vue
  vm.config.globalProperties.openLoginPage = openLoginPage
})

app.use(router).mount('#root')
