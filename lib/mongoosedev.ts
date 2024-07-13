import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabaseDev = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_DEV_URL)
    return console.log("Missing environment variable: MONGODB_DEV_URL");

  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_DEV_URL, {
      dbName: "BuddyKnows",
    });

    isConnected = true;

    console.log("MongoDB_dev is connected");
  } catch (error) {
    console.log("MongoDB_dev connection failed", error);
  }
};
