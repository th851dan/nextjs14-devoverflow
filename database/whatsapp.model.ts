import { Schema, model, models, Document } from "mongoose";

export interface IWhatsapp extends Document {
  name: String;
  invitationLink: String;
  shortDescription: String;
  numberOfMembers: Number;
  createdAt: Date;
  updatedAt: Date;
}

export const WhatsappSchema = new Schema({
  name: { type: String, required: true, unique: true },
  invitationLink: { type: String, required: true },
  shortDescription: { type: String, required: false },
  numberOfMembers: { type: Number, require: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Whatsapp = models.Whatsapp || model("Whatsapp", WhatsappSchema);

export default Whatsapp;
