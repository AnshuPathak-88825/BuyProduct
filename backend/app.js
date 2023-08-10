const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errormiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
app.use(express.json());
app.use(cookieParser());
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("shutting down the server due uncaughtException");
  process.exit(1);
});
app.use("/api/vi", product);
app.use("/api/vi", user);
app.use(errormiddleware);
module.exports = app;
