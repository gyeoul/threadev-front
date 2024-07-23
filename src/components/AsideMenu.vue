<script setup lang="ts">
import { onUnmounted } from 'vue'
import UserRepository from '../repository/UserRepository'
import { container } from 'tsyringe'
import ProfileRepository from '../repository/ProfileRepository'
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  HomeIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import router from '../router'
import { ElMessage, ElMenuItem } from 'element-plus'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/profile'

const USER_REPOSITORY = container.resolve(UserRepository)
const PROFILE_REPOSITORY = container.resolve(ProfileRepository)
const profileStore = useProfileStore()

function onBeforeNavigation(fn) {
  const router = useRouter()
  const remove = router.beforeEach(fn)
  onUnmounted(remove)
}

onBeforeNavigation(() => {
  USER_REPOSITORY.getProfile().then((profile) => {
    PROFILE_REPOSITORY.setProfile(profile)
  }).catch(() => {
    PROFILE_REPOSITORY.clear()
  })
})

const logout = () => {
  PROFILE_REPOSITORY.clear()
  PROFILE_REPOSITORY.logout()
    .then(() => {
      ElMessage({ type: 'info', message: '로그아웃 되었습니다.' })
      router.push({ path: '/' })
    })
    .catch(() => {
      ElMessage({ type: 'error', message: '로그아웃에 실패했습니다.' })
    })
}
</script>
<template>
  <el-menu default-active="/" class="h-screen flex flex-col" router>
    <el-menu-item index="/" :route="{name:'home'}" @select="{}">
      <el-icon>
        <HomeIcon class="size-6" />
      </el-icon>
      <span>Home</span>
    </el-menu-item>
    <el-menu-item index="/search" :route="{ name: 'search' }">
      <el-icon>
        <MagnifyingGlassIcon class="size-6" />
      </el-icon>
      <span>Search</span>
    </el-menu-item>
    <div class="grow" />
    <template v-if="profileStore.profile.id !== ''">
      <el-menu-item index="/write" :route="{ name: 'write' }">
        <el-icon>
          <PencilIcon class="size-6" />
        </el-icon>
        <span>Write Post</span>
      </el-menu-item>
      <el-menu-item :index="'/profile/'+profileStore.profile.handle">
        <el-icon class="h-fit">
          <!--          <el-avatar class="w-48 h-48 aspect-square"/>-->
          <UserIcon class="size-6" />
        </el-icon>
        <el-row class="w-full">
          <el-col class="justify-center" :span="20"
                  style="display: flex; flex-direction: column; justify-content: center; align-items: start">
            <p class="p-0 m-0 text-md font-bold leading-7">{{ profileStore.profile.name }}</p>
            <span class="p-0 m-0 text-xs leading-3">@{{ profileStore.profile.handle }}</span>
          </el-col>
          <el-col :span="4"
                  style="display: flex; flex-direction: column; justify-content: center; align-items: start">
            <el-avatar
              :src="profileStore.profile.icon ?? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
          </el-col>
        </el-row>
      </el-menu-item>
    </template>
    <el-menu-item index="/login" v-if="profileStore.profile.id===''" :route="{ name: 'login' }">
      <el-icon>
        <ArrowRightEndOnRectangleIcon class="size-6" />
      </el-icon>
      <span>Log in / Register</span>
    </el-menu-item>
    <el-menu-item index="/logout" v-else @click="logout()">
      <el-icon>
        <ArrowRightStartOnRectangleIcon class="size-6" />
      </el-icon>
      <span>Log out</span>
    </el-menu-item>
  </el-menu>
</template>
