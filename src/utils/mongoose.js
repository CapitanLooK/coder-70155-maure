import { connect } from "mongoose";
import { MONGO_URI } from "./constants.js";

export const connectDB = async () => {

    try {
        const mongooseConnection = await connect(MONGO_URI);

        console.log(`MongoDB connected: ${mongooseConnection.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}
