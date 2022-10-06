import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async addComment(commentData) {
    const res = await api.post("api/comments", commentData)
    AppState.comments = [...AppState.comments, new Comment(res.data)]
  }

  async removeCommentById(commentId) {
    // Not sure these checks are really necessary, but kinda fun to try them out
    const comment = AppState.comments.find(c => c.id === commentId)
    if (!comment) {
      throw new Error("Cannot remove that comment due to an invalid ID.")
    }

    if (comment.creatorId !== AppState.account.id) {
      throw new Error("You did not post that comment so you cannot remove it.")
    }

    const res = await api.delete(`api/comments/${commentId}`)
    AppState.comments = AppState.comments.filter(c => c.id !== commentId)
  }
}

export const commentsService = new CommentsService()