const express = require("express");
const app = express();
const router = require("./route/urlroute");
const morgan = require("morgan");
app.use(express.json());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/", router);
app.use(express.static("./static"));
module.exports = app;
