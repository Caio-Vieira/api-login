require('dotenv').config()
const express = require('express')
const app = express()
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/user', (erro)=>{
    erro ? console.log(erro.message) : console.log('database connected');;
})

app.use('/user', express.json(), userRoute)
app.use('/admin', express.json(), adminRoute)


app.listen(process.env.PORT, ()=>{
    console.log('server running');
})