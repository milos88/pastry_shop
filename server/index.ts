const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const cors = require("cors");
import usersRoute from "./routes/usersRoute"
import proizvodRouter from "./routes/proizvodRoute"

const app = express();
app.use(cors());

app.use(bodyParser.json({limit: '1000kb'}));
app.use(express.json());
// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://milos:AdK6f.Ke3.WjjF4@cluster0.jdfe0ke.mongodb.net/PKR?retryWrites=true&w=majority";

app.use('/users', usersRoute)
app.use('/proizvod', proizvodRouter)
async function run() {
  await mongoose.connect(url);
}
run()
  .then(() => {
    console.log("App connected to database");
    app.listen(3001, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => console.dir(err));
