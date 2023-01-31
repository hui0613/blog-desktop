<template>
  <div class="home-container">
    <div class="home-feature-layout" @click="toEditor">
      <div class="feature-icon">
        <svg t="1675145954670" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="2227" width="32" height="32">
          <path
            d="M541.769 543.843c0-16.46-16.203-29.804-36.192-29.804h-260.58c-19.988 0-36.192 13.344-36.192 29.804s16.204 29.804 36.192 29.804h260.58c19.989 0 36.192-13.344 36.192-29.804zM678.857 354.588c0-16.46-22.875-29.804-51.093-29.804H259.898c-28.218 0-51.093 13.344-51.093 29.804s22.875 29.804 51.093 29.804h367.866c28.218 0 51.093-13.344 51.093-29.804zM226 701.804c-9.497 0-17.195 13.344-17.195 29.804s7.698 29.804 17.195 29.804h199.461c9.496 0 17.195-13.344 17.195-29.804s-7.698-29.804-17.195-29.804H226z"
            fill="#E75934" p-id="2228"></path>
          <path
            d="M778.06 752.471c-16.46 0-29.804 13.343-29.804 29.804 0 73.952-60.165 134.118-134.118 134.118H281.825c-73.952 0-134.118-60.165-134.118-134.118v-524.55c0-73.952 60.165-134.118 134.118-134.118h332.314c73.952 0 134.118 60.165 134.118 134.118 0 16.46 13.344 29.804 29.804 29.804 16.461 0 29.804-13.344 29.804-29.804C807.864 150.905 720.959 64 614.139 64H281.825C175.005 64 88.1 150.905 88.1 257.725v524.549C88.099 889.096 175.005 976 281.825 976h332.314c106.82 0 193.725-86.904 193.725-193.725 0-16.461-13.343-29.804-29.804-29.804z"
            fill="#E75934" p-id="2229"></path>
          <path
            d="M914.441 374.894c-26.835-26.835-70.342-26.835-97.177 0L525.733 666.425 512.236 777.1l110.675-13.497 291.531-291.531c26.834-26.836 26.834-70.344-0.001-97.178z"
            fill="#E75934" p-id="2230"></path>
        </svg>
      </div>
      <span class="feature-title">写文章</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { createArticle } from '@render/utils/ipc'

const router = useRouter()

const toEditor = () => {
  createArticle('')
  router.push('/editor')
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  .home-feature-layout {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid #eeeeee;

    &:hover {
      transform: scale(1.01);
      box-shadow: 2px 4px 4px #eeeeee;
    }

    .feature-title {
      margin-top: 8px;
    }
  }
}
</style>