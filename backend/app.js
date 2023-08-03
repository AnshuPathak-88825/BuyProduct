const express = require("express");
const app = express();
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("shutting down the server due uncaughtException");
  process.exit(1);
});
const errormiddleware = require("./middleware/error");
app.use(express.json());
const product = require("./routes/productRoute");
app.use("/api/vi", product);
app.use(errormiddleware);
module.exports = app;
