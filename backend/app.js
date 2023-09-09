const express = require("express");
const app = express();
const cors=require("cors");
const cookieParser = require("cookie-parser");
const errormiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order=require("./routes/orderRoute");
const fileUpload=require("express-fileupload");
const bodyParser=require("body-parser");
const corsOptions = {
  origin: 'http://localhost:1234', // Specify the origin(s) that are allowed to access this server
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

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
