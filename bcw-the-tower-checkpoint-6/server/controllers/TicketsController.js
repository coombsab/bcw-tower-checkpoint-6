import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController {
  constructor() {
    super("api/tickets")
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.addTicket)
      .delete("/:ticketId", this.deleteTicket)
  }

  async addTicket(req, res, next) {
    try {
      const ticket = await ticketsService.addTicket(req.body.eventId, req.userInfo.id)
      res.send(ticket)
    }
    catch(error) {
      next(error)
    }
  }

  async deleteTicket(req, res, next) {
    try {
      const ticket = await ticketsService.deleteTicket(req.params.ticketId, req.userInfo.id)
      res.send(ticket)
    }
    catch(error) {
      next(error)
    }
  }
}