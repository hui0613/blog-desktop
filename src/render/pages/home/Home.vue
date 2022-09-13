<template>
  <div class="dew-blog-container">
    <div class="dew-blog-header">
      <DewInput type="password" v-model:title="title">
        <template #prepend>标题</template>
      </DewInput>
      <div class="dew-operations">
        <button>发布</button>
      </div>
    </div>
    <div class="dew-platform-list">
      <div>发布平台</div>
      <div class="platform-list"></div>
    </div>
    <div class="editor-main">
      <dew-editor></dew-editor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import DewInput from '../../components/input/DewInput.vue'

const title = ref('')
</script>

<style lang="scss" scoped>
.dew-blog-container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .dew-blog-header {
    width: 100%;
    display: flex;
    padding: 10px 8px;
  }
  .dew-operations {
    padding: 0 20px;
    button {
      width: 80px;
      height: 40px;
      background-color: #b3cbcb;
      border: 1px solid #ccc;
      outline: none;
      border-radius: 4px;
    }
  }

  .dew-platform-list {
    padding: 20px;
  }
  .editor-main {
    flex-grow: 1;
    padding: 0 20px;
  }
}
</style>
