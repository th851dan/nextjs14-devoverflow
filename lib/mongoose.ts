import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL)
    return console.log("Missing environment variable: MONGODB_URL");

   // Überprüfe den aktuellen Verbindungsstatus
   console.log("verbindungstatus " + mongoose.connection.readyState)
   console.log("isConnected " + isConnected )
    if (mongoose.connection.readyState === 1) {
    // Bereits verbunden
    console.log('MongoDB is already connected');
    return;
    }  

  if (isConnected) {
    console.log("check connected")
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "BuddyKnows",
    });

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
