import { InteractionSchema } from "@/database/interaction.model";
import { QuestionSchema } from "@/database/question.model";
import { TagSchema } from "@/database/tag.model";
import { UserSchema } from "@/database/user.model";
import mongoose from "mongoose";

export const connectToDatabaseDev = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_DEV_URL)
    return console.log("Missing environment variable: MONGODB_DEV_URL");

  try {
    const devConn = await mongoose.createConnection(
      process.env.MONGODB_DEV_URL,
      {
        dbName: "BuddyKnows",
      }
    );
    const userModel = devConn.model("User", UserSchema);
    const questionModel = devConn.model("Question", QuestionSchema);
    const tagModel = devConn.model("Tag", TagSchema);
    const interactionModel = devConn.model("Interaction", InteractionSchema);
    console.log("MongoDB_dev is connected");
    return { devConn, userModel, questionModel, tagModel, interactionModel };
  } catch (error) {
    console.log("MongoDB_dev connection failed", error);
  }
};
