import connectDb from "./db";
import express from "express";
import env from "./env";

const app = express();

const connectServer = () => {
    connectDb();

    app.listen(env.PORT, () => {
        console.log(`Server is running on port ${env.PORT}`);
    });
    
}

export default connectServer;