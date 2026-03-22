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
    PORT : getEnv('PORT')
}

export default env;