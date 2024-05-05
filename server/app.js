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
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/", routes);
// app.use(expressValidator());
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Backend server running on port", port);
});
