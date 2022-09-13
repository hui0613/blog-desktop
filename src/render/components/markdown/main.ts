/* eslint-disable @typescript-eslint/ban-ts-comment */
import { App } from 'vue'
import editor from './DewEditor.vue'
import ImgMenu from './packages/imgMenu/index'
import './DewEditor.scss'

function DewEditor(config: { [key: string]: any }) {
  const { toolbar } = config
  const $editor = {
    extends: editor,
    props: {
      menuList: {
        type: Array,
        default: () => Object.freeze(toolbar),
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
