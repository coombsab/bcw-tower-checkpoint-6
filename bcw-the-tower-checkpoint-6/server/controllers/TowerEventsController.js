import { Auth0Provider } from "@bcwdev/auth0provider"
import { commentsService } from "../services/CommentsService.js"
import { ticketsService } from "../services/TicketsService.js"
import { towerEventsService } from "../services/TowerEventsService.js"
import BaseController from "../utils/BaseController.js"

export class TowerEventsController extends BaseController {
  constructor() {
    super("api/events")
    this.router
      .get("", this.getTowerEvents)
      .get("/:eventId", this.getTowerEventById)
      .get("/:eventId/tickets", this.getTicketsByEventId)
      .get("/:eventId/comments", this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.addTowerEvent)
      .put("/:eventId", this.editTowerEvent)
      .delete("/:eventId", this.cancelTowerEvent)
  }
  async addTowerEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.addTowerEvent(req.body)
      res.send(towerEvent)
    }
    catch(error) {
      next(error)
    }
  }

  async getTowerEvents(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getTowerEvents(req.query)
      res.send(towerEvents)
    }
    catch(error) {
      next(error)
    }
  }

  async getTowerEventById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getTowerEventById(req.params.eventId)
      res.send(towerEvent)
    }
    catch(error) {
      next(error)
    }
  }

  async getTicketsByEventId(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByEventId(req.params.eventId)
      res.send(tickets)
    }
    catch(error) {
      next(error)
    }
  }

  async getCommentsByEventId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByEventId(req.params.eventId)
      res.send(comments)
    }
    catch(error) {
      next(error)
    }
  }

  async editTowerEvent(req, res, next) {
    try {
      const towerEvent = await towerEventsService.editTowerEvent(req.body, req.params.eventId, req.userInfo.id)
      res.send(towerEvent)
    }
    catch(error) {
      next(error)
    }
  }

  async cancelTowerEvent(req, res, next) {
    try {
      const towerEvent = await towerEventsService.cancelTowerEvent(req.params.eventId, req.userInfo.id)
      res.send(towerEvent)
    }
    catch(error) {
      next(error)
    }
  }
}