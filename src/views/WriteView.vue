<script setup lang="ts">
import { reactive, ref } from 'vue'

import { container } from 'tsyringe'
import { ElMessage } from 'element-plus'
import type HttpError from '@/http/HttpError'
import PostRepository from '@/repository/PostRepository'
import PostWrite from '@/entity/post/PostWrite'
import '@toast-ui/editor/dist/toastui-editor.css'


const POST_REPOSITORY = container.resolve(PostRepository)

const state = reactive({
  post: new PostWrite()
})


const write = function() {
  POST_REPOSITORY.write(state.post).then(() => {
    ElMessage({ type: 'success', message: '글 작성 완료' })
    location.href = '/'
  }).catch((e: HttpError) => {
    ElMessage({ type: 'error', message: e.getMessage() })
  })
}
</script>

<template>
  <div>
    <el-input v-model="state.post.content" :rows="15" type="textarea" placeholder="내용을 입력해주세요" />
  </div>
  <div class="mt-4">
    <el-button type="primary" @click="write">글 작성완료</el-button>
  </div>
</template>

<style scoped></style>
