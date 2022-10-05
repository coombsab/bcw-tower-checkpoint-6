import { Schema } from "mongoose";
import { OBJECT_ID, SCHEMA_OPTIONS } from "../db/DbUtils.js";

export const CommentSchema = new Schema ({
  creatorId: { type: OBJECT_ID, required: true },
  eventId: { type: OBJECT_ID, required: true },
  body: { type: String, required: true, minlength: 1, maxlength: 5000 },
  isAttending: { type: Boolean, default: false }

}, SCHEMA_OPTIONS)

CommentSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})