import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class CommentsService {
  async editComment(commentData) {
    const comment = await this.getCommentById(commentData.commentId)
    // @ts-ignore
    if (commentData.creatorId !== comment.creatorId.toString()) {
      throw new Forbidden("This is not your comment.  You may not edit it.")
    }
    comment.body = commentData.body || comment.body

    await comment.save()
    return comment
  }

  async addComment(commentData) {
    await towerEventsService.getTowerEventById(commentData.eventId)
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate("creator", "name picture")
    return comment
  }

  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate("creator", "name picture")
    return comments
  }

  async deleteComment(commentId, accountId) {
    const comment = await this.getCommentById(commentId)
    // @ts-ignore
    if (comment.creatorId.toString() !== accountId) {
      throw new Forbidden("This is not your comment.  You may not delete it.")
    }
    await comment.remove()
    return comment
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId).populate("creator", "name picture")
    if (!comment) {
      throw new BadRequest("Could not get comment due to invalid ID.")
    }
    return comment
  }

  async getCommentsByIds(accountId, eventId) {
    const comments = await dbContext.Comments.find({ accountId, eventId })
    return comments
  }
}

 export const commentsService = new CommentsService()