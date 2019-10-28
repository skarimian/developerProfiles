const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();

// Initial middleware
app.use(express.json({ extended: false }));

//Define all API routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = 5001; // this port for my developer profiles App

app.listen(PORT, () =>
  console.log("Server connected for developer profiles on port " + PORT)
);
