const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const errorHandler = require("./middleware/errorHandleMiddleware");
const router = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const server = app.listen(PORT, () =>
      console.log(`Server started on port ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
