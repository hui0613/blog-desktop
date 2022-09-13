<template>
  <div class="dew-input-container">
    <div class="dew-input-prepend">
      <slot name="prepend"></slot>
    </div>
    <input :type="props.type" @input="$emit('update:title', $event.target.value)" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
})

const emits = defineEmits(['update:title'])
</script>

<style lang="scss" scoped>
.dew-input-container {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  border: 1px solid #ccc;
  .dew-input-prepend {
    background-color: #eee;
    padding: 0 12px;
    height: 100%;
    line-height: 40px;
    color: #666;
  }
  input {
    flex-grow: 1;
    border: none;
    outline: none;
    padding-left: 16px;
  }
}
</style>
