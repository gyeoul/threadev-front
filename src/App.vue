<script setup lang="ts">
import { RouterView } from 'vue-router'
import AsideMenu from '@/components/AsideMenu.vue'
import { ElAffix, ElContainer, ElHeader, ElMain, ElFooter, ElAside } from 'element-plus'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { onBeforeUpdate } from 'vue'


onBeforeUpdate(() => {
  console.log('update...')
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="affix-container h-screen max-w-md w-1/5">
        <el-affix target=".affix-container" :offset="0" class="h-screen">
          <AsideMenu />
        </el-affix>
      </el-aside>
      <el-container class="h-screen max-h-screen">
        <el-header class="flex justify-between"><HeaderComponent /></el-header>
        <el-main
          class="relative h-full max-h-full p-0 overflow-auto content-view flex flex-row items-center align-middle"
        >
          <RouterView />
        </el-main>
<!--        <el-footer class="absolute right-0 bottom-0">-->
<!--          <div class="bg-blue-400 text-white px-8 py-4 rounded-full border-solid border border-slate-200">-->
<!--            New Post-->
<!--          </div>-->
<!--        </el-footer>-->
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.content-view::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.content-view {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}
</style>
