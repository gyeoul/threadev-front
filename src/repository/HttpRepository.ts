import AxiosHttpClient, { type HttpRequestConfig } from '@/http/AxiosHttpClient'
import { inject, singleton } from 'tsyringe'
import { plainToInstance } from 'class-transformer'
import Null from '@/entity/data/Null'
import Paging from '@/entity/data/Paging'

@singleton()
export default class HttpRepository {
  constructor(@inject(AxiosHttpClient) private readonly httpClient: AxiosHttpClient) {
  }

  public async get<T>(config: HttpRequestConfig, clazz: { new(...args: any[]): T }): Promise<T> {
    const response = await this.httpClient.request({ ...config, method: 'GET' })
    return plainToInstance(clazz, response)
  }

  public async getList<T>(
    config: HttpRequestConfig,
    clazz: { new(...args: any[]): T }
  ): Promise<Paging<T>> {
    const response = await this.httpClient.request({ ...config, method: 'GET' })
    const paging = plainToInstance<Paging<T>, any>(Paging, response)
    const items = plainToInstance<T, any[]>(clazz, response.items)
    paging.setItems(items)
    return paging
  }

  public async post<T>(
    config: HttpRequestConfig,
    clazz: {
      new(...args: any[]): T | Null
    } | null = null
  ): Promise<T | Null> {
    const response = await this.httpClient.request({ ...config, method: 'POST' })
    return plainToInstance(clazz !== null ? clazz : Null, response)
  }

  public async patch<T>(
    config: HttpRequestConfig,
    clazz: {
      new(...args: any[]): T | Null
    } | null = null
  ): Promise<T | Null> {
    const response = await this.httpClient.request({
      ...config,
      method: 'PATCH'
    })
    return plainToInstance(clazz !== null ? clazz : Null, response)
  }

  public async delete<T>(
    config: HttpRequestConfig,
    clazz: {
      new(...args: any[]): T | Null
    } | null = null
  ): Promise<T | Null> {
    const response = await this.httpClient.request({ ...config, method: 'DELETE' })
    return plainToInstance(clazz !== null ? clazz : Null, response)
  }
}
