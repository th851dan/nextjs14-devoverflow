import { Schema, models, model, Document } from "mongoose";

export interface INotification extends Document {
    content: string;
    recipients: Schema.Types.ObjectId[],
    readBy: Schema.Types.ObjectId[],
    createdAt: Date;
}

const NotificationSchema = new Schema({
    content: { type: String, required: true },
    recipients: [{ type: Schema.Types.ObjectId, ref: "User" }],
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
});

const Notification = models.Notification || model("Notification", NotificationSchema);

export default Notification;
