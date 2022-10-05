import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { Ticket } from "../models/Ticket.js"
import { TowerEvent } from "../models/TowerEvent.js"
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
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data.map(data => new Comment(data))
  }

  async getTicketsForEvent(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.tickets = res.data.map(data => new Ticket(data))
  }
}

export const towerEventsService = new TowerEventsService()