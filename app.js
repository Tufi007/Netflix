 const express = require('express');
 const app= express();
 const fs= require('fs');
 const router= require('./route/urlroute')
app.use(express.json());
const PORT = 8000;
app.use('/',router);
app.listen(PORT,(req,res)=>{
   
    console.log('server connected');
})

module.exports= app;
