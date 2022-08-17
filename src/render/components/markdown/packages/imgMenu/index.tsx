/* eslint-disable guard-for-in */
import { defineComponent, defineEmits, ref, defineProps, onMounted } from 'vue'
import axios from 'axios'
import UploadFile from '../../components/upload/UploadFile.vue'
import SvgIcon from '../../components/SvgIcon/index.vue'
import './index.scss'

function ImgMenu(options: { [key: string]: any }) {
  const { api } = options
  // eslint-disable-next-line global-require
  require('../../assets/icons/picture.svg')

  const $imgMenu = defineComponent({
    setup(props, ctx) {
      const emit = defineEmits(['insertContent'])
      const showImgDialog = ref<boolean>(false)
      const uploadFileWay = ref<boolean>(true)

      const insertContent = (event: any) => {
        event.preventDefault()
        emit('insertContent', 'add img')
      }

      function uploadFile(files: File[], data?: { [key: string]: any }) {
        const formData = new FormData() //  构造表单实例对象

        if (data) {
          for (const key in data) {
            formData.append(key, data[key])
          }
        }

        for (let i = 0, len = files.length; i < len; i += 1) {
          formData.append('files', files[i])
        }
        axios({
          url: api,
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((res: any) => {
            console.log(res)
          })
          .catch((err: any) => {
            console.log(err)
          })
      }

      function fileListChange(files: File[]) {
        uploadFile(files)
      }

      function toggleImgMenuStatus() {
        showImgDialog.value = !showImgDialog.value
      }

      return () => (
        <div>
          <div class="dew-img-menu-container">
            <div class="img-menu-icon-container" onClick={toggleImgMenuStatus}>
              <SvgIcon iconClass="picture"></SvgIcon>
            </div>
            {!showImgDialog.value ? (
              ''
            ) : (
              <div class="img-menu-operation-container">
                <div class="img-menu-nav">
                  <div class="img-menu-nav-item img-menu-upload-nav">上传图片</div>
                  <div class="img-menu-nav-item img-menu-pic-bed">图床图片</div>
                </div>
                <div class="img-menu-insert-way-container">
                  {uploadFileWay ? (
                    <div class="img-insert-way-item upload-file-way">
                      <UploadFile onFile-list-change={fileListChange}></UploadFile>
                    </div>
                  ) : (
                    <div v-if={!uploadFileWay} class="img-insert-way-item"></div>
                  )}
                </div>
                <div class="img-menu-bottom-option">
                  <button class="img-menu-bottom-cancel" onClick={toggleImgMenuStatus}>
                    取消
                  </button>
                  <button class="img-menu-bottom-confirm">确定</button>
                </div>
              </div>
            )}
            {showImgDialog.value ? <div class="img-menu-mask"></div> : ''}
          </div>
        </div>
      )
    },
  })
  return $imgMenu
}

export default ImgMenu
