import express from 'express';
import cookieParser from 'cookie-parser'
import serverRoutes from './routes'
import hanldeError from './middleware/error.middleware';
import cors from 'cors';
import env from './config/env';

const app = express();

app.use(cors({
    origin: env.CLIENT_URL,
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req,res) => {
    return res.status(200).json({message : "Server is running"});
});

app.use('/api', serverRoutes );

app.use(hanldeError);

export default app ;