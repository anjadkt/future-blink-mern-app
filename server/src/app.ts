import express from 'express';
import cookieParser from 'cookie-parser'
import serverRoutes from './routes'
import hanldeError from './middleware/error.middleware';
import cors from 'cors';
import env from './config/env';
import { Request,Response } from 'express';

const app = express();

app.use(cors({
    origin: env.CLIENT_URL.toString(),
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/health',(req:Request,res:Response) => {
    res.json({message : 'server is running..'});
});

app.use('/api', serverRoutes );

app.use(hanldeError);

export default app ;