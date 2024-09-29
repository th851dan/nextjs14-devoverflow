import Notification from "@/database/notification.model";
import { connectToDatabase } from "../mongoose";
import { NotificationParams } from "./shared.types";



export async function createNotification(params: NotificationParams) {

    try {
        connectToDatabase();

        const { content, recipients, readBy } = params;

        await Notification.create({
            content, recipients, readBy
        })

        return params;

    } catch (error) {
        console.log(error);
        throw error;
    }

}


export async function updateNotification(params: NotificationParams) {
    try {
        connectToDatabase();

        const { id, content, recipients, readBy } = params;

        const notification = await Notification.findById({ _id: id })

        if (notification) {

            notification.content = content;

            notification.recipients.$addToSet(recipients)

            notification.readBy.$addToSet(readBy)

            notification.save();
        }

        return params;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getNotificationByRecipient(params: { recipientId: string }) {

    try {
        connectToDatabase();
        const { recipientId } = params;

        const notification = await Notification.findOne({
            recipients: recipientId,
            readBy: { $ne: recipientId }
        });

        return notification;

    } catch (error) {
        console.log(error);
        throw error;
    }

}

