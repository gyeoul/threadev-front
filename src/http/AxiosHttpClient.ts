import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse
} from 'axios'
import HttpError from '../http/HttpError'
import { singleton } from 'tsyringe'

export type HttpRequestConfig = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  path: string
  params?: any
  body?: any
}

@singleton()
export default class AxiosHttpClient {
  private readonly client: AxiosInstance = axios.create({
    timeout: 3000,
    timeoutErrorMessage: '타임아웃 오류'
  })

  public async request(config: HttpRequestConfig) {
    return this.client
      .request({
        method: config.method,
        url: config.path,
        params: config.params,
        data: config.body
      })
      .then((response: AxiosResponse) => {
        return response.data
      })
      .catch((e: AxiosError) => {
        return Promise.reject(new HttpError(e))
      })
  }
}
