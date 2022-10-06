import { useRouter } from "vue-router"
import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { Ticket } from "../models/Ticket.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {
  async getEvents(type = "") {
    AppState.events = []
    let res
    if (type) {
      res = await api.get("api/events", {
        params: {
          type
        }
      })
    } else {
      res = await api.get("api/events")
    }
    AppState.events = res.data.map(data => new TowerEvent(data))
    // console.log("data", res.data)
    // console.log("events", AppState.events)
  }

  async getEventById(eventId) {
    AppState.activeEvent = null
    const res = await api.get(`api/events/${eventId}`)
    const towerEvent = new TowerEvent(res.data)
    if (!towerEvent) {
      throw new Error("Cannot get event details due to invalid event ID.")
    }
    AppState.activeEvent = towerEvent
  }

  async getCommentsByEventId(eventId) {
    AppState.comments = []
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data.map(data => new Comment(data))
  }

  async getTicketsForEvent(eventId) {
    AppState.tickets = []
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.tickets = res.data.map(data => new Ticket(data))
    AppState.tickets.forEach(ticket => {
      if (ticket.eventId === eventId && ticket.accountId === AppState.accountId) {
        logger.log("looking for active ticket", ticket)
        AppState.myActiveEventTicket = ticket
      }
    })
  }

  async addEvent(eventData) {
    const res = await api.post("api/events", eventData)
    const towerEvent = new TowerEvent(res.data)
    AppState.events.push(towerEvent)
    return towerEvent
    
  }

  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    const newEvent = new TowerEvent(res.data)
    const oldEvent = AppState.events.find(e => e.id === eventId)
    const eventIndex = AppState.events.indexOf(oldEvent)
    AppState.events.splice(eventIndex, 1, newEvent)
    AppState.activeEvent = newEvent
  }
}

export const towerEventsService = new TowerEventsService()