const express = require("express");
var cors = require('cors')
const { connection } = require("./config/db");
const { authentication } = require("./middleware/authentication");
const { AuthRouter } = require("./routes/AuthRoute");
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 4000
app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  res.send("WELCOME");
});

app.use('/auth',AuthRouter)




app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to db successfully");
  } catch (err) {
    console.log(err);
    console.log("err from connected to DB");
  }
  console.log("http://localhost:8080");
});
