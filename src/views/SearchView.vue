<script setup lang="ts">
import { computed, ref } from 'vue'
import { container } from 'tsyringe'
import ProfileRepository from '@/repository/ProfileRepository'
import SearchRepository from '@/repository/SearchRepository'
import type PostPreview from '@/entity/post/PostPreview'

const SEARCH_REPOSITORY = container.resolve(SearchRepository)
const input = ref('')
const page = ref(1)
const loading = ref(false)
const noMore = ref(false)
const disabled = computed(() => loading.value || noMore.value)
const posts = ref<[PostPreview]>([])

const search = () => {
  console.log(input.value)
  page.value = 1
  posts.value = []
  load()
}

const load = () => {
  loading.value = true
  SEARCH_REPOSITORY.searchPost(input.value, page.value)
    .then((res) => {
      if (res.items.length < 1) {
        noMore.value = true
      }
      if (page.value === 1) {
        posts.value.unshift(...res.items)
      } else {
        posts.value.push(...res.items)
      }
      page.value++
      loading.value = false
    })
    .catch((e) => {
      console.error(e)
    })
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="w-full flex flex-row gap-2 max-w-xl">
      <el-input
        v-model="input"
        class="w-auto"
        placeholder="검색어를 입력해 주세요"
        clearable
      />
      <el-button @click="search">search</el-button>
    </div>
  </div>
</template>

<style scoped>

</style>
