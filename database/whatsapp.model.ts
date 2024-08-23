import { Schema, model, models, Document } from "mongoose";

export interface IWhatsapp extends Document {
  name: string;
  description: string;
  createdOn: Date;
}

export const WhatsappSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
});

const Whatsapp = models.Whatsapp || model("Whatsapp", WhatsappSchema);

export default Whatsapp;
