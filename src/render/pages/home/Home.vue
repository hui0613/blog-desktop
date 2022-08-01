<template>
  <div>
    <button @click="openLogin">打开登陆界面</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  components: {},
  methods: {
    openLogin() {
      this.openLoginPage('qqqq').then((res) => {
        console.log(res)
      })
    },
  },
})
</script>
