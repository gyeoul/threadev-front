import type { AxiosError } from 'axios'

export default class HttpError {
  private readonly code: string
  private readonly message: string

  constructor(e: AxiosError<any>) {
    this.code = e.response?.data.code ?? '500'
    this.message = e.response?.data.message ?? '네트워크 상태가 좋지 않습니다. 다시 시도해주세요.'
  }

  public getMessage() {
    return this.message
  }
}
