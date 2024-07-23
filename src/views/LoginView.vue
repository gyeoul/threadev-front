<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import Login from '../entity/user/Login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import type HttpError from '../http/HttpError'
import UserRepository from '../repository/UserRepository'
import { container } from 'tsyringe'
import router from '../router'
import { useProfileStore } from '../stores/profile'
import ProfileRepository from '../repository/ProfileRepository'

const state = reactive({
  login: new Login()
})
const USER_REPOSITORY = container.resolve(UserRepository)
const PROFILE_REPOSITORY = container.resolve(ProfileRepository)

onBeforeMount(() => {
  if (useProfileStore().profile.id.length > 1) {
    router.replace({ path: '/' })
    return
  }
})

const setProfile = () => {
  USER_REPOSITORY.getProfile()
    .then((profile) => {
      PROFILE_REPOSITORY.setProfile(profile)
    })
    .catch(() => {
      PROFILE_REPOSITORY.clear()
    })
}

const doLogin = () => {
  USER_REPOSITORY.login(state.login)
    .then(() => {
      setProfile()
      ElMessage({ type: 'success', message: '환영합니다 :)' })
      router.replace({ path: '/' })
    })
    .catch((e: HttpError) => {
      ElMessage({ type: 'error', message: e.getMessage() })
    })
}
</script>

<template>
  <el-row>
    <el-col :span="10" :offset="7">
      <el-form label-position="top">
        <el-form-item label="이메일">
          <el-input v-model="state.login.email"></el-input>
        </el-form-item>

        <el-form-item label="비밀번호">
          <el-input type="password" v-model="state.login.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="w-full" @click="doLogin()">로그인</el-button>
        </el-form-item>

        <!--        <el-form-item>-->
        <div class="w-full text-neutral-500 text-center">
          <router-link to="/register">회원가입</router-link>
        </div>
        <!--          <el-button type="primary" class="w-full"></el-button>-->
        <!--        </el-form-item>-->
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss"></style>
