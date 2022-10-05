import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async addComment(commentData) {
    const res = await api.post("api/comments", commentData)
    AppState.comments = [...AppState.comments, new Comment(res.data)]
  }
}

export const commentsService = new CommentsService()