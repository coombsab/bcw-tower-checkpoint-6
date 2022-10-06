import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {
  async unattendByTicketId(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    AppState.tickets = AppState.tickets.filter(t => t.id !== ticketId)
    // const activeEvent = AppState.events.find(e => e.id === ticketId.eventId)
    // if (activeEvent) {
    //   AppState.activeEvent = activeEvent
    // }
    AppState.activeEvent.capacity++
  }

  async addTicketByEventId(eventId) {
    const ticket = AppState.tickets.find(t => t.eventId === eventId && t.accountId === AppState.account.id)
    if (ticket) {
      throw new Error("You are already attending so cannot add a new ticket.")
    }
    const res = await api.post("api/tickets", { eventId })
    AppState.tickets.push(new Ticket(res.data))
    // const activeEvent = AppState.events.find(e => e.id === eventId)
    // if (activeEvent) {
    //   AppState.activeEvent = activeEvent
    // }
    AppState.activeEvent.capacity--
  }
}

export const ticketsService = new TicketsService()