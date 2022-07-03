<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { sendMessage } from './vscode'

export default defineComponent({
  mounted() {
    console.log(window)
  },
})
</script>
