const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors())

// Route
const todoRoute = require('./routes/todo');
app.use('/todo', todoRoute)

mongoose.connect(process.env.DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}).then(()=>{
    app.listen(port,()=>{
        console.log(`Is listening ${port} port now`)
    })
})
