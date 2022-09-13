<template>
  <div class="dew-img-menu-container">
    <div class="img-menu-icon-container" @click="toggleImgMenuStatus">
      <svg
        t="1660833968170"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2162"
        width="16"
        height="16"
      >
        <path
          d="M853.161077 892.549156 362.595248 892.549156l-209.432916-0.413416c-0.605797-0.001023-1.210571-0.031722-1.813299-0.092098-24.848944-2.484587-47.825238-14.060227-64.696488-32.594349-16.990976-18.665105-26.349111-42.85504-26.349111-68.112284L60.303434 264.62596c0-55.80805 45.403073-101.211123 101.211123-101.211123l691.645496 0c55.80805 0 101.2101 45.403073 101.2101 101.211123l0 225.51315c0 0.275269-0.00614 0.551562-0.01842 0.825808-0.021489 0.494257-1.971911 51.723012 15.481599 85.46244 4.716418 9.118682 1.14815 20.335141-7.970532 25.052582-9.116635 4.714372-20.335141 1.149173-25.052582-7.970532-21.300119-41.176818-19.844977-97.642854-19.618826-103.738689L917.191392 264.62596c0-35.307134-28.724205-64.031339-64.031339-64.031339L161.51558 200.594621c-35.307134 0-64.031339 28.724205-64.031339 64.031339l0 526.71105c0 32.755008 24.320918 59.957557 56.717769 63.61997l208.4311 0.412392 490.528989 0c35.307134 0 64.031339-28.725228 64.031339-64.032362l-0.382717-93.676519c-0.104377-1.749854-1.587148-19.548218-19.549242-42.499953-0.050142-0.063445-0.098237-0.125867-0.147356-0.190335L875.401614 626.481358 758.174726 471.362464c-0.415462-0.550539-38.995129-50.852178-86.271876-45.534056-38.335097 4.314259-75.954903 45.163619-108.789729 118.131491-17.615193 39.141462-34.650171 68.26885-52.082192 89.046059-17.607006 20.985964-35.679617 33.519418-55.251372 38.316677-43.422975 10.638291-81.049944-18.99461-120.886231-50.372248l-5.057179-3.980661c-46.555315-36.57808-68.750827-28.223808-158.330028 59.60247-7.330966 7.187703-19.101033 7.071046-26.288736-0.25992-7.187703-7.330966-7.071046-19.101033 0.25992-26.287713 46.658669-45.74588 77.544097-72.726372 107.085924-84.282568 33.357735-13.048177 64.274886-6.266727 100.242052 21.99392l5.092995 4.00829c33.9226 26.719548 63.219857 49.795103 89.028663 43.466977 25.618471-6.279007 53.30095-42.114167 82.279958-106.508779 39.139415-86.97591 85.837994-134.027529 138.79716-139.849118 68.454068-7.515161 117.823476 57.404408 119.891578 60.171428l117.122511 154.980747 21.599947 28.343535c26.276457 33.630958 27.333532 61.638849 27.367301 64.72514 0.001023 0.042979 0.001023 0.084934 0.001023 0.127913l0.38374 94.059236C954.371176 847.146083 908.969127 892.549156 853.161077 892.549156z"
          p-id="2163"
        ></path>
        <path
          d="M312.328401 446.967868c-42.324968 0-76.759221-34.434254-76.759221-76.759221s34.434254-76.759221 76.759221-76.759221 76.759221 34.434254 76.759221 76.759221S354.654392 446.967868 312.328401 446.967868zM312.328401 330.628186c-21.824051 0-39.579437 17.755386-39.579437 39.579437s17.755386 39.579437 39.579437 39.579437 39.579437-17.755386 39.579437-39.579437S334.153476 330.628186 312.328401 330.628186z"
          p-id="2164"
        ></path>
      </svg>
    </div>
    <div class="img-menu-operation-container" v-if="showImgDialog">
      <div class="img-menu-nav">
        <div class="img-menu-nav-item img-menu-upload-nav">上传图片</div>
        <div class="img-menu-nav-item img-menu-pic-bed">图床图片</div>
      </div>
      <div class="img-menu-insert-way-container">
        <div v-if="uploadFileWay" class="img-insert-way-item upload-file-way">
          <UploadFile @file-list-change="fileListChange"></UploadFile>
        </div>
        <div v-if="!uploadFileWay" class="img-insert-way-item"></div>
      </div>
      <div class="img-menu-bottom-option">
        <button class="img-menu-bottom-cancel" @click="toggleImgMenuStatus">取消</button
        ><button class="img-menu-bottom-confirm">确定</button>
      </div>
    </div>
    <div class="img-menu-mask" v-if="showImgDialog"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref, defineProps, onMounted } from 'vue'
import UploadFile from '../../../components/upload/UploadFile.vue'
import axios from 'axios'

const emit = defineEmits(['insertContent'])
const showImgDialog = ref<boolean>(true)
const uploadFileWay = ref<boolean>(true)

const props = defineProps({
  api: {
    type: String,
    default: '',
  },
})

const insertContent = (event: any) => {
  event.preventDefault()
  emit('insertContent', 'add img')
}

function fileListChange(files: File[]) {
  uploadFile(files)
}

function uploadFile(files: File[], data?: { [key: string]: any }) {
  let formData = new FormData() //  构造表单实例对象

  if (data) {
    for (const key in data) {
      formData.append(key, data[key])
    }
  }

  for (let i = 0, len = files.length; i < len; i++) {
    formData.append('files', files[i])
  }
  axios({
    url: props.api,
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

function toggleImgMenuStatus() {
  console.log('ccccc')
  showImgDialog.value = !showImgDialog.value
}

onMounted(() => {
  console.log('=======')
  console.log(props)
})
</script>

<style lang="scss">
.dew-img-menu-container {
  .img-menu-icon-container {
    width: 100%;
    height: 100%;
  }
  .img-menu-operation-container {
    width: 50vw;
    height: 30vw;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    z-index: 999;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    cursor: default;
    border: 1px solid #999;

    .img-menu-nav {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-around;
      line-height: 60px;
      border-bottom: 1px solid #999;
      .img-menu-nav-item {
        flex-grow: 1;
        cursor: pointer;
        text-align: center;
        &:active {
          background-color: #eee;
        }
      }
    }
    .img-menu-insert-way-container {
      width: 100%;
      flex-grow: 1;
      .img-insert-way-item {
        width: 100%;
        height: 100%;
      }
    }
  }
  .img-menu-bottom-option {
    display: flex;
    padding: 20px;
    justify-content: flex-end;
    button {
      background-color: none;
      border: none;
      outline: none;
      padding: 8px 20px;
      margin-right: 20px;
      cursor: pointer;
      border-radius: 4px;
    }

    .img-menu-bottom-cancel {
      background-color: #eee;
    }
    .img-menu-bottom-confirm {
      background-color: #1296db;
      color: #ffffff;
    }
  }

  .img-menu-mask {
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(153, 153, 153, 0.613);
  }
}
</style>
