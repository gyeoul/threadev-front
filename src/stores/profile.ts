import { defineStore } from 'pinia'
import { ref } from 'vue'
import type Profile from '../entity/user/Profile'

export const useProfileStore = defineStore(
  'profile',
  () => {
    const profile = ref<Profile>({
      id: '',
      name: '',
      handle: '',
      icon: ''
    } as Profile)

    function setProfile(record: Record<string, string>) {
      ({ id: profile.value.id, name: profile.value.name, handle: profile.value.handle, image: profile.value.icon } = record)
    }

    function logout() {
      profile.value.id = ''
      profile.value.name = ''
      profile.value.handle = ''
      profile.value.icon = ''
    }

    return { setProfile, profile, logout }
  }
)
