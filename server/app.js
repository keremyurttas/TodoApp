const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const routes = require("./routes");
// const expressValidator = require("express-validator");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log("Database connected");
});
mongoose.connection.on("error", (error) => {
  console.log(`Database connection error: ${error.message}`);
});
app.use(
  cors({
    origin: ["https://todo-app-jet-two-99.vercel.app"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/", routes);
// app.use(expressValidator());

module.exports = app; // Export the Express app

// You don't need app.listen() here
