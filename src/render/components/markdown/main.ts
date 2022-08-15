import { App } from 'vue'
import editor from './DewEditor.vue'
import ImgMenu from './packages/ImgMenu.vue'
import './DewEditor.scss'

function DewEditor(config: { [key: string]: any }) {
  const { toolBar } = config
  const $editor = {
    extends: editor,
    props: {
      menuList: {
        type: Array,
        default: () => Object.freeze(toolBar),
      },
    },
  }

  return {
    install(app: App) {
      app.component('dew-editor', $editor)
    },
  }
}

export { ImgMenu }

export default DewEditor
