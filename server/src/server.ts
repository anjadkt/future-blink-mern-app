import app from './app';
import connectDb from './config/db';
import env from './config/env';

const connectServer = async () => {
    try{
        await connectDb();
        app.listen(env.PORT, () => {
            console.log(`Server is running on port ${env.PORT}`);
        });
    }catch(error){
        console.log(error);
    }
}

connectServer();