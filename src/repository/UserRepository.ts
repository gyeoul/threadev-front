import HttpRepository from '../repository/HttpRepository'
import type Login from '../entity/user/Login'
import type SignUp from '../entity/user/SignUp'
import { inject, singleton } from 'tsyringe'
import UserProfile from '../entity/user/UserProfile'

@singleton()
export default class UserRepository {
  constructor(@inject(HttpRepository) private readonly httpRepository: HttpRepository) {}

  public validateEmail(email: string) {
    return this.httpRepository.post<boolean>({
      path: '/api/validate/email',
      body: { email }
    })
  }

  public validateHandle(handle: string) {
    return this.httpRepository.post<boolean>({
      path: '/api/validate/handle',
      body: { handle }
    })
  }

  public login(request: Login) {
    return this.httpRepository.post({
      path: '/api/auth/login',
      body: request
    })
  }
  public signup(request: SignUp) {
    return this.httpRepository.post({
      path: '/api/auth/signup',
      body: request
    })
  }

  public getProfile() {
    return this.httpRepository.get<UserProfile>(
      {
        path: '/api/users/me'
      },
      UserProfile
    )
  }
}
