<template>
  <div class="editor-container">
    <div class="editor" ref="editor"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { updateArticle } from '@render/utils/ipc'

import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const editor = ref()

onMounted(() => {
  initEditor()
});

const initEditor = () => {
  const editorInstance: Editor = new Editor({
    el: editor.value,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    events: {
      change: () => {
        contentChangeListener(editorInstance)
      }
    }
  });
  initEditorListener(editorInstance)
}

const initEditorListener = (editor: Editor) => {

  editor.eventEmitter.removeEventHandler('addImageBlobHook')
  editor.eventEmitter.listen('addImageBlobHook', (...args: any[]) => {
    // 这里上传图片，然后调用回调，将图片链接插入到 markdown 中
    args[1]('http://sdfsd', 'sdf')
  })
}

const contentChangeListener = (editor: Editor) => {
  // markdown 内容发生变化，进行分发
  updateArticle({
    mark_content: editor.getMarkdown(),
    html_content: editor.getHTML()
  })
}



</script>