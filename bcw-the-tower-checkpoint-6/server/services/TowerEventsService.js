import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {
  
  async addTowerEvent(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData)
    await towerEvent.populate("creator", "name picture")
    return towerEvent
  }
  
  async getTowerEvents(query) {
    const towerEvents = await dbContext.TowerEvents.find({
      ...query
    }).populate("creator", "name picture")
    return towerEvents 
  }
  async getTowerEventById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId)
    if (!towerEvent) {
      throw new BadRequest("Cannot get event due to invalid ID.")
    }
    return towerEvent
  }
  
  async editTowerEvent(eventData, eventId, userId) {
    const towerEvent = await this.getEventIfNotCanceled(eventId)
    // @ts-ignore
    const isCreator = towerEvent.creatorId.toString() === userId
    if (!isCreator) {
      throw new Forbidden("You are not the creator of this event.  You may not edit it.")
    }

    towerEvent.name = eventData.name || towerEvent.name
    towerEvent.description = eventData.description || towerEvent.description
    towerEvent.coverImg = eventData.coverImg || towerEvent.coverImg
    towerEvent.location = eventData.location || towerEvent.location
    towerEvent.capacity = eventData.capacity || towerEvent.capacity
    towerEvent.startDate = eventData.startDate || towerEvent.startDate
    // towerEvent.isCanceled = eventData.isCanceled || towerEvent.isCanceled  NOTE Can only change isCanceled during expected cancel route
    towerEvent.type = eventData.type || towerEvent.type

    await towerEvent.save()
    return towerEvent
  }

  async updateTowerEventCapacity(eventId, change) {
    const towerEvent = await this.getTowerEventById(eventId)
    towerEvent.capacity += change
    await towerEvent.save()
    return towerEvent
  }

  async cancelTowerEvent(eventId, userId) {
    const towerEvent = await this.getTowerEventById(eventId)

    // @ts-ignore
    if (towerEvent.creatorId.toString() !== userId) {
      throw new Forbidden("You did not create that event so you may not cancel it.")
    }

    towerEvent.isCanceled = true
    await towerEvent.save()
    return towerEvent
  }

  async getEventIfNotCanceled(eventId) {
    const towerEvent = await this.getTowerEventById(eventId)
    if (towerEvent.isCanceled) {
      throw new BadRequest("Sorry, that event has been canceled and may no longer be edited.")
    }
    return towerEvent
  }
}

export const towerEventsService = new TowerEventsService()