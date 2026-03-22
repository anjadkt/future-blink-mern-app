import express from 'express';
import cookieParser from 'cookie-parser'
import connectServer from './config/server';
import serverRoutes from './routes'
import hanldeError from './middleware/error.middleware';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', serverRoutes );


app.use(hanldeError)


connectServer();