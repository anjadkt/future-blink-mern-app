import dotenv from 'dotenv';
dotenv.config();


const getEnv = (key : string) => {
    const value = process.env[key];
    if(!value){
        throw new Error(`Environment variable ${key} is not defined`);
    }
    return value;
}

const env = {
    NODE_ENV : getEnv('NODE_ENV'),
    SALT : getEnv('SALT'),
    JWT_SECRET : getEnv('JWT_SECRET'),
    MONGO_URI : getEnv('MONGO_URI'),
    PORT : getEnv('PORT'),
    CLIENT_URL : getEnv('CLIENT_URL'),
    OPEN_ROUTER_KEY : getEnv('OPEN_ROUTER_KEY')
}

export default env;