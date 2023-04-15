<template>
  <div class="publish-container">
    <div class="publish-common-info">
      <el-form>
        <el-form-item label="文章封面">
          <el-upload
            :limit="1"
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
          >
            <img v-if="articleStore.cover_image" :src="articleStore.cover_image" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <svg
                t="1675261602685"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2662"
                width="32"
                height="32"
              >
                <path
                  d="M426.666667 426.666667H85.546667A85.418667 85.418667 0 0 0 0 512c0 47.445333 38.314667 85.333333 85.546667 85.333333H426.666667v341.12c0 47.274667 38.186667 85.546667 85.333333 85.546667 47.445333 0 85.333333-38.314667 85.333333-85.546667V597.333333h341.12A85.418667 85.418667 0 0 0 1024 512c0-47.445333-38.314667-85.333333-85.546667-85.333333H597.333333V85.546667A85.418667 85.418667 0 0 0 512 0c-47.445333 0-85.333333 38.314667-85.333333 85.546667V426.666667z"
                  fill="#666666"
                  p-id="2663"
                ></path>
              </svg>
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea" :rows="10" resize="none" v-model="articleStore.brief_content"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="underline"></div>
    <div class="publish-operation">
      <el-button @click="cancelPublish">取消</el-button>
      <el-button type="primary" @click="publish">确定发布</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElForm, ElFormItem, ElUpload, ElIcon, ElInput, ElButton } from 'element-plus'
import { useArticleStore } from '@render/store'
import { publishArticle } from '@render/utils'

const emit = defineEmits(['hideDrawer'])

const articleStore = useArticleStore()

const cancelPublish = () => {
  emit('hideDrawer')
}

const publish = () => {
  publishArticle(articleStore.getArticleInfo)
}
</script>

<style lang="scss" setup>
.publish-container {
  .avatar-uploader,
  .avatar-uploader-icon {
    width: 100px;
    height: 100px;
  }
  .avatar-uploader {
    border-radius: 4px;
    border: 1px solid #eeeeee;
  }
  .underline {
    width: 100%;
    height: 1px;
    background-color: #cccccc;
    margin: 10px 0;
  }
  .publish-operation {
    text-align: right;
  }
}
</style>
