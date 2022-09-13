<template>
  <div class="upload-file-container" @dragover.prevent="onDragover" @drop.prevent="fileDrop">
    <div class="upload-file-area" @click="handlerClick">
      <svg
        t="1660991865693"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2135"
        width="64"
        height="64"
      >
        <path
          d="M823.424 395.296l-287.52-289.248c-3.2-3.2-6.88-5.536-10.816-7.104C521.056 97.12 516.672 96 512 96c-11.264 0-20.704 6.176-26.4 14.976l-254.4 253.952c-12.512 12.48-12.544 32.736-0.032 45.248 6.24 6.272 14.432 9.376 22.656 9.376 8.16 0 16.352-3.104 22.624-9.344L480 206.976 480 768c0 17.696 14.336 32 32 32s32-14.304 32-32L544 204.96l234.048 235.456c6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312C835.84 428.096 835.904 407.84 823.424 395.296z"
          p-id="2136"
          fill="#1296db"
        ></path>
        <path
          d="M896 704c-17.696 0-32 14.304-32 32l0 128L160 864l0-128c0-17.696-14.336-32-32-32s-32 14.304-32 32l0 160c0 17.696 14.336 32 32 32l768 0c17.696 0 32-14.304 32-32l0-160C928 718.304 913.696 704 896 704z"
          p-id="2137"
          fill="#1296db"
        ></path>
      </svg>
      <p>点击上传文件或将文件拖入该区域</p>
    </div>
    <input class="upload-file-input" ref="input" type="file" multiple @change="fileChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const input = ref()
const emit = defineEmits(['file-list-change'])

const fileDrop = (event: any) => {
  emitFile(event.dataTransfer.files)
}

const onDragover = (event: any) => {
  // console.log('aa')
}

const handlerClick = (event: any) => {
  input.value.click()
}

function fileChange(e: any) {
  const files = e.target.files
  if (files.length) {
    emitFile(files)
  }
}

function emitFile(files: File[]) {
  emit('file-list-change', files)
}
</script>

<style lang="scss" scoped>
.upload-file-container {
  width: 100%;
  height: 100%;
  position: relative;
  .upload-file-area {
    width: 60%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    text-align: center;
    cursor: pointer;
    border: 1px solid #1296db;
  }
  .upload-file-input {
    display: none;
  }
}
</style>
