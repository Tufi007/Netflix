 const express = require('express');
 const app= express();
 const router= require('./route/urlroute')
app.use(express.json());
app.use(express.static('./static'));
app.use('/',router);
module.exports= app;
