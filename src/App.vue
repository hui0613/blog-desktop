<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

const containerRect = reactive({
  width: '0px',
  height: '0px',
})

onMounted(() => {
  containerRect.height = `${window.innerHeight}px`
  containerRect.width = `${window.innerWidth}px`
})
</script>

