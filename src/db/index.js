import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        mongoose.connection.on("error", () => {
            console.log("ERROR: Application is not able to talk to DB ", error );
        });
        console.log(`database connected \n DB_HOST: ${connectionInstance.connection.host}` );
    } catch (error) {
        console.log("ERROR: ", error);
        process.exit(1);
    }
}

export default connectDB;