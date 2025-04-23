const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

const mongoUrl = "mongodb+srv://shehanjay2000:123@cluster0.p8xekiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{})
const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database connected successfully")
})


module.exports = app; // for testing
