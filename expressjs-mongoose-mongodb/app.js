 const express = require('express');
 const app= express();
 const router= require('./route/urlroute');
const morgan = require('morgan');
app.use(express.json());
app.use(express.static('./static'));
if(process.env.NODE_ENV=== 'development') app.use(morgan("dev"));

app.use('/',router);
module.exports= app;
