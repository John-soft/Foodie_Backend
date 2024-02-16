const express = require("express");
let app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const categoryRoute = require("./routes/category");
const restaurantRoute = require("./routes/restaurant");
const foodRouter = require("./routes/foods");
const ratingRoute = require("./routes/rating");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/user");
const addressRoute = require("./routes/address");
const { globalErrorHandler, notFound } = require("././middleware/errorHandler");
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", usersRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/foods", foodRouter);
app.use("/api/v1/rating", ratingRoute);

app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;
