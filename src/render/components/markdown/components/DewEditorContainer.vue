<template>
  <div class="dew-editor-main-container">
    <div class="dew-editor-text-area" :style="{ height: editorTextAreaHeight + 'px' }">
      <div class="dew-editor-resize-bar"></div>
      <div class="dew-editor-resize-line"></div>
      <div class="dew-editor-textarea">
        <slot name="leftSection"></slot>
      </div>
    </div>
    <div class="dew-editor-preview-area" :style="{ height: editorTextAreaHeight + 'px' }">
      <slot name="rightSection"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DewEditorContainer',
  props: {
    editorTextAreaHeight: {
      type: Number,
    },
  },
  data() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.dew-editor-main-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  .dew-editor-text-area {
    background-color: #fff;
    position: relative;
    float: left;
    .dew-editor-textarea {
      position: absolute;
      top: 0;
      right: 5px;
      bottom: 0;
      left: 0;
      padding: 16px;
      overflow: hidden;
    }
    .dew-editor-resize-bar {
      width: 50vw;
      height: inherit;
      resize: horizontal;
      cursor: ew-resize;
      cursor: col-resize;
      opacity: 0;
      overflow: scroll;
    }
    /* 拖拽线 */
    .dew-editor-resize-line {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      border-right: 2px solid #eee;
      border-left: 1px solid #bbb;
      pointer-events: none;
    }
    .dew-editor-resize-bar:hover ~ .dew-editor-resize-line,
    .dew-editor-resize-bar:active ~ .dew-editor-resize-line {
      border-left: 1px dashed skyblue;
    }
    .dew-editor-resize-bar::-webkit-scrollbar {
      width: 50vw;
      height: inherit;
    }
  }
  .dew-editor-preview-area {
    padding: 16px;
    background-color: #eee;
    box-sizing: border-box;
    overflow: hidden;
  }
}

/* Firefox只有下面一小块区域可以拉伸 */
@supports (-moz-user-select: none) {
  .dew-editor-resize-bar:hover ~ .dew-editor-resize-line,
  .dew-editor-resize-bar:active ~ .dew-editor-resize-line {
    border-left: 1px solid #bbb;
  }
  .dew-editor-resize-bar:hover ~ .dew-editor-resize-line::after,
  .dew-editor-resize-bar:active ~ .dew-editor-resize-line::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: 0;
    right: -8px;
    background-size: 100% 100%;
  }
}
</style>
