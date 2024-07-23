import type UserProfile from '@/entity/user/UserProfile'
import { instanceToPlain } from 'class-transformer'
import { inject, singleton } from 'tsyringe'
import HttpRepository from '@/repository/HttpRepository'
import { type Ref, ref, type UnwrapRef } from 'vue'
import { useProfileStore } from '@/stores/profile'
import type Profile from '@/entity/user/Profile'
import type {
  _ExtractActionsFromSetupStore,
  _ExtractGettersFromSetupStore,
  _ExtractStateFromSetupStore,
  Store
} from 'pinia'

@singleton()
export default class ProfileRepository {
  private store: Store<'profile',
    _ExtractStateFromSetupStore<{
      logout: () => void;
      profile: Ref<UnwrapRef<Profile>>;
      setProfile: (record: Record<string, string>) => void
    }>,
    _ExtractGettersFromSetupStore<{
      logout: () => void;
      profile: Ref<UnwrapRef<Profile>>;
      setProfile: (record: Record<string, string>) => void
    }>,
    _ExtractActionsFromSetupStore<{
      logout: () => void;
      profile: Ref<UnwrapRef<Profile>>;
      setProfile: (record: Record<string, string>) => void
    }>>

  constructor(@inject(HttpRepository) private readonly httpRepository: HttpRepository) {
    this.store = useProfileStore()
  }

  public setProfile(profile: UserProfile) {

    const json = instanceToPlain(profile)
    localStorage.setItem('profile', JSON.stringify(json))
    this.store.setProfile(json)
  }

  public logout() {
    return this.httpRepository.post({
      path: '/api/auth/logout'
    })
  }

  public clear() {
    localStorage.clear()
    this.store.logout()
  }
}
