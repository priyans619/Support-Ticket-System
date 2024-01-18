import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

app.get('/');

// for loading process.env from config
dotenv.config();

mongoose
.connect(process.env.mongoURL)
.then(() => {
    console.log('Server is connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log(error);

});