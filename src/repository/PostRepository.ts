import HttpRepository from '@/repository/HttpRepository'
import type Login from '@/entity/user/Login'
import { inject, singleton } from 'tsyringe'
import type PostWrite from '@/entity/post/PostWrite'
import { plainToClass, plainToInstance } from 'class-transformer'
import Post from '@/entity/post/Post'
import Paging from '@/entity/data/Paging'
import PostPreview from '@/entity/post/PostPreview'

@singleton()
export default class PostRepository {
  constructor(@inject(HttpRepository) private readonly httpRepository: HttpRepository) {}

  public write(request: PostWrite) {
    return this.httpRepository.post({
      path: '/api/posts',
      body: request
    })
  }

  public get(postId: number) {
    return this.httpRepository.get<Post>({ path: `/api/posts/${postId}` }, Post)
  }

  public getList(page: number) {
    return this.httpRepository.getList<PostPreview>(
      {
        path: `/api/posts?page=${page}&size=10`
      },
      PostPreview
    )
  }

  public delete(postId: number) {
    return this.httpRepository.delete({
      path: `/api/posts/${postId}`
    })
  }
}
