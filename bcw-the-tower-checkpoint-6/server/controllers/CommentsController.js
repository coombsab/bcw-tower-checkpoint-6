import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController {
  constructor() {
    super("api/comments")
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.addComment)
      .put("/:commentId", this.editComment)
      .delete("/:commentId", this.deleteComment)
  }

 

  async addComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.addComment(req.body)
      res.send(comment)
    }
    catch(error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.commentId = req.params.commentId
      const comment = await commentsService.editComment(req.body)
      res.send(comment)
    }
    catch(error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.commentId, req.userInfo.id)
      res.send(comment)
    }
    catch(error) {
      next(error)
    }
  }
}