import HttpRepository from '@/repository/HttpRepository'
import type Login from '@/entity/user/Login'
import { inject, singleton } from 'tsyringe'
import type PostWrite from '@/entity/post/PostWrite'
import { plainToClass, plainToInstance } from 'class-transformer'
import Post from '@/entity/post/Post'
import Paging from '@/entity/data/Paging'
import PostPreview from '@/entity/post/PostPreview'

@singleton()
export default class SearchRepository {
  constructor(@inject(HttpRepository) private readonly httpRepository: HttpRepository) {}

  public searchPost(keyword:string , page: number) {
    return this.httpRepository.getList<PostPreview>(
      {
        path: `/api/posts?keyword=${keyword}&page=${page}&size=10`
      },
      PostPreview
    )
  }
}
