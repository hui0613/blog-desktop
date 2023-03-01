<template>
  <div class="editor-container">
    <div class="editor-top-layout">
      <div class="top-title">
        <el-input v-model="articleStore.title" placeholder="Enter article title"></el-input>
      </div>
      <div class="top-publish">
        <el-button type="primary" @click="togglePublishDrawer">发布</el-button>
      </div>
    </div>
    <div class="editor-edit-layout">
      <Editor></Editor>
    </div>
    <el-drawer v-model="showDrawer" :modal="true" :size="'40%'" :with-header="false">
      <publish-container @hideDrawer="togglePublishDrawer"></publish-container>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import Editor from '@render/components/editor/Editor.vue'
import PublishContainer from '@render/components/editor/PublishContainer.vue'
import { ElInput, ElButton, ElDrawer } from 'element-plus'
import { ref } from 'vue'
import { useArticleStore } from '@render/store'
import { updateArticle } from '@render/utils'

const articleStore = useArticleStore()

const showDrawer = ref(false)

const togglePublishDrawer = () => {
  showDrawer.value = !showDrawer.value
}

// 监听文章信息变化，、
articleStore.$subscribe((mutation, state) => {
  updateArticle(JSON.parse(JSON.stringify(state)))
})
</script>

<style lang="scss" setup>
.editor-container {
  .editor-top-layout {
    width: 100%;
    padding: 20px;
    display: flex;
    box-sizing: border-box;

    .top-title {
      width: 70%;
    }

    .top-publish {
      padding-left: 30px;
      width: 30%;
      box-sizing: border-box;
    }
  }
}
</style>
