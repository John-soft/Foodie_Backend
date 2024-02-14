const app = require("./app");
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Foddie DB Connection Successful"))
  .catch((err) => console.log(err));

app.listen(PORT, "localhost", () => {
  console.log(`Foodie is up and running on ${PORT}`);
});
