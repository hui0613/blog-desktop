<template>
<button @click="sendMessage">发送消息</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {sendMessage}  from './vscode'

export default defineComponent({
  mounted(){
    console.log(window)
  },
  methods:{
    sendMessage(){
      sendMessage({type:"test"})
    }
  }
    
})
</script>
