import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import { dbUrl, port } from './config';
import router from './routes';
import exceptionMiddleware from './middlewares/exceptionMiddleware';

var serverPort = process.env.PORT || port;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose
    .connect(
        dbUrl,
        { useNewUrlParser: true }
    )
    .catch(error => {
        console.log(`Error connecting to Database: ${error}`);
        return;
    })
    .then(() => {
        console.log('connected to Database');
        app.use(cors());
        app.use('/api', router);
        app.use(exceptionMiddleware);
        app.listen(serverPort, () => {
            console.log(`Server Running on Port:${serverPort}`);
        });
    });
