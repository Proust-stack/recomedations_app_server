const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const router = require("./routes/index");
const errorHandleMiddleware = require("./middlewares/errorHandleMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: process.env.CORS_URL }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use(errorHandleMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
