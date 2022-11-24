require("dotenv").config();
require("./config/passport");
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");

const app = express();

mongoose
  .connect(`${process.env.MONGO_URI}/auth-db`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Couldn't connected to MongoDB`, error));

// middlewares
app.use(express.json());
app.use("/api", routes);

app.use(errorHandler);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`App is listining on port ${PORT}`));
