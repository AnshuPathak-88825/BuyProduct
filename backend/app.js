const express = require("express");
const app = express();
const errormiddleware=require("./middleware/error")
app.use(express.json());
const product = require("./routes/productRoute");
app.use("/api/vi", product);
app.use(errormiddleware);
module.exports = app;
