export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.rawDate = data.startDate
    this.startDate = new Date(data.startDate)
    this.formattedDate = this.startDate.toDateString()
    this.formattedTime = this.startDate.toLocaleTimeString()
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creator = data.creator
  }
}