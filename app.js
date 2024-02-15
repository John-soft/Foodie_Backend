const express = require("express");
let app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const categoryRoute = require("./routes/category");
const restaurantRoute = require("./routes/restaurant");
const foodRouter = require("./routes/foods");
const { globalErrorHandler, notFound } = require("././middleware/errorHandler");
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/foods", foodRouter);

app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;
