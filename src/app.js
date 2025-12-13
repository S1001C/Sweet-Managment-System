const express = require("express");

const app = express();

app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app;
