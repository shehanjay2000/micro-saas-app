import './tracing.js'
import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const logger = import('./logger.js')
app.use(cors());
app.use(json());
app.use('/api/todos', todoRoutes);

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

const mongoUrl = "mongodb+srv://shehanjay2000:123@cluster0.p8xekiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{})
const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database connected successfully")
})

app.listen(
    3000,
    () =>{
        console.log("sever is running on port 3000");
    }
          
)
export default app; // for testing
