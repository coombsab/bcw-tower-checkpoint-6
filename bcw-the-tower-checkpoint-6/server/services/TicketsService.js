import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class TicketsService {
  async deleteTicket(ticketId, accountId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket) {
      throw new BadRequest("Could not delete ticket due to invalid ID.")
    }

    // @ts-ignore
    const isCreator = ticket.accountId.toString() === accountId

    if (!isCreator) {
      throw new Forbidden("You did not add this ticket so you cannot delete it.")
    }

    await towerEventsService.updateTowerEventCapacity(ticket.eventId, 1)
    await ticket.remove()
    return ticket
  }
  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate("event")
    return tickets
  }
  async addTicket(eventId, accountId) {
    await towerEventsService.getEventIfNotCanceled(eventId)
    const ticket = await dbContext.Tickets.create({ eventId, accountId})
    await ticket.populate("profile", "name picture")
    await ticket.populate("event")
    await towerEventsService.updateTowerEventCapacity(eventId, -1)
    // TODO Change comment isAttending to true here, then to false when deleting a ticket... probably need to iterate over all comments on a ticket
    // const hasTicket = await dbContext.Tickets.findOne({ accountId, eventId })

    return ticket
  }

  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate("profile", "name picture")
    return tickets
  }
}

export const ticketsService = new TicketsService()