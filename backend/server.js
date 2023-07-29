const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });
const db = require("./config/database");
app.listen(process.env.PORT, () => {
  console.log(`Server working on Port ${process.env.PORT}`);
});
