const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
app.use((req, res, next) => {
  console.log(req.method);
  next();
});
app.use(cors());
app.use(express.json());

app.use(helmet());

app.use("/api", require("./routes/api"));

if (process.env.NODE_ENV === "production") {
  app.use(
    "/assets",
    express.static(path.join(__dirname, "../frontend/dist/assets"))
  );

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ msg: "Please Set To Production" });
  });
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log("Server Listening");
  console.log(process.env.PORT);
});
