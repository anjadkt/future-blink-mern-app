import mongoose from "mongoose"
import env from "./env"

const connectDb = () => {
    mongoose.connect(env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
}

export default connectDb;
    
