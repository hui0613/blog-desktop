<template>
  <div class="dew-login" @click="test">login</div>
</template>

<script lang="ts" setup>
import { ipcTest } from '@render/utils/ipc'
const test = () => {
  ipcTest()
}
</script>

<style scoped lang="scss">
.dew-login {
  width: 100px;
  height: 100px;
  box-shadow: 2px 2px 4px #696666;
  border: 1px solid red;
}
</style>