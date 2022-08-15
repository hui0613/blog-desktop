<template>
  <div class="dew-blog-container">
    <div class="dew-blog-header">
      <DewInput type="password" v-model:title="title">
        <template #prepend>标题</template>
      </DewInput>
    </div>
    <dew-editor></dew-editor>
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
  .dew-blog-header {
    width: 80%;
    padding: 10px 8px;
  }
}
</style>
