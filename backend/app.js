const express = require("express");
const app = express();
const cors=require("cors");
const cookieParser = require("cookie-parser");
const errormiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order=require("./routes/orderRoute");
app.use(express.json());
app.use(cookieParser());
app.use(cors());
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("shutting down the server due uncaughtException");
  process.exit(1);
});
app.use("/api/vi", product);
app.use("/api/vi", user);
app.use("/api/vi", order);

app.use(errormiddleware);
module.exports = app;
