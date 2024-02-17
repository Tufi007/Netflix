const express = require("express");
const app = express();
const router = require("./route/urlroute");
const authRouter = require("./route/authrouter");
const responsefunction = require('./controller/moviecrud');
const morgan = require("morgan");
const customeError = require("./utlility/customerror");
const globalErrorhandler= require('./controller/errorHandler')
app.use(express.json());

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
