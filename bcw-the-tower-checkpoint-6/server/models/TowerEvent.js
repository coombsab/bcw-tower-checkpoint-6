import { Schema } from 'mongoose'
import { OBJECT_ID, SCHEMA_OPTIONS } from "../db/DbUtils.js"

export const TowerEventSchema = new Schema ({
  creatorId: { type: OBJECT_ID, required: true },
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  description: { type: String, required: true, minlength: 1, maxlength: 1000 },
  coverImg: { type: String, required: true, minlength: 1, maxlength: 500 },
  location: { type: String, required: true, minlength: 1, maxlength: 50 },
  capacity: { type: Number, required: true, min: 0, max: 9999999 },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, required: true, enum: ["concert", "convention", "sport", "digital", "auction"] }


}, SCHEMA_OPTIONS)

TowerEventSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})