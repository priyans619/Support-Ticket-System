import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoURL } from './config.js';

const app = express();

app.get('/');



mongoose
.connect(mongoURL)
.then(() => {
    console.log('Server is connected to database');
    app.listen(PORT, () => {
      console.log('App is listening to port: ${PORT}')
    })
})
.catch((error) => {
    console.log(error);

});