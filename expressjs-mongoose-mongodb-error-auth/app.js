const express = require("express");
const app = express();
const cors= require('cors');
const limiter= require('express-rate-limit');
const helmet= require('helmet');
const hpp= require('hpp');
const xss= require('xss-req-sanitizer');
const sanitize= require('express-mongo-sanitize');
const router = require("./route/urlroute");
const authRouter = require("./route/authrouter");
const responsefunction = require('./controller/moviecrud');
const morgan = require("morgan");
const customeError = require("./utlility/customerror");
const globalErrorhandler= require('./controller/errorHandler')
app.use(helmet());

const limit= limiter({
    max:1000,
    windowMs:60*10*1000,
    message:'too many requests from the same ip address try again after sometimer....'
});
app.use('/user',limit);
app.use(cors());
app.use(express.json({limit:50000000}));

app.use(hpp({whitelist:['price','duration','releaseYear','ratings','totalRating','genres','totalhoures']}));
app.use(sanitize());
app.use(xss());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use("/user",authRouter);
app.use("/", router);
app.all('*',(req,res,next)=>{
    // res.status(404).json(responsefunction.responsefunction("page not found",`the requested url ${req.originalUrl} not found`));
    // const err = new Error(`the requested url ${req.originalUrl} not found`);
    // err.statusCode= 404;
    // err.status= 'url not found';
    const err = new customeError(`the requested url ${req.originalUrl} not found`,404)
    next(err);
})
app.use(globalErrorhandler);
app.use(express.static("./static"));
module.exports = app;
