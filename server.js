const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.get("/", (req, res) => res.send(`API Running`));

const PORT = 5001; // this port for my developer profiles App

app.listen(PORT, () =>
  console.log("Server connected for developer profiles on port " + PORT)
);
