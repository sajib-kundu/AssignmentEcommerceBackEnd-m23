// Basic Import
const express = require('express');
const router =  require('./src/routes/api');
const app = new express();

// Security Middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require("path");


//Security Middleware Implementation

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const limiter = rateLimit({windowMs:15*60*1000, max:3000})
app.use(limiter);


// Mongo Db Database Connection in Atlas start

// let URI="mongodb+srv://<username>:<password>@cluster0.vohntst.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0";
let URI="mongodb+srv://<username>:<password>@cluster0.vohntst.mongodb.net/Ecommerce-Assignment?retryWrites=true&w=majority&appName=Cluster0";
let OPTION ={user:'crud', pass:'crud', autoIndex:true}
mongoose.connect(URI, OPTION).then(() => {
    console.log("Database Connection Success")
}).catch((err)=>{
    console.log(err)
})

//Database Connection in local database start
// let UwRL="mongodb://localhost:27017/crud"
// let OPTION= {user:"",pass:"",autoIndex:true}
// mongoose.connect(URL,OPTION).then(()=>{
//     console.log("Database Connection Success");

// }).catch((err)=>{

//     console.log(err);
// })

app.set('etag', false);
app.use("/api/v1", router)
//
// app.use(express.static('client/dist'));
//
// // Add React Front End Routing
// app.get('*',function (req,res){
//     res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
// })

module.exports = app;




