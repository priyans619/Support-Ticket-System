import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import agentRoute from './routes/agentRoute.js';


const app = express();

app.get('/',(request, response) => {
  console.log(request)
  return response.status(201).send('Welcome to Support Ticket Entry System')
});

app.use(express.json());

// Middleware

app.use('/api', agentRoute);

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