const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
}));
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/sweets", require("./routes/sweet.routes"));

module.exports = app;
