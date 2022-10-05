import { Schema } from "mongoose";
import { OBJECT_ID, SCHEMA_OPTIONS } from "../db/DbUtils.js";

export const TicketSchema = new Schema ({
  eventId: { type: OBJECT_ID, required: true },
  accountId: { type: OBJECT_ID, required: true }

}, SCHEMA_OPTIONS)

TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true })

TicketSchema.virtual("profile", {
  localField: "accountId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})

TicketSchema.virtual("event", {
  localField: "eventId",
  foreignField: "_id",
  justOne: true,
  ref: "TowerEvent"
})

TicketSchema.virtual("towerEvent", {
  localField: "eventId",
  foreignField: "_id",
  justOne: true,
  ref: "TowerEvent"
})