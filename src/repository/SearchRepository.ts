import HttpRepository from '../repository/HttpRepository'
import { inject, singleton } from 'tsyringe'
import PostPreview from '../entity/post/PostPreview'

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
