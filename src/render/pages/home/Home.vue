<template>
  <div>
    <button @click="openLogin">打开登陆界面</button>
    <dew-editor></dew-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  methods: {
    openLogin() {
      this.openLoginPage('qqqq').then((res) => {
        console.log(res)
      })
    },
  },
})
</script>

<style lang="scss" scoped>
button {
  color: red;
}
</style>
