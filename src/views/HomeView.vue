<script setup lang="ts">
import { computed, onBeforeMount, provide, ref } from 'vue'
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon as OutlineHeart,
  ShareIcon,
  EllipsisVerticalIcon
} from '@heroicons/vue/24/outline'

import {
  HeartIcon as FilledHeart
} from '@heroicons/vue/24/solid'
import { container } from 'tsyringe'
import PostRepository from '@/repository/PostRepository'
import type PostPreview from '@/entity/post/PostPreview'
import router from '@/router'

const loading = ref(false)
const noMore = ref(false)
const disabled = computed(() => loading.value || noMore.value)
const POST_REPOSITORY = container.resolve(PostRepository)
const page = ref(1)
const posts = ref<[PostPreview]>([])


onBeforeMount(() => {
  load()
})

const load = () => {
  loading.value = true
  POST_REPOSITORY.getList(page.value)
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

// const readPost = (idx: number) => {
//   router.push({ name: 'post', params: { postId: idx } })
// }
</script>

<template>
  <div class="text-center">
    <ul
      v-infinite-scroll="load"
      class="content-view h-full p-0 m-0 list-none overflow-auto flex flex-col items-center"
      :infinite-scroll-disabled="disabled"
    >
      <li
        v-for="post in posts"
        :key="post.id"
        class="infinite-list-item m-2 justify-center flex items-center w-full max-w-xl"
      >
        <el-card class="w-full" shadow="hover" click="readPost(post.id)">
          <template #header>
            <div class="card-header flex flex-row justify-between">
              <div class="flex flex-row items-center gap-2">
                <el-avatar
                  :src=" post.icon ?? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                  :size="24"
                />
                <div class="flex flex-col justify-center items-start">
                  <span class="text-md font-bold">{{ post.name }}</span>
                  <p class="text-xs">@{{ post.handle }}</p>
                </div>
              </div>
              <div class="flex flex-row items-center">
                <el-button text>
                  <EllipsisVerticalIcon class="size-4" />
                </el-button>
              </div>
            </div>
          </template>
<!--          <template #footer>-->
<!--            <div class="w-full flex flex-row justify-end gap-2">-->
<!--              <el-button link class="p-0">-->
<!--                <OutlineHeart class="size-4" v-if="true" />-->
<!--                <FilledHeart class="size-4 fill-red-500" v-else />-->
<!--              </el-button>-->
<!--              <el-button link class="p-0">-->
<!--                <ChatBubbleOvalLeftIcon class="size-4" />-->
<!--              </el-button>-->
<!--              <el-button link class="p-0">-->
<!--                <ShareIcon class="size-4" />-->
<!--              </el-button>-->
<!--            </div>-->
<!--          </template>-->
          <router-link :to="{ name: 'post', params: { postId: post.id } }">
            <div class="min-h-20 text-start whitespace-pre">
              {{ post.content }}
            </div>
          </router-link>
        </el-card>
      </li>
    </ul>
    <p v-if="loading">Loading...</p>
    <el-divider v-if="noMore">
      <p v-if="posts.length < 1">
        첫 게시글을 작성해 보세요!
      </p>
    </el-divider>
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
