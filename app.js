const express = require("express");
let app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const categoryRoute = require("./routes/categoryRoute");
const { globalErrorHandler, notFound } = require("././middleware/errorHandler");
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/category", categoryRoute);

app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;
