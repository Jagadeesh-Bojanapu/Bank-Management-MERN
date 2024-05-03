const express = require('express');
const mongoose = require('mongoose');
const session= require('express-session');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const corsMiddleware=require('./Middleware/cors_Middleware');
require('dotenv').config();


const app=express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
// Use CORS middleware
app.use(corsMiddleware);

mongoose.connect(process.env.MONGODB_URL)

.then(()=>
{
    console.log('Connected to MongoDB.....');
})
.catch(err=>
{
    console.log('Failed to connect  MongoDB....');
})


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true
}))

const authRoutes = require('./routes/authRoutes');
app.use('/auth',authRoutes)


const accountRoutes=require('./routes/accountRoutes');
const {authenticate} = require('./Middleware/authMiddleware');
app.use('/accounts',authenticate, accountRoutes);

const transactionRoutes=require('./routes/TransactionRoute');
app.use('/transactions',authenticate, transactionRoutes);

const LoanRoutes = require('./routes/LoanRoutes');
app.use('/loans',authenticate, LoanRoutes);

app.listen(port,()=>
{
    console.log(`server is running on port number ${port}.....`);
})




