<template>
  <el-form
    ref="ruleFormRef"
    :model="signUpForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm w-full flex flex-col items-center justify-center"
    :size="formSize"
    status-icon
  >
    <div class="w-full max-w-screen-md">

      <el-form-item label="Email" prop="email">
        <el-input v-model="signUpForm.email" />
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="signUpForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Password Confirm" prop="validpassword">
        <el-input v-model="signUpForm.validpassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-divider />
      <el-form-item label="User name" prop="name">
        <el-input v-model="signUpForm.name" />
      </el-form-item>
      <el-form-item label="Handle" prop="handle">
        <el-input v-model="signUpForm.handle">
          <template #prepend>
            <AtSymbolIcon class="size-4" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> Submit</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { type ComponentSize, ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { AtSymbolIcon } from '@heroicons/vue/24/outline'
import { container } from 'tsyringe'
import UserRepository from '../repository/UserRepository'
import type HttpError from '../http/HttpError'
import router from '../router'
import type SignUp from '../entity/user/SignUp'

const USER_REPOSITORY = container.resolve(UserRepository)

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const signUpForm = reactive<SignUp>({
  email: '',
  handle: '',
  name: '',
  password: '',
  validpassword: ''
})
const rules = reactive<FormRules<SignUp>>({
  email: [
    {
      required: true,
      message: '이메일을 입력해주세요',
      trigger: 'blur'
    },
    {
      type: 'regexp',
      message: '이메일 형식에 맞게 입력해주세요',
      pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    }
  ],
  name: [
    { required: true, message: '사용자 이름을 입력해주세요', trigger: 'blur' },
    { max: 20, message: '사용자 이름은 최대 20 자 입니다', trigger: 'blur' }
  ],
  handle: [
    {
      required: true,
      message: '핸들 ID 를 입력해주세요',
      trigger: 'change'
    },
    {
      min: 5,
      max: 30,
      message: '5~30 자 사이로 입력해주세요',
      trigger: 'change'
    },
    {
      validator(rule, value, callback, source, options) {
        if (/^[a-zA-Z0-9_.]\w+$/.test(value)) {
          callback()
        } else {
          callback(new Error('핸들 ID 는 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다'))
        }
      },
      message: '핸들 ID 는 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다',
      trigger: 'change'
    },
    {
      asyncValidator: (rule, value, callback) => {
        USER_REPOSITORY.validateHandle(value)
          .then(() => {
            callback()
          }).catch((error) => {
          callback(new Error(error))
        })
      },
      message(reason) {
        return reason ?? '사용할 수 없는 핸들 ID 입니다'
      },
      trigger: 'input'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'change'
    },
    {
      min: 6,
      max: 20,
      message: '6~20 자 사이로 입력해주세요',
      trigger: 'change'
    },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('비밀번호를 입력해주세요'))
        } else {
          if (signUpForm.validpassword !== '') {
            if (!ruleFormRef.value) return
            // ruleFormRef.value.validateField('checkPass')
          }
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  validpassword: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('비밀번호를 다시 입력해주세요'))
        } else if (value !== signUpForm.password) {
          callback(new Error('비밀번호가 일치하지 않습니다'))
        } else {
          callback()
        }
      },
      message: '비밀번호가 일치하지 않습니다',
      trigger: 'blur'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    // console.log(valid)
    // console.log(fields)
    if (valid) {
      USER_REPOSITORY.signup(signUpForm)
        .then(() => {
          ElMessage({ type: 'success', message: '환영합니다 :)' })
          router.replace({ name: 'login' })
        })
        .catch((e: HttpError) => {
          ElMessage({ type: 'error', message: e.getMessage() })
        })
      console.log('submit!')
    } else {
      ElMessage({ type: 'error', message: '입력값 검증에 실패했습니다.' })
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
//this.value = transliterate(evt.target.value.toUpperCase());

</script>

<style scoped></style>
